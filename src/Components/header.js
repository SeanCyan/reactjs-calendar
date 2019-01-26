import React from 'react';
import dateFns from "date-fns";

class Header extends React.Component{

    render() {

        const dateFormat = "MMMM YY";

        return (
            <div className="flex-row head">
                <div>
                    <div className="material-icons arrow-b" onClick={this.props.onClick}>arrow_back_ios</div>
                </div>
                <div className="month">
                    {dateFns.format(this.props.currentMonth, dateFormat)}
                </div>
                <div>
                    <div className="material-icons arrow-f" onClick={this.props.onClick}>arrow_forward_ios</div>
                </div>
            </div>
        )
    }
}

export default Header;