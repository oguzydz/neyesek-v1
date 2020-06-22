import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'
import Login from '../LoginScreen/Login'
import Home from '../HomeScreen/Home'

class Check extends Component {

    render() {
        if (this.props.auth === false) {
            return <Login navigation={this.props.navigation} />
        } else {
            return <Home navigation={this.props.navigation} />
        }
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.tarifReducers.auth,
    }
}


export default connect(mapStateToProps, null)(Check)
