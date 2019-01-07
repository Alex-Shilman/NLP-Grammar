import React, { Component } from 'react';
import DrawerCell from './Drawer';
import HighlightText from './HighlightText';
import { Link } from "react-router-dom";

class Row extends Component {
  state = {
    isOpen: false
  };
  
  // handleClick = () => {
  //   this.setState(({isOpen}) => ({isOpen: !isOpen}));
  // };
  
  render() {
    const { index, student = {}, category_id } = this.props;
    const { isOpen } = this.state;
    
    return (
      <>
        <tr>
          <th scope="row">{index}</th>
          <td style={{textAlign: "left"}}>
            <Link to={`/level3/${category_id}/${student.id}`}>{student.name}</Link>
          </td>
          <td></td>
        </tr>
        <tr>
          <DrawerCell
            isOpen={isOpen}
            colSpan={3}>
            <HighlightText
              text="This is just a test"
              highlight="just a test"
            />
          </DrawerCell>
        </tr>
      </>
    );
  }
}

export default Row;
