import { convos } from '../../data/convos';
import { ADD_CONVO } from '../actions/convos';

const initialState = {
  convos
}

const convosReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CONVO:
      // const existing 
    break;
    default:
      return state;
  }
  return state;
}

export default convosReducer;