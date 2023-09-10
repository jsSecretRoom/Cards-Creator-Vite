import { combineReducers } from 'redux';
import inputReducer from './inputReducer';
import checboxReducer from './checboxReducer';
import indicatorsReducer from './indicatorsReducer';

const rootReducer = combineReducers({
  input : inputReducer,
  checkbox : checboxReducer,
  indicators : indicatorsReducer,
  // // Добавьте другие редьюсеры здесь
}); 

export default rootReducer;