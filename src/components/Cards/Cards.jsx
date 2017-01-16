
import React,{Component, PropTypes} from 'react';
import classNames from 'classnames';

export default class Cards extends React.Component {

    static propTypes = {
        children: PropTypes.any,
        className: PropTypes.string
    }

    render() {
        const {children,className,...other} = this.props;

        const cls = classNames({
            'cards': true,
            [className]: className
        })
        return(
            <div className={cls} {...other}>{children}</div>
        )
    }
}