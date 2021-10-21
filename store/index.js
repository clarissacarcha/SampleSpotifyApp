import thunk from 'redux-thunk'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import user from './reducers/user'
import auth from './reducers/auth'
import playlist from './reducers/playlist'
import browse from './reducers/browse'

const rootReducer = combineReducers({
  user,
  auth,
  playlist,
  browse,
})

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)

export default store
