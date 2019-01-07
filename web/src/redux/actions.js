import { getUserData } from '../gateway';
import _ from 'lodash';
import { standardRules, optionalRules } from '../rules';

export const LOAD_DATA_REQUEST      = 'LOAD_DATA_REQUEST';
export const LOAD_DATA_SUCCESS      = 'LOAD_DATA_SUCCESS';
export const LOAD_DATA_FAIL         = 'LOAD_DATA_FAIL';
export const LOAD_DATA_UPDATE       = 'LOAD_DATA_UPDATE';
export const SET_STUDENT_DATA       = 'SET_STUDENT_DATA';

export const loadData = (id, text) => {
  return dispatch => {
    dispatch({ type: LOAD_DATA_REQUEST });

    const allRules = Object.assign({}, standardRules, optionalRules);
    
    const rules = Object.values(allRules).map((rule) => rule.payload());

    return getUserData({ id, text, rules })
      .then(({ data }) => {
        const { studentData } = data.data;
        dispatch({
          type: SET_STUDENT_DATA,
          payload: _.map(studentData, ({id, name}) => ({ id, name})),
        });
        dispatch({
          type: LOAD_DATA_SUCCESS,
          payload: data.data
        })
      })
      .catch(error =>
        dispatch({
          type: LOAD_DATA_FAIL,
          error
        })
      )
  }
};