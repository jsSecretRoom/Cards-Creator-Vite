// checkboxReducer.js
const initialState = {
  indicatorNew: false,
  indicatorPopular: false,
  indicatorInclude: false,
  indicatorEnd: false,
  indicatorDiscount: false,

  chooseCategory: false,
  collectionExists: false,
};
  
const checkboxReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_INDICATOR_NEW':
      return {
        ...state,
        indicatorNew: action.payload,
      };

    case 'SET_INDICATOR_POPULAR':
      return {
        ...state,
        indicatorPopular: action.payload,
      };

    case 'SET_INDICATOR_INCLUDE':
      return {
        ...state,
        indicatorInclude: action.payload,
      };

    case 'SET_INDICATOR_END':
      return {
        ...state,
        indicatorEnd: action.payload,
      };

    case 'SET_INDICATOR_DISCOUNT':
      return {
        ...state,
        indicatorDiscount: action.payload,
      };
    //---------------
    case 'TOGGLE_CHOOSE_CATEGORY':
      return {
        ...state,
        chooseCategory: !state.chooseCategory,
      };
    case 'TOGGLE_COLLECTION_EXISTS':
      return {
        ...state,
        collectionExists: !state.collectionExists,
      };  
    default:
      return state;
  }
};
export default checkboxReducer;