import React from 'react';
import {StyleSheet, WebView, View, Button} from 'react-native';
import { AsyncStorage } from "react-native";
import { NavigationEvents } from 'react-navigation';

storeData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (error) {
        // Error saving data
    }
};

export class HomeScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {url: "", date: new Date(), key: 0};

        AsyncStorage.getItem("url").then(
            (url) => {
                if (url === null) {
                    url = "";
                }
                url = "https://www.surveymonkey.com/r/" + url;
                this.setState({url});
            }
        );
        this.webview = React.createRef();

    }

    reloadPage = () => {
        this.setState({key: this.state.key + 1})
    }

    render() {
        return (
            <WebView
                key={this.state.key}
                ref={this.webview}
                source={{uri: this.state.url}}
            />
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




