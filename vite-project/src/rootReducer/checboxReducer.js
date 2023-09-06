// checkboxReducer.js
const initialState = {
    indicatorNew: false,
    indicatorPopular: false,
    indicatorInclude: false,
    indicatorEnd: false,
    indicatorDiscount: false,
};
  
const checkboxReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'TOGGLE_INDICATOR_NEW':
        return {
          ...state,
          indicatorNew: !state.indicatorNew,
        };
      case 'TOGGLE_INDICATOR_POPULAR':
        return {
          ...state,
          indicatorPopular: !state.indicatorPopular,
        };
      case 'TOGGLE_INDICATOR_INCLUDE':
        return {
          ...state,
          indicatorInclude: !state.indicatorInclude,
        };
      case 'TOGGLE_INDICATOR_END':
        return {
          ...state,
          indicatorEnd: !state.indicatorEnd,
        };
      case 'TOGGLE_INDICATOR_DISCOUNT':
        return {
          ...state,
          indicatorDiscount: !state.indicatorDiscount,
        };
      default:
        return state;
    }
};
export default checkboxReducer;