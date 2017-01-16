
import React,{Component, PropTypes} from 'react';
import classNames from 'classnames';

export default class CardHeader extends React.Component {

    static propTypes = {
        children: PropTypes.any,
        className: PropTypes.string
    }

    render() {
        const {children,className,...other} = this.props;

        const cls = classNames({
            'card-header': true,
            [className]: className
        })
        return(
            <div className={cls} {...other}>{children}</div>
        )
    }
}