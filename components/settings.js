import React from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import { AsyncStorage } from "react-native"


storeData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (error) {
        // Error saving data
    }
}


export class SettingsScreen extends React.Component {
    static navigationOptions = {
        title: 'Settings',
    };
    constructor(props) {
        super(props);
        this.state = {url: "", date: new Date()};
        AsyncStorage.getItem("url").then(
            (url) => {
                this.setState({url})
            }
        );
        AsyncStorage.getItem("dashboardurl").then(
            (dashboardurl) => {
                this.setState({dashboardurl})
            }
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={[styles.header]}></View>
                <View style={[styles.content]}>
                    <Text>Survey Monkey URL</Text>
                    <TextInput
                        style={{height: 40, width: "100%"}}
                        autoCapitalize="none"
                        clearButtonMode="while-editing"
                        keyboardType={"url"}
                        autoCorrect={false}
                        returnKeyType={"done"}
                        enablesReturnKeyAutomatically={true}
                        placeholder="Enter your Survey Monkey URL:"
                        onChangeText={(url) => {
                            storeData("url", url)
                            this.setState({url});
                        }}
                        value={this.state.url}
                    />
                    <Text>{"https://www.surveymonkey.com/r/" + this.state.url}</Text>
                    <Text>Dashboard URL</Text>
                    <TextInput
                        style={{height: 40, width: "100%"}}
                        autoCapitalize="none"
                        clearButtonMode="while-editing"
                        keyboardType={"url"}
                        autoCorrect={false}
                        returnKeyType={"done"}
                        enablesReturnKeyAutomatically={true}
                        placeholder="Enter your Survey Monkey URL:"
                        onChangeText={(dashboardurl) => {
                            storeData("dashboardurl", dashboardurl)
                            this.setState({dashboardurl});
                        }}
                        value={this.state.dashboardurl}
                    />
                    <Text>{"https://www.surveymonkey.com/results/" + this.state.dashboardurl}</Text>
                    <Text>Reminder Time</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
    },
    header: {
        height: 40,
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        backgroundColor: '#03A9F4',
        zIndex: 10
    },
    content: {
        alignItems: 'center',
        marginTop: 50,
        marginBottom: 40
    }
});
