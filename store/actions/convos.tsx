export const ADD_CONVO = "ADD_CONVO";


export const addConvo = (convoId, participantIds) => {

  return {
    type: ADD_CONVO,
    convoId,
    participantIds
  };
};