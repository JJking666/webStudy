import {INCREMENT , DECREMENT, INIT } from '../constant'

const initialData = {
    data:0,
};

export default function dataReducer(state = initialData , action){
    console.log('dataReducer',state,action)
    switch(action.type){
        case INCREMENT:
            return {...state, data:state.data+1}
        case DECREMENT:
            return {...state, data:state.data-1}
        case INIT:
            return {...state, data:110}
        default:
            return state    
    }
}

