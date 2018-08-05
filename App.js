import React from 'react';
import { AppRegistry, StyleSheet, Text, TextInput, View } from 'react-native';


export default class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {url: ''};
  }

  render() {
    return (
      <View style={styles.container}>
          <View style={[styles.header]}></View>
          <View style={[styles.content]}>
            <Text>Coco Health</Text>
            <TextInput
                style={{height: 40}}
                placeholder="Enter your Survey Monkey URL:"
                onChangeText={(url) => this.setState({url})}
            />
            <Text style={{padding: 10, fontSize: 12}}>
                {this.state.url}
            </Text>
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
