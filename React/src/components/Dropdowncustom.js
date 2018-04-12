import React, {Component} from 'react';
import {Typeahead} from 'react-bootstrap-typeahead';

class Dropdowncustom extends Component{
    render(){
        return(
            <Typeahead  placeholder='Skills' labelKey="name" fluid  multiple="multiple"   options={this.props.data}></Typeahead>
        )
    }
}

export default Dropdowncustom;







