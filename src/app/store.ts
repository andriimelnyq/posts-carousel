import { combineReducers, legacy_createStore as createStore } from 'redux';
import postReducer from '../features/currentPost';
import usersReducer from '../features/users';
import errorReducer from '../features/error';

const reducer = combineReducers({
  post: postReducer,
  users: usersReducer,
  error: errorReducer,
});
const store = createStore(reducer);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
