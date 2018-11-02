import React from 'react';
import { StyleSheet, WebView, View, Button } from 'react-native';
import { AsyncStorage } from "react-native"


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
        this.state = {url: "", date: new Date()};
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

    componentDidMount() {
        this.props.navigation.setParams({ reloadPage: this.reloadPage });
    }

    reloadPage = () => {
        this.webview.current.reload();
    }

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            headerTitle: (
                <Button
                    title="Dashboard"
                    onPress={() => navigation.navigate('Dashboard')}
                />),
            headerLeft: (
                <Button
                    title="Settings"
                    onPress={() => navigation.navigate('Settings')}
                />),
            headerRight:
                <Button
                    title="Reload"
                    onPress={() => params.reloadPage()}
                />

        }
    };

    render() {
        return (
            <WebView
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
