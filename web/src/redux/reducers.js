import { combineReducers } from 'redux';
import _ from 'lodash';
import {
  LOAD_DATA_REQUEST,
  LOAD_DATA_SUCCESS,
  LOAD_DATA_FAIL,
  LOAD_DATA_UPDATE,
  SET_STUDENT_DATA,
} from './actions';

const DEFAULT_STATE = {
  loading: false,
  students: [],
  data: {},
  error: {}
};


const data_platform = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case LOAD_DATA_REQUEST:
      return {
        ...state,
        loading: true,
        error: {},
        data: {}
      };
    case LOAD_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload
      };
    case LOAD_DATA_UPDATE:
      return {
        ...state,
        data: action.payload
      };
    case LOAD_DATA_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case SET_STUDENT_DATA:
      return {
        ...state,
        students: action.payload,
      };
    default:
      return state
  }
};

const createReducers = () =>
  combineReducers({
    data_platform,
  });

export default createReducers;