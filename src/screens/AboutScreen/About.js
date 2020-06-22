import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, TextInput, Keyboard } from 'react-native'

import Colors from '../../components/Colors'
import Constants from 'expo-constants';

import Icon from 'react-native-vector-icons/Ionicons';
export default class About extends Component {

    state = {
        keyboardState: 'closed',
        feedback: ''
    }

    componentWillMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    _keyboardDidShow = () => {
        this.setState({
            keyboardState: 'opened'
        });
    }

    _keyboardDidHide = () => {
        this.setState({
            keyboardState: 'closed'
        });
    }

    _renderButton = () => {
        if (this.state.feedback.length > 0) {
            return <TouchableOpacity style={{
                padding: 10,
                borderRadius: 32,
                backgroundColor: Colors.green,
                width: 64,
                height: 64,
                alignSelf: "center",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 10
            }}>
                <Icon name="ios-arrow-forward" size={35} color="white" />

            </TouchableOpacity>
        } else {
            if (this.state.keyboardState === "opened") {
                return <TouchableOpacity style={{
                    padding: 10,
                    borderRadius: 32,
                    backgroundColor: Colors.green,
                    width: 64,
                    height: 64,
                    alignSelf: "center",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 10
                }}>
                    <Icon name="ios-arrow-forward" size={35} color="white" />

                </TouchableOpacity>
            }
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Icon name="ios-arrow-back" size={32} color="black" />
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        flex: 4,
                        alignItems: "center"
                    }}>
                        <Text style={{
                            fontSize: 22,
                            fontWeight: "bold"
                        }}>Daha Fazla</Text>
                    </View>
                    <View style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("HomeScreen")}>
                            <Icon name="ios-airplane" size={32} color="black" />
                        </TouchableOpacity>
                    </View>

                </View>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={{ flex: 1, }}>
                        <TextInput
                            placeholder="Uygulama hakkındaki düşüncelerini alalım!"
                            multiline={true}
                            style={{
                                backgroundColor: "white", padding: 20, paddingTop: 20, margin: 15, borderRadius: 13, height: 120, fontSize: 18, fontWeight: "500", shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 12,
                                },
                                shadowOpacity: 0.1,
                                shadowRadius: 16.00,
                                elevation: 24,
                            }}
                            numberOfLines={3}
                            onChangeText={(text) => this.setState({ feedback: text })}
                        />
                        {this._renderButton()}

                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.yellow,
        justifyContent: "center"
    },
    header: {
        height: 90,
        backgroundColor: Colors.yellow,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        paddingTop: Constants.statusBarHeight
    }
});