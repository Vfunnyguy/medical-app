import { configureStore,applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import rootReducer from './reducer/index';
import { composeWithDevTools } from "redux-devtools-extension";
// import { authReducer } from "./reducer/authReducer";
import authReducer from '././slice/authSlice'
export default configureStore({
    reducer:{
        auth:authReducer
    }
})