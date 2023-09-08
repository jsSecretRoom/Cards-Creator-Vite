// inputReducer.js
const initialState = {
  productName: '',
  productDescription: '',
  productPhoto: '',
  initialPrice: '',
  discountedPrice: '',

  categoryValue: '',
  customCollectionName: '',
  itemId: ''
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
    case 'SET_CATEGORY_VALUE':
      return {
        ...state,
        categoryValue: action.payload,
      };
    case 'SET_CUSTOM_COLLECTION_NAME':
    return {
      ...state,
      customCollectionName: action.payload,
    };
    case 'SET_ITEM_ID':
      return {
        ...state,
        itemId: action.payload,
      };
    default:
      return state;
  }
};

export default inputReducer;