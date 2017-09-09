import React, {Component} from 'react';
import {  NavigatorIOS,
          StyleSheet,
          Text,
          TextInput,
          TouchableHighlight,
          View, } from 'react-native'
import Task from './Task'
import Home from './Home'


export default class App extends Component {
  constructor(){
    super()
  }

  handleNavigationRequest = () => {
    console.log('clicked')
    this.refs.nav.push({
      component: Task,
      title: 'Create Task',
      passProps: { myProp: 'bar' }
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <NavigatorIOS
          ref='nav'
          initialRoute={{
            component:Home,
            title: 'Home',
            passProps: { myProp: 'foo' },
            rightButtonTitle: 'Add',
            onRightButtonPress: () => {this.handleNavigationRequest()},
          }}
          style={{flex: 1}}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});
