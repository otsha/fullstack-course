import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import currentUserReducer from './reducers/currentUserReducer'
import userReducer from './reducers/userReducer'

const reducer = combineReducers({
  notification: notificationReducer,
  blogs: blogReducer,
  user: currentUserReducer,
  allUsers: userReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store