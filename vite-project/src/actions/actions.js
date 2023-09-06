// actions.js

//inputs
export const setProductName = (name) => ({
    type: 'SET_PRODUCT_NAME',
    payload: name,
});
  
export const setProductDescription = (description) => ({
    type: 'SET_PRODUCT_DESCRIPTION',
    payload: description,
});
  
export const setProductPhoto = (photo) => ({
    type: 'SET_PRODUCT_PHOTO',
    payload: photo,
});
  
export const setInitialPrice = (price) => ({
    type: 'SET_INITIAL_PRICE',
    payload: price,
});
  
export const setDiscountedPrice = (price) => ({
    type: 'SET_DISCOUNTED_PRICE',
    payload: price,
});

//checboxs

export const toggleIndicatorNew = () => ({
    type: 'TOGGLE_INDICATOR_NEW',
});
  
export const toggleIndicatorPopular = () => ({
    type: 'TOGGLE_INDICATOR_POPULAR',
});
  
export const toggleIndicatorInclude = () => ({
    type: 'TOGGLE_INDICATOR_INCLUDE',
});
  
export const toggleIndicatorEnd = () => ({
    type: 'TOGGLE_INDICATOR_END',
});

  export const toggleIndicatorDiscount = () => ({
    type: 'TOGGLE_INDICATOR_DISCOUNT',
});
