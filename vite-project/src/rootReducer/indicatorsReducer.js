const initialState = {
    showMessage: false,
    messageType: '', // 'success' or 'error'
    message: '',
  };
  
  const indicatorsReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SHOW_SUCCESS_MESSAGE':
        return {
          ...state,
          showMessage: true,
          messageType: 'success',
          message: action.payload,
        };
      case 'SHOW_ERROR_MESSAGE':
        return {
          ...state,
          showMessage: true,
          messageType: 'error',
          message: action.payload,
        };
      case 'HIDE_MESSAGE':
        return {
          ...state,
          showMessage: false,
          messageType: '',
          message: '',
        };
      default:
        return state;
    }
};
  
export default indicatorsReducer;