import { combineReducers } from 'redux';
import { LoginReducer } from './login-reducer';
import { ModalReducer } from './modal-reducer';
import { HomeReducer } from './home-reducer';
import { AboutReducer } from './about-reducer';
import { MongoModalReducer } from './MongoModal-reducer';
import { SocketReducer } from '../pages/SocketPage/Socket-Reducer';

const allReducers = combineReducers({
    LoginReducer,
    ModalReducer,
    HomeReducer,
    AboutReducer,
    MongoModalReducer,
    SocketReducer
});

export default allReducers;