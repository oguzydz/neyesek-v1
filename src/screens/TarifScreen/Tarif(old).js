import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, Dimensions, ScrollView, ActivityIndicator, Alert } from 'react-native'

import Constants from 'expo-constants';
const deviceWidth = Dimensions.get('window').width

import Colors from '../../components/Colors';
// import tarif from '../../components/tarif.json';
import * as categories from '../../components/categories.json';

import Icon from 'react-native-vector-icons/Ionicons';

// Redux & Actions
import { connect } from 'react-redux';
import * as actions from '../../store/actions/tarifActions';

import TabViewEx from '../../components/TabView'

import {
    AdMobInterstitial,
    AdMobBanner,
} from 'expo-ads-admob';

import * as Network from 'expo-network';

import axios from 'axios';


class Tarif extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            adsCounter: 1,
            adsInterstitial: false,
            yemek: '',
            isFav: () => this.isFav(),
            indexTab: 0,
            routes: [
                { key: 'first', title: 'First' },
                { key: 'second', title: 'Second' },
            ],
            internet: async () => await Network.getNetworkStateAsync()
        }
    }

    componentDidMount = async () => {
        this.setYemek();
        this.focusListener = this.props.navigation.addListener('willFocus', () => {
            this.setYemek();
        });

    }

    addFav = (yemekid) => {

        if (this.props.auth === true) {
            this.props.addFavState(yemekid);
            this.setState({
                isFav: true
            })
        } else {
            Alert.alert(
                "Favorilere Ekle",
                "Maalesef favorilere eklemen için giriş yapmalısın! 🙊",
                [
                    {
                        text: "Cancel",
                        // onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    { text: "OK", onPress: () => this.props.navigation.navigate('LoginScreen', { login: true }) }
                ],
                { cancelable: false }
            );
        }
    }

    _renderTitle = () => {
        const topic = this.props.navigation.getParam('whereto');

        if (topic === "anayemek") {
            return "Ana Yemek Hazır!"
        } else if (topic === "corba") {
            return "Çorba Hazır!"
        } else if (topic === "tatli") {
            return "Tatlı Hazır!"
        } else if (this.props.navigation.getParam('navFav') === true) {
            return "Favorin ❤"
        }
    }

    componentWillUnmount() {
        // Remove the event listener
        // this.focusListener.remove();
    }


    setYemek = async () => {

        this.setState({ loading: true })
        if (this.props.hersey === true) {


            this.setState({
                yemek: this.props.yemek,
                loading: false,
                isFav: this.isFav(),
                internet: async () => await Network.getNetworkStateAsync()
            })

        } else if (this.props.navigation.getParam('navFav') === true) {

            const yemek = this.props.navigation.getParam('yemek')
            this.setState(() => ({
                yemek: yemek,
                loading: false,
                isFav: this.isFav(),
                internet: async () => await Network.getNetworkStateAsync()

            }));


        }
        else {
            const topic = this.props.navigation.getParam('whereto')
            const randomIndex = Math.floor(Math.random() * categories[topic].length);
            const category = categories[topic][randomIndex]

            // const index = Math.floor(Math.random() * this.props.tarif.filter(item => item.recipe.subCategory == category).length);

            await axios.get('http://tarif.oguzydz.me/get.php?category=' + category)
                .then(res => {
                    this.setState({
                        yemek: res.data,
                        loading: false,
                        isFav: this.isFav(),
                        internet: async () => await Network.getNetworkStateAsync()
                    })


                    console.log(res.data)
                });





            // this.setState({
            //     yemek: this.props.tarif.filter(item => item.recipe.subCategory == category)[index],
            //     loading: false,
            //     isFav: this.isFav(),
            //     internet: async () => await Network.getNetworkStateAsync()
            // })

        }

    }



    addFavs = (yemekId) => {
        if (this.props.auth === true) {
            this.props.addFavState(yemekId);
            this.setState({ isFav: true })
        } else {
            Alert.alert(
                "Favorilere Ekle",
                "Maalesef favorilere eklemen için giriş yapmalısın! 🙊",
                [
                    {
                        text: "Cancel",
                        // onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    { text: "OK", onPress: () => this.props.navigation.navigate('LoginScreen', { login: true }) }
                ],
                { cancelable: false }
            );
        }
    }

    removeFavs = (yemekId) => {
        this.props.removeFavState(yemekId);
        this.setState({ isFav: false })
    }


    refreshRandomsNew = async () => {
        this.setState({
            loading: true,
            adsCounter: this.state.adsCounter + 1
        })
        const counter = this.state.adsCounter % 10


        if (counter === 0) {

            if ((await this.state.internet()).isConnected === true) {


                this.setState({
                    adsInterstitial: true
                });
                await AdMobInterstitial.setAdUnitID('ca-app-pub-9786663498474045/3401294709');
                await AdMobInterstitial.requestAdAsync();
                await AdMobInterstitial.showAdAsync();
            } else {
                Alert.alert(
                    "İnternet Bağlantı Sorunu!",
                    "Eğer tariflerin görsellerini görmek istersen internetini açmalısın!",
                    [
                        {
                            text: "İptal",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                        },
                        { text: "Tamam", onPress: () => console.log("OK Pressed") }
                    ],
                    { cancelable: false }
                );
            }

        } else {
            this.setState({ adsInterstitial: false })
        }



        this.setYemek()

    }





    isFav = () => {
        const favs = this.props.favs;

        if (this.props.hersey === true) {

            const topic = this.props.topic
            const randomIndex = Math.floor(Math.random() * categories[topic].length);
            const category = categories[topic][randomIndex]

            const index = Math.floor(Math.random() * this.props.tarif.filter(item => item.recipe.subCategory == category).length);
            const isHere = favs.filter(item => item.id == this.props.tarif.filter(item => item.recipe.subCategory == category)[index].id);


            if (isHere.length > 1) {
                return true;
            } else {
                return false;
            }
        } else if (this.props.navigation.getParam('navFav') === true) {

            return true;

        } else {

            const topic = this.props.navigation.getParam('whereto')
            const randomIndex = Math.floor(Math.random() * categories[topic].length);
            const category = categories[topic][randomIndex]


            const index = Math.floor(Math.random() * this.props.tarif.filter(item => item.recipe.subCategory == category).length);
            const isHere = favs.filter(item => item.id == this.state.yemek.id);


            if (isHere.length > 1) {
                return true;
            } else {
                return false;
            }
        }
    }

    // cleanTitle = (title) => {
    //     title.replace('videolu', '')
    //     title.replace('Videolu', '')
    //     title.replace('(videolu)', '')
    //     title.replace('(Videolu)', '')
    //     return title
    // }

    render() {
        return (
            <View style={styles.container}>
                {this.props.hersey === true ? null :

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
                            justifyContent: "center"
                        }}>
                            <Text style={{
                                fontSize: 22,
                                fontWeight: "bold",
                                textAlign: "center"
                            }}>
                                {/* {this._renderTitle(this.state.yemek.title)} */}
                                {this.state.yemek.title}
                            </Text>
                        </View>
                        <View style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                            {/* <TouchableOpacity onPress={() => this.props.navigation.navigate("AboutScreen")}>
                            <Icon name="ios-finger-print" size={32} color="black" />
                        </TouchableOpacity> */}
                        </View>
                    </View>
                }
                {this.state.loading !== false ? <ActivityIndicator
                    color={Colors.red}
                    size="large"
                    style={{
                        margin: 20
                    }}
                />
                    :
                    <ScrollView style={{ flex: 1 }}>
                        <View style={styles.imageBox}>
                            {this.state.isFav === true ?
                                <View
                                    style={{
                                        position: "absolute",
                                        zIndex: 2,
                                        top: 30,
                                        right: 30,
                                        backgroundColor: "white",
                                        padding: 7,
                                        paddingRight: 9,
                                        paddingLeft: 9,
                                        borderRadius: 30,
                                        shadowColor: "#000",
                                        shadowOffset: {
                                            width: 0,
                                            height: 2,
                                        },
                                        shadowOpacity: 0.25,
                                        shadowRadius: 3.84,
                                        elevation: 5,
                                        borderWidth: 1,
                                        borderColor: Colors.yellow
                                    }}>

                                    <Icon name="ios-star" size={30} color={Colors.yellow} />
                                </View>
                                : null}
                            <Image
                                style={{
                                    width: this.props.hersey === true ? Dimensions.get('window').width - 70 : Dimensions.get('window').width - 30,
                                    height: Dimensions.get('window').height / 2.5,
                                    borderRadius: 15,
                                    borderColor: "#ffb600",
                                    borderWidth: 2,
                                    alignSelf: "center"
                                }}
                                source={(this.state.internet()).isConnected !== true ? this.state.yemek.image === '' ? require('../../images/loading_skeleton.png') : { uri: this.state.yemek.image } : require('../../images/loading_skeleton.png')}
                            />
                        </View>


                        <View style={{
                            flex: 1,
                        }}>
                            <View style={styles.titleBox}>
                                <Text style={{
                                    fontSize: 25,
                                    fontWeight: "500"
                                }}>
                                    {/* {this.cleanTitle(this.state.yemek.title)} */}
                                    {this.state.yemek.title}
                                </Text>
                            </View>
                        </View>
                        <View style={{
                            flex: 1,
                        }}>
                            <View style={styles.infoBox}>
                                <View style={styles.leftInfo}>
                                    <Text style={{ fontSize: 17, color: 'white', fontWeight: "bold" }}>
                                        Hazırlama: {this.state.yemek.recipe.prepDuration}
                                    </Text>
                                </View>
                                <View style={styles.rightInfo}>
                                    <Text style={{ fontSize: 17, color: 'white', fontWeight: "bold" }}>
                                        Pişirme: {this.state.yemek.recipe.cookDuration}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <TabViewEx
                            yemek={this.state.yemek}
                        />
                        <AdMobBanner
                            bannerSize="smartBannerPortrait"
                            adUnitID="ca-app-pub-9786663498474045/9826489875" // Test ID, Replace with your-admob-unit-id
                            servePersonalizedAds // true or false
                            onDidFailToReceiveAdWithError={this.bannerError} />

                    </ScrollView>
                }

                <View style={{ alignItems: "center", flexDirection: "row", width: this.props.hersey === true ? deviceWidth - 57 : deviceWidth, position: "absolute", zIndex: 1, bottom: 0, justifyContent: "center" }}>
                    <View style={{
                        bottom: 0, zIndex: 2, flexDirection: "row", justifyContent: "center", padding: 20, shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,

                        elevation: 5,
                    }}>

                        {this.state.isFav === true ?
                            this.state.loading === false ?
                                <TouchableOpacity
                                    onPress={() => this.removeFavs(this.state.yemek.id)}
                                    style={{
                                        backgroundColor: "white", padding: 10, borderRadius: 30, paddingRight: 15, paddingLeft: 15, flexDirection: "row", justifyContent: "center", alignItems: "center",
                                        shadowColor: "#000",
                                        shadowOffset: {
                                            width: 0,
                                            height: 2,
                                        },
                                        shadowOpacity: 0.30,
                                        shadowRadius: 4.65,

                                        elevation: 8,
                                    }}>
                                    <Icon name="ios-star" size={35} color={Colors.yellow} />
                                </TouchableOpacity> : null

                            : this.state.loading === false ? <TouchableOpacity
                                onPress={() => this.addFavs(this.state.yemek.id)}
                                style={{
                                    backgroundColor: "white", padding: 10, borderRadius: 30, paddingRight: 15, paddingLeft: 15, flexDirection: "row", justifyContent: "center", alignItems: "center",
                                    shadowColor: "#000",
                                    shadowOffset: {
                                        width: 0,
                                        height: 2,
                                    },
                                    shadowOpacity: 0.30,
                                    shadowRadius: 4.65,

                                    elevation: 8,
                                }}>
                                <Icon name="ios-star" size={35} color={"#b5b5b3"} />
                            </TouchableOpacity> : null
                        }
                    </View>
                    {this.state.isFav !== true ?
                        this.props.hersey !== true ?

                            <View style={{
                                bottom: 0, zIndex: 2, flexDirection: "row", justifyContent: "center", padding: 20, shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 2,
                                },
                                shadowOpacity: 0.25,
                                shadowRadius: 3.84,
                                elevation: 5,
                            }}>

                                <TouchableOpacity onPress={() => this.refreshRandomsNew()} style={{
                                    backgroundColor: Colors.red, padding: 10, borderRadius: 30, paddingRight: 15, paddingLeft: 15, flexDirection: "row", justifyContent: "center", alignItems: "center",
                                    shadowColor: "#000",
                                    shadowOffset: {
                                        width: 0,
                                        height: 2,
                                    },
                                    shadowOpacity: 0.30,
                                    shadowRadius: 4.65,

                                    elevation: 8,
                                }}>

                                    <Icon name="ios-refresh" size={40} color="white" />
                                    {/* <Text style={{ fontSize: 17, color: "#fff", paddingLeft: 10 }}>Başka</Text> */}
                                </TouchableOpacity>

                            </View>
                            : null
                        : null}
                </View>
            </View>
        )
    }

}



const mapStateToProps = (state) => {
    return {
        favs: state.tarifReducers.favs,
        auth: state.tarifReducers.auth,
        // tarif: state.jsonReducers.json,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addFavState: (yemek) => dispatch(actions.add_fav(yemek)),
        removeFavState: (yemek) => dispatch(actions.remove_fav(yemek))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tarif);



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    header: {
        height: 90,
        backgroundColor: Colors.yellow,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        paddingTop: Constants.statusBarHeight
    },
    imageBox: {
        width: Dimensions.get('window').width,
        alignSelf: "center",
        justifyContent: "center",
        flex: 2,
        padding: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.3,
        shadowRadius: 16.00,
        elevation: 24,
    },
    titleBox: {
        justifyContent: "center",
        alignItems: "flex-start",
        padding: 20,
        backgroundColor: Colors.yellow,
        margin: 15,
        borderRadius: 15,
        borderColor: "#ffb600",
        borderWidth: 2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.3,
        shadowRadius: 16.00,
        elevation: 24,
    },
    infoBox: {
        justifyContent: "center",
        alignItems: "flex-start",
        padding: 0,
        backgroundColor: Colors.blue,
        margin: 5,
        marginRight: 15,
        marginLeft: 15,
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.3,
        shadowRadius: 16.00,
        elevation: 24,
        flexDirection: 'row',
        borderColor: 'white',
        borderWidth: 1
    },
    leftInfo: {
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 20,
        flex: 1
    },
    rightInfo: {
        paddingTop: 20,
        paddingBottom: 20,
        flex: 1,
        borderLeftWidth: 1,
        borderLeftColor: 'white',
        paddingLeft: 20
    }
});