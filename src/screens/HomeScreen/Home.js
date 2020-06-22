import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image, Dimensions } from 'react-native'
import Colors from '../../components/Colors'
import Constants from 'expo-constants'

const { width, height } = Dimensions.get('window')
const barHeight = Constants.statusBarHeight;

import Icon from 'react-native-vector-icons/Ionicons';

// Redux Lib
import { connect } from 'react-redux';
import * as actions from '../../store/actions/tarifActions';


import ModalDropdown from 'react-native-modal-dropdown';

import * as Google from 'expo-google-app-auth';
import Favs from '../FavsScreen/Favs'

import {
    AdMobBanner,
} from 'expo-ads-admob';



let config = {
    scopes: ['profile', 'email'],
    iosClientId: '512674340518-i3qlap1qgvbd04lp9tcd9rs96dgf8cqt.apps.googleusercontent.com',
    androidClientId: '512674340518-6ga3cjdl7lq9dgn2phv28rhp9vjs4h8h.apps.googleusercontent.com',
};


class Home extends Component {

    state = {
        favsScreen: false
    }


    all = () => {
        this.props.navigation.navigate("HerSeyScreen", {
            whereto: "hersey"
        })
    }


    corba = () => {
        this.props.navigation.navigate("TarifScreen", {
            whereto: "corba"
        })
    }


    ana_yemek = () => {
        this.props.navigation.navigate("TarifScreen", {
            whereto: "anayemek"
        })
    }

    tatli = () => {
        this.props.navigation.navigate("TarifScreen", {
            whereto: "tatli"
        })
    }




    selectMenu = (option) => {
        if (option == 0) {
            this.setState({ favsScreen: true })
        } else if (option == 1) {
            this.props.logout()
        }
    }

    closeFavoriler = () => {
        this.setState({ favsScreen: !this.state.favsScreen })
    }


    render() {
        return (
            <View style={{ flex: 1, backgroundColor: Colors.yellow,  }}>

                <View style={{ flex: 1, justifyContent: "flex-start", alignItems: "center", }}>
                    <View style={{ height: 90, backgroundColor: Colors.red, width: width, paddingTop: barHeight, padding: 10, flexDirection: "row", }}>
                        <View style={{ flex: 3, justifyContent: "center", alignItems: "flex-start" }}>
                            <Image source={require('../../images/neyesekLogo.png')} style={{ width: 180, height: 75, marginLeft: -10, marginTop: 8 }} />
                        </View>
                        {this.props.auth === true ?
                            <View style={{ flex: 1, justifyContent: "center", }}>
                                <ModalDropdown
                                    dropdownStyle={{
                                        paddingTop: 5,
                                        borderRadius: 10,
                                        paddingBottom: 0,
                                        height: 95,
                                        marginTop: -5,
                                        marginRight: 20,
                                        padding: 5
                                    }}
                                    dropdownTextStyle={{
                                        fontSize: 16,
                                        paddingRight: 8,
                                        paddingLeft: 8
                                    }}
                                    onSelect={(option) => this.selectMenu(option)}
                                    options={['Favoriler', 'Çıkış Yap']}>
                                    <View style={{ flexDirection: "row", justifyContent: "flex-end", alignItems: "flex-end" }}>
                                        <Image source={{ uri: this.props.user.photoUrl }} style={{ width: 36, height: 36, backgroundColor: Colors.red, borderRadius: 24, borderColor: 'white', borderWidth: 1, }} />
                                        {/* <Text style={{ padding: 7, fontSize: 14, color: "white" }}>‍{this.props.user.givenName} </Text> */}
                                        <Icon name="ios-arrow-down" size={28} color="white" style={{ marginRight: 20, marginTop: 5, marginLeft: 10, alignSelf: "flex-end" }} />
                                    </View>
                                </ModalDropdown>
                            </View>

                            :
                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('LoginScreen', { login: true })} style={{ padding: 7, backgroundColor: Colors.green, borderRadius: 5 }}>
                                    <Text style={{ color: "white", fontWeight: "bold" }}>Giriş Yap</Text>
                                </TouchableOpacity>
                            </View>

                        }
                    </View>
                </View>
                {this.state.favsScreen !== true ?
                    <View style={{ flex: 5, justifyContent: "center", alignItems: "center" }}>
                        <TouchableOpacity onPress={() => this.all()} style={{ padding: 15, marginBottom: 13, paddingRight: 45, paddingLeft: 45, backgroundColor: Colors.red, borderRadius: 10 }}>
                            <Text style={{ fontSize: 27, color: "#fff" }}> Her şeyi getir! </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.corba()} style={{ padding: 15, marginBottom: 13, paddingRight: 90, paddingLeft: 90, backgroundColor: Colors.blue, borderRadius: 10 }}>
                            <Text style={{ fontSize: 27, color: "#fff" }}> Çorba </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.ana_yemek()} style={{ padding: 15, marginBottom: 13, paddingRight: 60, paddingLeft: 60, backgroundColor: "#5fb53f", borderRadius: 10 }}>
                            <Text style={{ fontSize: 27, color: "#fff" }}> Ana Yemek </Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.tatli()} style={{ padding: 15, marginBottom: 13, paddingRight: 102, paddingLeft: 102, backgroundColor: "#c741d1", borderRadius: 10 }}>
                            <Text style={{ fontSize: 27, color: "#fff" }}> Tatlı </Text>
                        </TouchableOpacity>
                    </View>
                    :
                    <View style={{ flex: 5, justifyContent: "center", alignItems: "center", top: 20 }}>
                        <Favs navigation={this.props.navigation} favsScreen={() => this.closeFavoriler()} />
                    </View>
                }
                <View style={{
                    flex: 1,
                    // backgroundColor: "red",
                    justifyContent: "flex-end",
                    alignItems: "center"
                }}>

                    <AdMobBanner
                        bannerSize="smartBannerPortrait"
                        adUnitID="ca-app-pub-9786663498474045/9826489875" // Test ID, Replace with your-admob-unit-id
                        servePersonalizedAds // true or false
                        onDidFailToReceiveAdWithError={this.bannerError} />

                </View>
            </View >
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.tarifReducers.user,
        auth: state.tarifReducers.auth,

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(actions.logout())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);