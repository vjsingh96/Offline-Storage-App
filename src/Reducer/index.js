import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import firstForm from "./firstForm"
import selectImage from "./selectImage"

const allReducers = combineReducers({
  form: formReducer,
  firstFormReducer: firstForm,
  selectImageReducer: selectImage
});
export default allReducers;