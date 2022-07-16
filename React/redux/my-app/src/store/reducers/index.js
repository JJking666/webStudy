import {combineReducers} from 'redux'
import dataReducer from './aReducer'
import nameReducer from './bReducer'

const allReducers = combineReducers({
    dataReducer,nameReducer
})
export default allReducers