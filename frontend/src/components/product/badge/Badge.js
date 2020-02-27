import React, {Component} from 'react';
import StyleWrapper from './Badge.style'
class Badge extends Component {
    render() {
        return (
            <StyleWrapper>
                <div className='badge'>
                    <div className='badge-off'>{'%'+'26'}</div>
                    <div className='badge-off-title'>{'تخفیف'}</div>
                </div>
            </StyleWrapper>
        );
    }
}

export default Badge;
