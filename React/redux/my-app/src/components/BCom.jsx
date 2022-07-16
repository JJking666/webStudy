import React from "react"
import store from '../store'
// import {mapDispatchToProps} from "react"


export default function BCom (props){
    const click = ()=>{
        console.log(props)
    }
    return (
    <div>
        <button onClick={()=>store.dispatch(props.incrementData())}>+{props.data}</button>
        <button onClick={()=>store.dispatch(props.decrementData())}>+{props.data}</button>
        <button onClick={()=>store.dispatch(props.initData())}>+{props.data}</button>
        <button onClick={()=>click()}>+{props.data}</button>
    </div>)
}

