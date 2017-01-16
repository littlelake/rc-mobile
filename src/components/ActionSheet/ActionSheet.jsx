'use strict';

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import Dialog from '../Dialog/Dialog';

//动态添加动作面板
function createActionSheet(flag, config, callback) {

  //标准按钮、取消按钮和其他按钮
  let normalChildren,cancelChildren,otherChildren;

  let actionDiv = document.createElement("div");
  document.body.appendChild(actionDiv);

  //关闭动作面板
  function actionClose() {
    if(actionDiv) {
      ReactDOM.unmountComponentAtNode(actionDiv);
      document.body.removeChild(actionDiv);      
    }
  }

  function cb(item, rowIndex = 0) {
    const res = callback(item, rowIndex);
  }

  //封装获取面板的方法
  function childrenDOM(options,destructiveIndex,className) {
    let temporaryChildren;
    temporaryChildren = (
      <div className="action-sheet-list">
        {
          options.map((item,i) => {
            const itemProps = {
              onClick: () => cb(item)
            };
            const cls = classNames({
              "action-sheet-item": true,
              "action-sheet-destructive-button": i === destructiveIndex,
              [className]: className
            });
            return (
                <div className={cls} key={i} {...itemProps}>{item}</div>     
            )
          })
        }
      </div>
    );

    return temporaryChildren;
  }

  switch(flag) {
    case 'NORMAL':
      const {options, cancelButtonIndex, destructiveButtonIndex,className} = config;      
      
      //无取消按钮情况
      if(cancelButtonIndex === undefined) {

        normalChildren = childrenDOM(options,destructiveButtonIndex,className);
      }else {
        //如果取消按钮在最后一个的情况
        if(cancelButtonIndex === options.length -1) {
          const newOptions = options.slice(0,options.length -1);

          normalChildren = childrenDOM(newOptions,destructiveButtonIndex,className);
          cancelChildren = (
            <div className="action-sheet-list">
              <div className="action-sheet-item action-sheet-cancel-button">{options[cancelButtonIndex]}</div>
            </div>
          );
        }else {
          //取消按钮在中间的情况
          const newOptions = options.slice(0,cancelButtonIndex),
                otherOptions = options.slice(cancelButtonIndex + 1);

          normalChildren = childrenDOM(newOptions,destructiveButtonIndex,className);
          cancelChildren = (
            <div className="action-sheet-list">
              <div className="action-sheet-item action-sheet-cancel-button">{options[cancelButtonIndex]}</div>
            </div>
          );
          otherChildren = childrenDOM(otherOptions,destructiveButtonIndex,className);
        }
        
      }
      break;
  }

  const children = {
      normalChildren: normalChildren,
      cancelChildren: cancelChildren,
      otherChildren: otherChildren
  };

  ReactDOM.render(
    <Dialog {...children} close={actionClose}/>
    ,actionDiv);
}

export default {
  showActionSheetWithOptions(config, callback) {
    createActionSheet("NORMAL", config, callback);
  },
  showShareActionSheetWithOptions(config, callback) {
    createActionSheet("SHARE", config, callback);
  }
}