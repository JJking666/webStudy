import {createStore,applyMiddleware} from 'redux'
import thunk  from 'redux-thunk'
import allReducers from './reducers'
// import {incrementData,decrementData,initData} from './action/aAction'
// import {changeName} from './action/bAction'

const store = createStore(allReducers,applyMiddleware(thunk))
export default store
console.log(store.getState())

// 每次 state 更新时，打印日志
// 注意 subscribe() 返回一个函数用来注销监听器


// 发起一系列 action
// store.dispatch(incrementData('Learn about actions'))
// store.dispatch(decrementData('Learn about reducers'))
// store.dispatch(initData())
// store.dispatch(changeName())