import { combineReducers } from 'redux';
import inputReducer from './inputReducer';
import checboxReducer from './checboxReducer'

const rootReducer = combineReducers({
  input : inputReducer,
  checkbox : checboxReducer,
  // // Добавьте другие редьюсеры здесь
});

export default rootReducer;