import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, AsyncStorage, ActivityIndicator, Dimensions, Linking } from 'react-native'
import Colors from '../../components/Colors';

import * as firebase from 'firebase';
import "firebase/app";
import "firebase/auth";
import axios from 'axios';

import * as Google from 'expo-google-app-auth';

// Redux Lib
import { connect } from 'react-redux';
import * as actions from '../../store/actions/tarifActions';
import * as JSONactions from '../../store/actions/jsonActions';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { Notifications } from 'expo';
import { NavigationEvents } from 'react-navigation';

import * as Network from 'expo-network';

const { width, height } = Dimensions.get('window');




class Login extends Component {

    state = {
        user: '',
        loading: false,
        message: '',
        result: '',
        expoPushToken: '',
        user_ip: '',
        user_version: '',
        version_warn: false
    }

    login = async () => {
        this.setState({
            loading: true
        })

        await Google.logInAsync({
            scopes: ['profile', 'email'],
            iosClientId: '512674340518-i3qlap1qgvbd04lp9tcd9rs96dgf8cqt.apps.googleusercontent.com',
            androidClientId: '512674340518-6ga3cjdl7lq9dgn2phv28rhp9vjs4h8h.apps.googleusercontent.com',
            androidStandaloneAppClientId: '512674340518-6ka4iv6cn7096upobq249i6mv014tngb.apps.googleusercontent.com',
            iosStandaloneAppClientId: '512674340518-i3qlap1qgvbd04lp9tcd9rs96dgf8cqt.apps.googleusercontent.com',
            // behavior: 'web'
        }).then(response => {
            if (response.type === 'success') {
                this.setState({
                    loading: false,
                    user: response.user,
                    result: response.type,
                })
                this.props.login({ user: response.user, token: this.state.expoPushToken })
                if (this.props.auth === true) {
                    this.props.navigation.navigate("HomeScreen")
                }


                const dbUser = {
                    "user_id": response.user.id.toString(),
                    "name": response.user.name.toString(),
                    "email": response.user.email.toString(),
                    "expoPushToken": this.state.expoPushToken.toString(),
                    "photoUrl": response.user.photoUrl.toString(),
                    "givenName": response.user.givenName.toString(),
                    "familyName": response.user.familyName.toString()
                }

            }
        }).then(response => {



        }).catch(() => {
            this.setState({
                message: "Bir şeyler yanlış gitti, tekrar deneyin!",
                loading: false,
                result: "error"
            });
        });


        const { user } = this.state;

        const dbUser = {
            "user_id": user.id.toString(),
            "allName": user.name.toString(),
            "email": user.email.toString(),
            "expoPushToken": this.state.expoPushToken.toString(),
            "photoUrl": user.photoUrl.toString(),
            "givenName": user.givenName.toString(),
            "familyName": user.familyName.toString(),
            "createdAt": new Date().getTime().toString(),
            "lastLogged": new Date().getTime().toString(),
            "isAnonymous": ("false").toString(),
            "user_ip": this.state.user_ip
        }

        this.sendUser(dbUser);
    }




    sendUser = async (getUser) => {

        const formData = new FormData();
        formData.append('data', JSON.stringify(getUser));

        axios({
            method: "POST",
            url: "http://notifier.oguzydz.me/user.php",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            data: formData
        }).then(res => {
            console.log(res.data)
        }).catch(err => {
            console.log(err)
        })



    }
    registerForPushNotificationsAsync = async () => {
        if (Constants.isDevice) {

            const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);

            let finalStatus = existingStatus;

            if (existingStatus !== 'granted') {
                const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }
            const token = await Notifications.getExpoPushTokenAsync();
            this.setState({ expoPushToken: token });
        } else {
            alert('Must use physical device for Push Notifications');
        }

        if (Platform.OS === 'android') {
            Notifications.createChannelAndroidAsync('default', {
                name: 'default',
                sound: true,
                priority: 'max',
                vibrate: [0, 250, 250, 250],
            });
        }
    };


    componentDidMount = async () => {
        this.registerForPushNotificationsAsync();
        if (this.props.auth === true) {
            this.props.navigation.navigate("HomeScreen")
        }

        this.json_update();


        // console.log(await Network.getNetworkStateAsync())
        await Network.getIpAddressAsync().then(ip => {
            this.setState({
                user_ip: ip
            })
        });

        this.alertForUpdate();
    }

    json_update = () => {
        this.props.json_update();
    }

    withoutLogin = () => {
        // burada anonim olarak kullanıcı girişi olacak
        const anonim_user = {
            "user_id": Constants.installationId.toString(),
            "expoPushToken": this.state.expoPushToken.toString(),
            "createdAt": new Date().getTime().toString(),
            "lastLogged": new Date().getTime().toString(),
            "isAnonymous": ("true").toString(),
            "user_ip": this.state.user_ip.toString()
        }


        // this.props.login_anonymous(anonim_user);
        this.sendUser(anonim_user);

        this.props.navigation.navigate("HomeScreen")
    }


    alertForUpdate = () => {

        axios({
            method: "POST",
            url: "http://notifier.oguzydz.me/update_version.php",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },

        }).then(res => {
            this.setState({
                user_version: res.data
            })
        }).catch(err => {
            console.log(err)
        })

        if (Constants.nativeBuildVersion !== this.state.user_version) {
            this.setState({
                version_warn: true,
            })
        }
    }

    updateToStore = () => {
        Linking.openURL("https://play.google.com/store/apps/details?id=com.neyesek");
    }


    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.props.json_loading === true ? <View style={[{
                    alignContent: "center", justifyContent: "center",
                    padding: 50
                }]}>
                    <ActivityIndicator
                        color="#4285F4"
                        size="large"
                        style={{ alignSelf: "center" }}
                    />
                </View> : null
                }


                <NavigationEvents
                    onDidFocus={() => {
                        if (this.props.navigation.getParam('login') === true) {
                            this.login()
                        }
                    }}
                />
                {
                    this.state.result === "error" ?
                        <View style={{ backgroundColor: "#E03737", height: 80, zIndex: 2, position: "absolute", top: 0, left: 0, width: width, justifyContent: "center", alignItems: "center", paddingTop: Constants.statusBarHeight }}>
                            <Text style={{ color: "white", fontSize: 16, fontWeight: '500' }}>
                                {this.state.message}
                            </Text>
                        </View>

                        : null
                }
                <View style={styles.container}>
                    <View style={{ flex: 3, justifyContent: "flex-end", alignItems: "center", }}>
                        <Image source={require('../../images/neyesekLogo.png')} style={{ width: 270, height: 115, backgroundColor: Colors.red, borderRadius: 13, marginBottom: 30 }} />
                    </View>
                    <View style={{ flex: 2, justifyContent: "center" }}>
                        {this.state.loading == false ? <TouchableOpacity onPress={() => this.login()} style={styles.button}>
                            <Image
                                source={require('../../images/googleLogo.png')}
                                style={{ width: 29, height: 28, marginRight: 22, }}
                            />
                            <Text style={{ fontSize: 17, color: "#4285F4", fontWeight: "600", flex: 1, textAlign: "center" }}>
                                Google ile Giriş Yap!
                            </Text>
                        </TouchableOpacity>
                            : <View style={[styles.button, { alignContent: "center", justifyContent: "center" }]}>
                                <ActivityIndicator
                                    color="#4285F4"
                                    size="large"
                                    style={{ alignSelf: "center" }}
                                />
                            </View>}


                    </View>
                    <View style={{ flex: 2, alignItems: "center" }}>

                        <TouchableOpacity style={{ padding: 15 }} onPress={() => this.withoutLogin()}>
                            <Text style={{ fontSize: 16, color: "#4d390a" }}>Giriş yapmadan devam et</Text>
                        </TouchableOpacity>
                        {this.state.version_warn === true ?
                            <TouchableOpacity style={{
                                marginTop: 50, backgroundColor: "white", padding: 15, borderRadius: 30, shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 12,
                                },
                                shadowOpacity: 0.12,
                                shadowRadius: 16.00,

                                elevation: 24,
                                borderColor: "#ffb600",
                                borderWidth: 2
                            }} onPress={() => this.updateToStore()}>
                                <Text style={{ fontSize: 16, color: "#4285F4", fontWeight: "600" }}>Güncelle!</Text>
                            </TouchableOpacity> : null}
                    </View>
                </View>
            </View >
        )
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.tarifReducers.user,
        auth: state.tarifReducers.auth,
        json_loading: state.jsonReducers.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (user) => dispatch(actions.login(user)),
        json_update: () => dispatch(JSONactions.json_update()),
        login_anonymous: (user) => dispatch(actions.login_anonymous(user)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
        backgroundColor: Colors.yellow
    },
    logo: {
        color: "#000",
        fontSize: 35,
        fontWeight: "bold",
        padding: 20
    },
    button: {
        backgroundColor: "white",
        padding: 20,
        margin: 45,
        marginTop: 0,
        alignItems: "center",
        borderRadius: 50,
        flexDirection: "row",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.12,
        shadowRadius: 16.00,

        elevation: 24,
        borderColor: "#ffb600",
        borderWidth: 2
    }
})