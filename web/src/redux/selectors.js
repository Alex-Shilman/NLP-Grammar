import { createSelector } from 'reselect';
import _ from 'lodash';

const selectData = globalState => _.get(globalState, 'data_platform');

const selectStudentList = globalState => _.get(globalState, 'data_platform.students');


export {
  selectData,
  selectStudentList,
}