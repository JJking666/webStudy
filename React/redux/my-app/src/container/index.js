import {connect} from "react-redux"
import {incrementData,initData,decrementData} from "../store/action/aAction"
import BCom from '../components/BCom'

const mapDispatchToProps = (dispatch) => {
    return {
        incrementData,
        decrementData,
        initData
    }
}

const mapStateToProps = (state) =>{
    console.log('mapStateToProps',state)
    return {
        data:state.dataReducer.data
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(BCom)