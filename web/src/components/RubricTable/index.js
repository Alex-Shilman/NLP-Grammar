import React, { Component } from 'react';
import ReactDataGrid from "react-data-grid";
import { withRouter } from 'react-router';
import { Modal } from 'reactstrap';

const columns = [{key: 'type', name: 'Type', width:85, locked: true}, {key: 'name', name: 'Name', width:200, locked: true}, {key: 'description', name: 'Description'}, {key: 'config'}];
const rows = [{id: 0, type: 'Style', name: 'Double Negatives', description: 'Students should not use multiple negative words or phrases to modify a single word or phrase.'}, {id: 1, type: 'Style', name: 'Double Positives', description: 'Students should not use multiple negative words or phrases to modify a single word or phrase.'}];

const rowGetter = rowNumber => rows[rowNumber];


class RubricTable extends Component {
    state = {
        selectedIndexes: [],
        showModalConfig: false
    };

    onRowsSelected = (rows) => { 
        this.state.selectedIndexes.push(rows[0].row.id);
        this.setState({ showModalConfig: true });
    }

    onRowsDeselected = (rows) => {
        const new_selectedIndexes = this.state.selectedIndexes.filter((item) => item !== rows[0].row.id);
        this.setState({selectedIndexes: new_selectedIndexes});
    }
    
    onRowExpandToggle = ({ columnGroupName, name, shouldExpand }) => {
        let expandedRows = Object.assign({}, this.state.expandedRows);
        expandedRows[columnGroupName] = Object.assign({}, expandedRows[columnGroupName]);
        expandedRows[columnGroupName][name] = {isExpanded: shouldExpand};
        this.setState({expandedRows: expandedRows});
    }
    
    handleClose = () => {
        this.setState({ showModalConfig: false });
    }
    
    render() {
        console.log(this.state);

        return (
            <div>
                <Modal isOpen={this.state.showModalConfig} onHide={this.handleClose}>
                    <p>Modal</p>
                    <p>Data</p>
                </Modal>
                <ReactDataGrid
                    key={0}
                    columns={columns}
                    rowGetter={rowGetter}
                    rowsCount={rows.length}
                    minHeight={500}
                    minWidth={1200}
                    rowSelection={{
                        showCheckbox: true,
                        onRowsSelected: this.onRowsSelected,
                        onRowsDeselected: this.onRowsDeselected,
                        selectBy: {
                            indexes: this.state.selectedIndexes
                        }
                    }}
                />
            </div>
        );
        }
}

export default withRouter(RubricTable);