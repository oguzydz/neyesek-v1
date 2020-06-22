import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, TouchableOpacity, ActivityIndicator, Dimensions, ScrollView } from 'react-native'
import Colors from '../../components/Colors';
import Constants from 'expo-constants';

import tarif from '../../components/tarif.json';
import * as categories from '../../components/categories.json';

import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import Tarif from '../TarifScreen/Tarif';

import Modal from 'react-native-modal';

import { LinearGradient } from 'expo-linear-gradient';

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height



export default class HerSey extends Component {

    constructor(props) {
        super(props);
        this.state = {
            AYloading: true,
            CorbaLoading: true,
            TatliLoading: true,
            ayShow: false,
            corbaShow: false,
            tatliShow: false,
            anayemek: '',
            corba: '',
            tatli: ''
        }
    }

    componentDidMount = () => {

        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            this.refreshRandoms();
            this.setState({ AYloading: false })
            this.setState({ CorbaLoading: false })
            this.setState({ TatliLoading: false })
        });

    }

    refreshRandoms = () => {

        const randomay = Math.floor(Math.random() * categories["anayemek"].length);
        const randomTatli = Math.floor(Math.random() * categories["tatli"].length);
        const randomCorba = Math.floor(Math.random() * categories["corba"].length);

        const get_tarif_ay = tarif.filter(item => {
            const get = () => item.recipe.mainCategory === categories["anayemek"][randomay];
            if (get.length === 0) {
                return item.recipe.subCategory === categories["anayemek"][randomay];
            } else {
                return item.recipe.mainCategory === categories["anayemek"][randomay]
            }
        });

        const randomIndexAY2 = Math.floor(Math.random() * get_tarif_ay.length);

        const get_tarif_tatli = tarif.filter(item => {
            const get = () => item.recipe.mainCategory === categories["tatli"][randomTatli];
            if (get.length === 0) {
                return item.recipe.subCategory === categories["tatli"][randomTatli];
            } else {
                return item.recipe.mainCategory === categories["tatli"][randomTatli]
            }
        });

        const randomIndexTatli2 = Math.floor(Math.random() * get_tarif_tatli.length);

        const get_tarif_corba = tarif.filter(item => {
            const get = () => item.recipe.mainCategory === categories["corba"][randomCorba];
            if (get.length === 0) {
                return item.recipe.subCategory === categories["corba"][randomCorba];
            } else {
                return item.recipe.mainCategory === categories["corba"][randomCorba]
            }
        });

        const randomIndexCorba2 = Math.floor(Math.random() * get_tarif_corba.length);



        this.setState({
            anayemek: get_tarif_ay[randomIndexAY2],
            tatli: get_tarif_tatli[randomIndexTatli2],
            corba: get_tarif_corba[randomIndexCorba2]
        })


        console.log('-------');
        console.log(get_tarif_ay[randomIndexAY2].title);
        console.log(get_tarif_tatli[randomIndexTatli2].title);
        console.log(get_tarif_corba[randomIndexCorba2].title);
        console.log('-------');
        

    }

    componentWillUnmount() {
        // Remove the event listener
        this.focusListener.remove();
    }

    openMenu = (topic) => {
        if (topic === "ay") {
            this.setState({ ayShow: !this.state.ayShow })
        } else if (topic === "çorba") {
            this.setState({ corbaShow: !this.state.corbaShow })
        } else if (topic === "tatli") {
            this.setState({ tatliShow: !this.state.tatliShow })
        }
    }

    /* Methods that handled the events */
    handlePressIn = (event) => {
        // Do stuff when the view is touched
        console.log(event)
    }

    handlePressOut = () => {
        // Do stuff when the the touch event is finished
        console.log(event)

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
                        }}>Ziyafet Hazır!</Text>
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

                <ScrollView >
                    {this.state.AYloading !== false ? <View style={{ height: 100, margin: 10, backgroundColor: Colors.red, borderRadius: 10, justifyContent: "center", alignItems: "center" }}><ActivityIndicator
                        color="white"
                        size="large"
                        style={{
                            margin: 20
                        }}
                    /></View>
                        :
                        <TouchableOpacity
                            onPress={() => this.openMenu("ay")}
                            style={{ padding: 15, paddingLeft: 15, paddingRight: 15, paddingBottom: 10, margin: 10, backgroundColor: Colors.red, borderRadius: 10 }}>
                            <View style={{ flexDirection: "row" }}>
                                <View style={{ flex: 1, padding: 20, paddingLeft: 5 }}>
                                    <Text style={{
                                        color: "white",
                                        fontSize: 14,
                                        fontWeight: "500",
                                    }}>Ana Yemek</Text>
                                    <Text style={{
                                        color: "white",
                                        fontSize: 19,
                                        fontWeight: "500",

                                    }}>{this.state.anayemek.title}</Text>
                                </View>
                                <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-end" }}>
                                    <Image style={{ width: 120, height: 100, borderRadius: 5, borderColor: "white", borderWidth: 1 }}
                                        source={this.state.anayemek.image != null ? { uri: this.state.anayemek.image } : require('../../images/loading_skeleton.png')}
                                    />
                                </View>
                            </View>
                            <TouchableOpacity style={{ flexDirection: "row" }} onPress={() => this.openMenu("ay")}>
                                <View style={{ justifyContent: "center", flex: 1 }}>
                                    <Text style={{ color: "white", paddingLeft: 5, paddingTop: 8 }}>Tarifi Görüntüle</Text>
                                </View>
                                <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-end", paddingTop: 10, paddingRight: 5 }}>
                                    <Icon name="ios-open" size={32} color="white" />
                                </View>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    }


                    {this.state.CorbaLoading !== false ? <View style={{ height: 100, margin: 10, backgroundColor: Colors.blue, borderRadius: 10, justifyContent: "center", alignItems: "center" }}><ActivityIndicator
                        color="white"
                        size="large"
                        style={{
                            margin: 20
                        }}
                    /></View>
                        :
                        <TouchableOpacity
                            onPress={() => this.openMenu("çorba")}
                            style={{ padding: 15, paddingLeft: 15, paddingRight: 15, paddingBottom: 10, margin: 10, backgroundColor: Colors.blue, borderRadius: 10 }}>
                            <View style={{ flexDirection: "row", }}>
                                <View style={{ flex: 1, padding: 20, paddingLeft: 5 }}>

                                    <Text style={{
                                        color: "white",
                                        fontSize: 14,
                                        fontWeight: "500",

                                    }}>Çorba</Text>
                                    <Text style={{
                                        color: "white",
                                        fontSize: 19,
                                        fontWeight: "500",

                                    }}>{this.state.corba.title}</Text>
                                </View>
                                <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-end" }}>
                                    <Image style={{ width: 120, height: 100, borderRadius: 5, borderColor: "white", borderWidth: 1 }}
                                        source={this.state.corba.image != null ? { uri: this.state.corba.image } : require('../../images/loading_skeleton.png')}

                                    />
                                </View>
                            </View>
                            <TouchableOpacity style={{ flexDirection: "row" }} onPress={() => this.openMenu("çorba")}>
                                <View style={{ justifyContent: "center", flex: 1 }}>
                                    <Text style={{ color: "white", paddingLeft: 5, paddingTop: 8 }}>Tarifi Görüntüle</Text>
                                </View>
                                <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-end", paddingTop: 10, paddingRight: 5 }}>
                                    <Icon name="ios-open" size={32} color="white" />
                                </View>
                            </TouchableOpacity>
                        </TouchableOpacity>

                    }


                    {this.state.TatliLoading !== false ? <View style={{ height: 100, margin: 10, backgroundColor: Colors.green, borderRadius: 10, justifyContent: "center", alignItems: "center" }}><ActivityIndicator
                        color="white"
                        size="large"
                        style={{
                            margin: 20
                        }}
                    /></View>
                        :
                        <TouchableOpacity
                            onPress={() => this.openMenu("tatli")}
                            style={{ padding: 15, paddingLeft: 15, paddingRight: 15, paddingBottom: 10, margin: 10, backgroundColor: Colors.green, borderRadius: 10, marginBottom: 100 }}>
                            <View style={{ flexDirection: "row", }}>
                                <View style={{ flex: 1, padding: 20, paddingLeft: 5 }}>

                                    <Text style={{
                                        color: "white",
                                        fontSize: 14,
                                        fontWeight: "500",

                                    }}>Tatlı</Text>
                                    <Text style={{
                                        color: "white",
                                        fontSize: 19,
                                        fontWeight: "500",

                                    }}>{this.state.tatli.title}</Text>
                                </View>
                                <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-end" }}>
                                    <Image style={{ width: 120, height: 100, borderRadius: 5, borderColor: "white", borderWidth: 1 }}
                                        source={this.state.tatli.image != null ? { uri: this.state.tatli.image } : require('../../images/loading_skeleton.png')}

                                    />
                                </View>
                            </View>
                            <TouchableOpacity style={{ flexDirection: "row" }} onPress={() => this.openMenu("tatli")}>
                                <View style={{ justifyContent: "center", flex: 1 }}>
                                    <Text style={{ color: "white", paddingLeft: 5, paddingTop: 8 }}>Tarifi Görüntüle</Text>
                                </View>
                                <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-end", paddingTop: 10, paddingRight: 5 }}>
                                    <Icon name="ios-open" size={32} color="white" />
                                </View>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    }
                </ScrollView>


                <Modal
                    isVisible={this.state.ayShow}
                    onBackdropPress={() => this.setState({ ayShow: !this.state.ayShow })}>
                    <View style={{ flex: 1, backgroundColor: "white", margin: 10, borderRadius: 20, paddingBottom: 20, marginBottom: 15, marginTop: 15 }}>
                        <TouchableOpacity onPress={() => this.setState({ ayShow: !this.state.ayShow })}>
                            <Icon name="ios-close" size={60} color="black" style={{ alignSelf: "flex-end", marginRight: 25, marginTop: 5 }} />
                        </TouchableOpacity>
                        <Tarif navigation={this.props.navigation} yemek={this.state.anayemek} topic={"anayemek"} hersey={true} />

                    </View>
                </Modal>


                <Modal
                    isVisible={this.state.corbaShow}
                    onBackdropPress={() => this.setState({ ayShow: !this.state.corbaShow })}>
                    <View style={{ flex: 1, backgroundColor: "white", margin: 10, borderRadius: 20, paddingBottom: 20, marginBottom: 15, marginTop: 15 }}>
                        <TouchableOpacity onPress={() => this.setState({ corbaShow: !this.state.corbaShow })}>
                            <Icon name="ios-close" size={60} color="black" style={{ alignSelf: "flex-end", marginRight: 25, marginTop: 5 }} />
                        </TouchableOpacity>
                        <Tarif navigation={this.props.navigation} yemek={this.state.corba} topic={"corba"} hersey={true} />

                    </View>
                </Modal>



                <Modal
                    isVisible={this.state.tatliShow}
                    onBackdropPress={() => this.setState({ tatliShow: !this.state.tatliShow })}>
                    <View style={{ flex: 1, backgroundColor: "white", margin: 10, borderRadius: 20, paddingBottom: 20, marginBottom: 15, marginTop: 15 }}>
                        <TouchableOpacity onPress={() => this.setState({ tatliShow: !this.state.tatliShow })}>
                            <Icon name="ios-close" size={60} color="black" style={{ alignSelf: "flex-end", marginRight: 25, marginTop: 5 }} />
                        </TouchableOpacity>
                        <Tarif navigation={this.props.navigation} yemek={this.state.tatli} topic={"tatli"} hersey={true} />

                    </View>
                </Modal>




                <View style={{
                    position: "absolute", bottom: 0, zIndex: 2, width: deviceWidth, flexDirection: "row", justifyContent: "center", alignItems: "center", padding: 20, shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,

                    elevation: 5,
                }}>
                    <TouchableOpacity onPress={() => this.refreshRandoms()} style={{
                        backgroundColor: Colors.red, padding: 10, borderRadius: 30, paddingRight: 15, paddingLeft: 15, flexDirection: "row", justifyContent: "center", alignItems: "center",
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 3,
                        },
                        shadowOpacity: 0.29,
                        shadowRadius: 4.65,

                        elevation: 7,
                    }}>
                        <Icon name="ios-refresh" size={40} color="white" />
                        <Text style={{ fontSize: 17, color: "#fff", paddingLeft: 10 }}>Yenile</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.yellow,
        justifyContent: "center",
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