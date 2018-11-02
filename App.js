import React from 'react';
import {Text, Button, Image, TouchableHighlight, View} from 'react-native';
import {HomeScreen} from "./components/homescreen"
import {SettingsScreen} from "./components/settings"
import {DashboardScreen} from "./components/dashboard"


import {
    createMaterialTopTabNavigator,
    createStackNavigator,
    NavigationActions,
    StackActions
} from 'react-navigation';

const Content = createMaterialTopTabNavigator({
    Home: { screen: HomeScreen },
    Dashboard: { screen: DashboardScreen },
},
    {
        tabBarOptions: {
            activeTintColor:"#0f2b69",
            indicatorStyle: {
                backgroundColor:"#0f2b69"
            },
            labelStyle: {
                color: "#0f2b69",
                fontSize: 15,
                fontWeight: "600"
            },
            style: {
                backgroundColor: "#f9f9f9"
            }
        }
    }
);

const App = createStackNavigator({
    Main: {
        screen: Content,
        navigationOptions: ({navigation}) => {
            const { params = {} } = navigation.state;
            return {
                headerTitle: (
                    <Image
                        style={{
                            flex: 1,
                            resizeMode:"contain",
                            opacity: 1,
                            width: 20,
                            height: 20}}
                        source={require('./Images/new logo smaller.png')} />),
                headerRight: (
                    <TouchableHighlight
                        color="#0f2b69"
                        style={{
                            marginRight: 20
                        }}
                        onPress={() => {
                        navigation.dispatch(StackActions.reset({
                            index: 0,
                            actions: [NavigationActions.navigate({ routeName: 'Main' })],
                        }))
                        return null;
                    }}>
                        <View><Image source={require('./Images/reload.png')}/></View>
                    </TouchableHighlight>
                    ),
                headerLeft:
                    (
                        <TouchableHighlight
                            color="#0f2b69"
                            style={{
                                marginLeft: 20
                            }}
                            onPress={() => {

                                navigation.navigate('Settings')
                            }}>
                            <View><Image source={require('./Images/WishList.png')}/></View>
                        </TouchableHighlight>
                    ),
                headerStyle: {
                    borderBottomWidth: 0,
                }
            }

        }
    }, // MainTab is itself a TabNavigator now
    Settings: {
        screen: SettingsScreen,
        navigationOptions: ({navigation}) => {
            return {
                tabBarOptions: {
                    activeTintColor: "#0f2b69",
                    indicatorStyle: {
                        backgroundColor: "#0f2b69"
                    },
                    labelStyle: {
                        color: "#0f2b69"
                    },
                    style: {
                        backgroundColor: "#f9f9f9",

                    }
                }
            }
        }
    },
});



export default App;