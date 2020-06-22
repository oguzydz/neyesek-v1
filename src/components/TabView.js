import * as React from 'react';
import { View, Text, StyleSheet, Dimensions, StatusBar } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { Constants } from 'expo';



// This is our placeholder component for the tabs
// This will be rendered when a tab isn't loaded yet
// You could also customize it to render different content depending on the route
const LazyPlaceholder = ({ route }) => (
    <View style={styles.scene}>
        <Text>Loading {route.title}…</Text>
    </View>
);

export default class TabViewExample extends React.Component {
    state = {
        index: 0,
        routes: [
            { key: 'first', title: 'Malzemeler' },
            { key: 'second', title: 'Tarİf' },
        ],
    };

    _handleIndexChange = index => this.setState({ index });

    _renderLazyPlaceholder = ({ route }) => <LazyPlaceholder route={route} />;


    toTurkishUpper = (word) => {
        var letters = { "i": "İ", "ş": "Ş", "ğ": "Ğ", "ü": "Ü", "ö": "Ö", "ç": "Ç", "ı": "I" };
        word = word.replace(/(([iışğüçö]))/g, function (letter) { return letters[letter]; })
        return word.toUpperCase();
    }


    render() {
        const FirstRoute = () => this.props.yemek.malzemeler.map((item, index) => {

            if (item.search("<malzeme>") === 0) {
                return (
                    <View
                        key={index}
                        style={{
                            marginRight: 20,
                            marginLeft: 20,
                            padding: 5,
                            // backgroundColor: "#f0f0f0",
                            borderRadius: 5,
                            borderColor: "#f0f0f0",
                            borderWidth: 2,
                            marginBottom: 5,
                            marginTop: 5
                        }}
                    >
                        <Text key={index}
                            style={{
                                fontSize: 17,
                                padding: 5
                            }}
                        >
                            {item.replace('<malzeme>', '')}
                        </Text>
                    </View>
                )
            } else if (item.search("<baslik>") === 0) {
                return (
                    <View style={{
                        padding: 10,
                        backgroundColor: "#e8e8e8",
                        height: 50,
                        margin: 20,
                        borderRadius: 5,
                        paddingTop: 15
                    }}
                        key={index}>
                        <Text
                            style={{
                                fontSize: 17,
                                fontWeight: "500",
                            }}
                        >
                            {this.toTurkishUpper(item.replace('<baslik>', '').replace(';', ''))}
                        </Text>
                    </View>
                )
            }

        })

        const SecondRoute = () => this.props.yemek.hazirlanis.map((item, index) => {
            return (
                <View style={{
                    marginRight: 20,
                    marginLeft: 20,
                    padding: 5,
                    // backgroundColor: "#f0f0f0",
                    borderRadius: 5,
                    borderColor: "#f0f0f0",
                    borderWidth: 2,
                    marginBottom: 5,
                    marginTop: 5
                }}

                    key={index}>
                    <Text key={index}
                        style={{
                            fontSize: 17,
                            padding: 10
                        }}
                    >
                        [{index + 1}] {item}
                    </Text></View>)
        })



        return (
            <TabView
                navigationState={this.state}
                renderScene={SceneMap({
                    first: FirstRoute,
                    second: SecondRoute,
                })}
                onIndexChange={this._handleIndexChange}
                initialLayout={{ width: Dimensions.get('window').width }}
                style={styles.container}

            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        borderColor: "#ffb600",
        borderWidth: 2,
        marginBottom: 60,
        margin: 15,
        borderRadius: 15,
        fontSize: 20,
        fontWeight: "500",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.3,
        shadowRadius: 16.00,
        elevation: 24,
        marginBottom: 100,
    },
    scene: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});
