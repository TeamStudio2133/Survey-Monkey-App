import React from 'react';
import { StyleSheet, Text, TextInput, View, DatePickerIOS, Image, Switch } from 'react-native';
import { AsyncStorage } from "react-native"
import PushNotification from "react-native-push-notification";


storeData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (error) {
        // Error saving data
    }
}


export class SettingsScreen extends React.Component {
    static navigationOptions =
        {
            headerTitle: (
                <Image
                    style={{
                        flex: 1,
                        resizeMode:"contain",
                        opacity: 1,
                        width: 20,
                        height: 20}}
                    source={require('../Images/new logo smaller.png')} />),
            headerTintColor: "#0f2b69"
        }

    constructor(props) {
        super(props);
        this.state = {url: "", date: new Date(), sendReminder: "true"};
        this.updateNotifications();

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

        AsyncStorage.getItem("sendReminder").then(
            (sendReminder) => {
                this.setState({sendReminder: sendReminder === "true"})
            }
        );

        AsyncStorage.getItem("date").then(
            (date) => {
                if (date) {
                    this.setState({date: new  Date(date)})
                } else {
                    this.setDate(new Date());
                }
            }
        );

        this.setDate = this.setDate.bind(this);
        this.setSendReminder = this.setSendReminder.bind(this);
    }

    updateNotifications() {
        let date = new Date(Date.now() + (5 * 1000))
        PushNotification.configure({
            onRegister: (token) => {console.log("Registered: ", token);},
            onNotification: (notif) => {console.log("Notification: ", notif);}
        })
        PushNotification.setApplicationIconBadgeNumber(0);
        PushNotification.cancelAllLocalNotifications();
        console.log(this.state.sendReminder)
        if (this.state.sendReminder === true) {
            PushNotification.localNotificationSchedule({
                title: "Survey Reminder",
                message: "Don't forget to fill out your survey.",
                alertAction: 'view',
                date: (this.state.date),
                repeatType: 'day',
                applicationIconBadgeNumber: 0
            });
        }
    }

    setDate(newDate) {
        newDate.setSeconds(0);
        storeData("date", newDate)
        this.setState({date: newDate}, this.updateNotifications)
    }

    setSendReminder(sendReminder) {
        storeData("sendReminder", sendReminder.toString());
        this.setState({sendReminder}, this.updateNotifications)
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={[styles.content]}>
                    <Text style={[styles.title]}>Settings</Text>
                    <Text style={[styles.textBoxHeader]}>Survey Code</Text>
                    <TextInput
                        style={[styles.textBoxContent]}
                        autoCapitalize="none"
                        clearButtonMode="while-editing"
                        keyboardType={"url"}
                        autoCorrect={false}
                        returnKeyType={"done"}
                        enablesReturnKeyAutomatically={true}
                        placeholder="Enter your Survey Code:"
                        onChangeText={(url) => {
                            storeData("url", url)
                            this.setState({url});
                        }}
                        value={this.state.url}
                    />
                    <Text style={[styles.textBoxHeader]}>Dashboard Code</Text>
                    <TextInput
                        style={[styles.textBoxContent]}
                        autoCapitalize="none"
                        clearButtonMode="while-editing"
                        keyboardType={"url"}
                        autoCorrect={false}
                        returnKeyType={"done"}
                        enablesReturnKeyAutomatically={true}
                        placeholder="Enter your Dashboard Code:"
                        onChangeText={(dashboardurl) => {
                            storeData("dashboardurl", dashboardurl)
                            this.setState({dashboardurl});
                        }}
                        value={this.state.dashboardurl}
                    />
                    <Text style={[styles.textBoxHeader]}>Send Daily Reminder?</Text>
                    <Switch style={[styles.switch]} onValueChange={this.setSendReminder} trackColor={{true: "#0f2b69", false: "#0f2b69"}} value={this.state.sendReminder}></Switch>
                    <Text style={[styles.textBoxHeader]}>Reminder Time</Text>
                    <DatePickerIOS
                        date={this.state.date}
                        onDateChange={this.setDate}
                        mode={"time"}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        marginTop: 15,
        marginBottom: 15,
        marginLeft: 5,
        fontSize: 28,
        fontWeight: "bold",
        color: "#505050"
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
    },
    textBoxHeader: {
        marginLeft: 10,
        marginBottom: 5,
        marginRight: 10,
        color: "#505050",
        opacity: 0.7,
        fontSize: 12,
        fontWeight: "400"
    },
    textBoxContent: {
        paddingLeft: 5,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 15,
        borderRadius: 5,
      borderStyle: "solid",
        borderWidth: 0.5,
        borderColor: "#808080",
      fontSize: 14,
      opacity: 1,
        fontWeight: "400",
        width: "95%",
        height: 40
    },
    switch: {
        marginLeft: 10,
        marginBottom: 15,
        color: '#0f2b69'
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
        marginBottom: 40
    }
});
