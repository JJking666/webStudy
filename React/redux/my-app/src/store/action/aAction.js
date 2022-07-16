import {INCREMENT,DECREMENT,INIT} from '../constant'

export function incrementData(data){
    return {
        type: INCREMENT,
        data
    }
}

export function decrementData(data){
    return {
        type: DECREMENT,
        data
    }
}

export function initData(){
    return {
        type: INIT,
    }
}

