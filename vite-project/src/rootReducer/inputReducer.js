// inputReducer.js
const initialState = {
  productName: '',
  productDescription: '',
  productPhoto: '',
  initialPrice: '',
  discountedPrice: '',
};

const inputReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PRODUCT_NAME':
      return {
        ...state,
        productName: action.payload,
      };
    case 'SET_PRODUCT_DESCRIPTION':
      return {
        ...state,
        productDescription: action.payload,
      };
    case 'SET_PRODUCT_PHOTO':
      return {
        ...state,
        productPhoto: action.payload,
      };
    case 'SET_INITIAL_PRICE':
      return {
        ...state,
        initialPrice: action.payload,
      };
    case 'SET_DISCOUNTED_PRICE':
      return {
        ...state,
        discountedPrice: action.payload,
      };
    default:
      return state;
  }
};

export default inputReducer;