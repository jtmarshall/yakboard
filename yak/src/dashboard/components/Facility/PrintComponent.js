import React from "react";
import ReactToPrint from "react-to-print";
import Facility from './Facility';
import MaterialIcon from 'material-icons-react';
import './facility.css';


class PrintComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='facilityPrint'>
                <ReactToPrint
                    pageStyle={{
                        width: '100%',
                        paddingLeft: '0px',
                        display: 'inline-block'
                    }}
                    trigger={() =>
                        <span style={{position: 'absolute', right: '5%', cursor: 'pointer'}}>
                            <MaterialIcon icon='print' color='#4caf50'/>
                            <span style={{fontSize: '16px', verticalAlign: 'top'}}> Print Report</span>
                        </span>
                    }
                    content={() => this.componentRef}
                />
                <Facility ref={el => (this.componentRef = el)} parentState={this.props.parentState}/>
            </div>
        );
    }
}

export default PrintComponent;