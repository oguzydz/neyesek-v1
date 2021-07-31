import React, { Component } from 'react'
import { Text, View, Dimensions, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native'

const { width, height } = Dimensions.get('window')


// Redux & Actions
import { connect } from 'react-redux';

import Colors from '../../components/Colors'
import Icon from 'react-native-vector-icons/Ionicons';

// import tarif from '../../components/tarif.json';


class Favs extends Component {

    pushFav = (yemek) => {
        this.props.navigation.navigate("TarifScreen", {
            yemek: yemek,
            navFav: true
        })
    }


    render() {
        const favs = [];
        return (
            <View style={{ backgroundColor: "white", borderRadius: 10 }}>
                <View style={{ flexDirection: "row", justifyContent: "center" }}>
                    <Text style={{ padding: 15, fontSize: 28, fontWeight: "bold", flex: 1 }}>Favoriler 😍</Text>
                    <TouchableOpacity
                        onPress={() => this.props.favsScreen()}
                        style={{ alignSelf: "flex-end", justifyContent: "flex-end" }}>
                        <Icon name="ios-close" size={60} color="black" style={{ marginRight: 25, marginTop: 5 }} />
                    </TouchableOpacity>
                </View>


                <ScrollView style={{ flex: 1, backgroundColor: "white", width: width - 60, borderRadius: 10 }}>
                    {this.props.favs.length > 0 ?

                        this.props.favs.map((id, index) => {
                            const item = this.props.tarif.filter(item => item.id == id)[0]
                            return (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => this.pushFav(item)}
                                    style={{ padding: 15, paddingLeft: 15, paddingRight: 15, paddingBottom: 10, margin: 10, backgroundColor: Colors.red, borderRadius: 10 }}>
                                    <View style={{ flexDirection: "row" }}>
                                        <View style={{ flex: 1, padding: 20, paddingLeft: 5 }}>

                                            <Text style={{
                                                color: "white",
                                                fontSize: 19,
                                                fontWeight: "500",

                                            }}>{item.title}</Text>
                                        </View>
                                        <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-end" }}>
                                            <Image style={{ width: 120, height: 100, borderRadius: 5, borderColor: "white", borderWidth: 1 }}
                                                source={item.image != null ? { uri: item.image } : require('../../images/loading_skeleton.png')}
                                            />
                                        </View>
                                    </View>
                                    <TouchableOpacity style={{ flexDirection: "row" }} onPress={() => this.pushFav(item)}>
                                        <View style={{ justifyContent: "center", flex: 1 }}>
                                            <Text style={{ color: "white", paddingLeft: 5, paddingTop: 8 }}>Tarifi Görüntüle</Text>
                                        </View>
                                        <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-end", paddingTop: 10, paddingRight: 5 }}>
                                            <Icon name="ios-open" size={32} color="white" />
                                        </View>
                                    </TouchableOpacity>
                                </TouchableOpacity>
                            )

                        })
                        :
                        <View style={{ flex: 1, width: width - 60, justifyContent: "center", alignItems: "center", height: 100 }}>
                            <Text style={{ fontSize: 18 }}>
                                Henüz hiç favorin yok!😭
                            </Text>
                        </View>
                    }
                </ScrollView>
            </View>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        favs: state.tarifReducers.favs,
        tarif: state.jsonReducers.json,
    }
}

export default connect(mapStateToProps, null)(Favs);

const styles = StyleSheet.create({
    box: {
        backgroundColor: "red",
        padding: 20
    }
})