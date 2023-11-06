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

export const setCategoryValue = (cange) => ({
    type: 'SET_CATEGORY_VALUE',
    payload: cange,
});
export const setCustomCollectionName = (cange) => ({
    type: 'SET_CUSTOM_COLLECTION_NAME',
    payload: cange,
});
export const setItemId = (id) => ({
    type: 'SET_ITEM_ID',
    payload: id,
});

//checboxs

export const setIndicatorNew = (value) => ({
    type: 'SET_INDICATOR_NEW',
    payload: value,
});
  
export const setIndicatorPopular = (value) => ({
    type: 'SET_INDICATOR_POPULAR',
    payload: value,
});
  
export const setIndicatorInclude = (value) => ({
    type: 'SET_INDICATOR_INCLUDE',
    payload: value,
});
  
export const setIndicatorEnd = (value) => ({
    type: 'SET_INDICATOR_END',
    payload: value,
});
  
export const setIndicatorDiscount = (value) => ({
    type: 'SET_INDICATOR_DISCOUNT',
    payload: value,
});
//--------------------------//
export const toggleChooseCategory = () => ({
    type: 'TOGGLE_CHOOSE_CATEGORY',
});
export const toggleCollectionExists = () => ({
    type: 'TOGGLE_COLLECTION_EXISTS',
});


// INDICATORS mASSSAGE
export const showSuccessMessage = (message) => ({
    type: 'SHOW_SUCCESS_MESSAGE',
    payload: message,
});
  
export const showErrorMessage = (message) => ({
    type: 'SHOW_ERROR_MESSAGE',
    payload: message,
});
  
export const hideMessage = () => ({
    type: 'HIDE_MESSAGE',
});
