const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";

const userInitialState = {
  user: null,
};

function useReducer(state, action) {
  switch (action.type) {
    case LOGIN:
      return;
    case LOGOUT:
      return;
    default:
      return state;
  }
}

export { userInitialState, useReducer };
