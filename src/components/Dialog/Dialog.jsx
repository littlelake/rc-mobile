
"use strict";

import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import { Mask } from '../Mask/index';

export default class Dialog extends React.Component {

    static propTypes = {
        normalChildren: PropTypes.object,
        cancelChildren: PropTypes.object,
        otherChildren: PropTypes.object
    };

    constructor(props) {
        super(props);

        this.state = {
          visible: true
        }
        
        this.actionClose = this.actionClose.bind(this);
    }

    actionClose() {
        this.setState({
          visible: false
        });

        if(this.props.close) {
          this.props.close();          
        }
    }

    render() {
        const {normalChildren, cancelChildren, otherChildren} = this.props;

        return(
            <div className="action-sheet" style={{"display": this.state.visible ? "block" : "none"}}>
                <div className="action-sheet-mask"></div>
                <div className="action-sheet-wrap" onClick={this.actionClose}>
                    <div className="action-sheet">
                    <div className="action-sheet-content">
                        {normalChildren}
                        {cancelChildren}
                        {otherChildren}
                    </div>
                    </div>
                </div>
            </div>
        );
    }
}