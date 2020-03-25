import { cloudConvos } from '../../data/cloudConvos';
import { convoListQuery } from '../../data/convoListQuery';

const initialState = {
  convos: cloudConvos,
  convosList: convoListQuery
}

const convosReducer = (state = initialState, action) => {
  return state;
}

export default convosReducer;