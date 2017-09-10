import React, {Component} from 'react';
import {  NavigatorIOS,
          StyleSheet,
          Text,
          TextInput,
          Image,
          View } from 'react-native'
import Task from './Task'
import Home from './Home'
import Contact from './Contact'

export default class App extends Component {
  constructor(){
    super()
  }

  handleNavigationRequest = (screen) => {
    let location = {}
    screen === 'task' ? location = {component: Task, title: 'Create Task'} :
    location = {component: Contact, title: 'Your Friend Groups'}
    this.refs.nav.push({
      component: location.component,
      title: location.title,
      passProps: { myProp: 'bar' }
    })
  }

  render() {
    //'rgb(45,156,219)'
    return (
      <View style={styles.container}>
        <NavigatorIOS
          ref='nav'
          initialRoute={{
            component:Home,
            title: 'Home',
            passProps: { myProp: 'foo' },
            rightButtonTitle: '+',
            leftButtonTitle: 'Friends',
            onRightButtonPress: () => {this.handleNavigationRequest('task')},
            onLeftButtonPress: () => {this.handleNavigationRequest('contacts')}
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
