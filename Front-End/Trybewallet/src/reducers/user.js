const INITIAL_STATE = { email: '' };

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'CREATE_PAGELOGIN':
    return {
      ...state,
      email: action.email,
    };

  default:
    return state;
  }
}
