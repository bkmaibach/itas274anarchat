import { cloudConvos } from '../../data/cloudConvos';
import { convoListQuery } from '../../data/convoListQuery';
import { ADD_CONVO } from '../actions/convos';

const initialState = {
  convos: cloudConvos,
  convosList: convoListQuery
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