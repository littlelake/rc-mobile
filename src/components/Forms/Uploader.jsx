
import React, { PropTypes } from 'react';
import classNames from 'classnames';
import ReactDOM from 'react-dom';

import {
  Alert,
} from '../../components/index';

export default class Uploader extends React.Component {
  static propTypes = {
    title: PropTypes.string,      // 标题
    files: PropTypes.array,       // 文件
    showAddBtn: PropTypes.bool,   // 是否显示上传按钮, 控制图片数量
    onChange: PropTypes.func,      // 域内容改变
  };

  static defaultProps = {
    title: '图片上传',
    files: [],
    showAddBtn: true,
  };

  constructor(props) {
    super(props);

    this.state = {
      alertButtons: [
        {
          type: 'primary',
          label: '我知道了',
          onClick: this.handleAlertyOk.bind(this),
        },
      ],
      alert: {
        open: false,
        title: '',
      },
      tipStatus: !!props.fileTips || false,
      isTips: true,
    };

    this.handleFileClick = this.handleFileClick.bind(this);
    this.handleAlertyOk = this.handleAlertyOk.bind(this);
  }

  componentWillMount() {
    // 如果有file文件，则不弹出提示框
    if (this.props.files.length || !this.props.fileTips) {
      this.setState({
        isTips: false,
        tipStatus: false,
      });
    }
  }

  // 弹出框确定
  handleAlertyOk() {
    this.setState({ alert: { open: false }, tipStatus: false, isTips: false });
    setTimeout(() => {
      ReactDOM.findDOMNode(this.refs.fileSelectorInput).click();
    }, 400);
  }

  /**
   * 点击出现弹框
   */
  handleFileClick() {
    if (this.state.isTips) {
      this.setState({ alert: { open: true, title: this.props.fileTips } });
    }
  }

  // http://stackoverflow.com/questions/7584794/accessing-jpeg-exif-rotation-data-in-javascript-on-the-client-side
  getOrientation(file, callback) {
    if (!(/iphone|ipad/i).test(navigator.userAgent)) {
      callback('-1');
    } else {
      const reader = new FileReader();
      reader.onload = (e) => {
        const view = new DataView(e.target.result);
        if (view.getUint16(0, false) !== 0xFFD8) {
          return callback(-2);
        }
        const length = view.byteLength;
        let offset = 2;
        while (offset < length) {
          const marker = view.getUint16(offset, false);
          offset += 2;
          if (marker === 0xFFE1) {
            const tmp = view.getUint32(offset += 2, false);
            if (tmp !== 0x45786966) {
              return callback(-1);
            }
            const little = view.getUint16(offset += 6, false) === 0x4949;
            offset += view.getUint32(offset + 4, little);
            const tags = view.getUint16(offset, little);
            offset += 2;
            for (let i = 0; i < tags; i += 1) {
              if (view.getUint16(offset + (i * 12), little) === 0x0112) {
                return callback(view.getUint16(offset + (i * 12) + 8, little));
              }
            }
          } else if ((marker && 0xFF00) !== 0xFF00) {
            break;
          } else {
            offset += view.getUint16(offset, false);
          }
        }
        return callback(-1);
      };
      reader.readAsArrayBuffer(file.slice(0, 64 * 1024));
    }
  }

  // 添加图片
  addImage(imgItem) {
    const newImages = this.props.files.concat(imgItem);
    if (this.props.onChange) {
      this.props.onChange(newImages);
    }
  }

  // 删除图片
  removeImage(index) {
    const newImages = [];
    this.props.files.map((image, idx) => {
      if (index !== idx) newImages.push(image);
    });

    if (this.props.onChange) {
      this.props.onChange(newImages, 'remove', index);
    }
  }
  // 点击上传图片
  onFileChange() {
    const fileSelectorEl = this.refs.fileSelectorInput;
    if (fileSelectorEl.files && fileSelectorEl.files.length) {
      const file = fileSelectorEl.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataURL = e.target.result;
        if (!dataURL) {
          alert('图片获取失败');
          return;
        }

        let orientation = 1;
        this.getOrientation(file, (res) => {
          // -2: not jpeg , -1: not defined
          if (res > 0) {
            orientation = res;
          }
          this.addImage({
            url: dataURL,
            orientation,
          });
          fileSelectorEl.value = '';
        });
      };
      reader.readAsDataURL(file);
    }
  }

  // 渲染图像
  renderFiles() {
    const imgItemList = [];
    this.props.files.map((image, index) => {
      imgItemList.push(
        <div key={index} className="uploader-file-wrap" >
          <div className="uploader-file" style={{ backgroundImage: `url(${image.url})` }}/>
          <div className="uploader-remove" onClick={() => { this.removeImage(index); }}/>
        </div>,
      );
    });
    return imgItemList;
  }

  render() {
    const {
      className,
      title,
      files,
      showAddBtn,
      onChange,
      initImage,
      addBtn,
      fileTips,
      ...others
    } = this.props;
    const { alert, alertButtons, tipStatus, isTips } = this.state;
    const cls = classNames({
      uploader: true,
      [className]: className,
    });

    let imagePlace;
    // 添加按钮
    if (!onChange && addBtn) {
      imagePlace = (
        <div className="uploader-file-wrap" >
          <div className="uploader-file add-btn"/>
        </div>
      );
    } else if (!onChange && initImage) {
      // 只是显示图片是的样式
      imagePlace = (
        <div className="uploader-file-wrap" >
          <div className="uploader-file" style={{ backgroundImage: `url(${initImage})` }}/>
        </div>
      );
    } else {
      // 真正上传图片的dom
      imagePlace = showAddBtn &&
        (<div className="uploader-input-wrap" onClick={isTips ? this.handleFileClick : ''}>
          <input
            className="uploader-input"
            ref="fileSelectorInput"
            type="file"
            style={{ pointerEvents: tipStatus ? 'none' : 'auto' }}
            accept="image/jpg,image/jpeg,image/png,image/gif"
            onChange={this.onFileChange.bind(this)}
            {...others}
          />
        </div>);
    }
    return (
      <div className={cls}>
        <div className="uploader-hd">{this.props.title}</div>
        <div className="uploader-bd">
          <div className="uploader-files">
            {this.renderFiles()}
          </div>
          {imagePlace}
        </div>
        <Alert
          open={alert.open}
          title={alert.title}
          children={alert.children}
          buttons={alertButtons}
        />
      </div>
    );
  }
}

