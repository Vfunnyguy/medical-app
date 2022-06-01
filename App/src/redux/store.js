import { configureStore,applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from './reducer/index';
import { composeWithDevTools } from "redux-devtools-extension";
const store=configureStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
)
export default store