import { CHANGE_NAME } from "../constant"

const initialData = {
    name:'mch'
};

export default function nameReducer(state = initialData , action){
    switch(action.type){
        case CHANGE_NAME:
            return {...state, data:'MCH'}
        default:
            return state
    }
}