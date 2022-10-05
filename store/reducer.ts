import { combineReducers } from "redux";
import notificationReducer from "./slices/template/notification";
import authReducer from './slices/auth/auth'
const reducer = combineReducers({
  notification: notificationReducer,
  auth:authReducer
});

export default reducer;
