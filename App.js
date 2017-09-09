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

  _handleNavigationRequest() {
    console.log('clicked')
    this.props.navigator.push({
      component: Task,
      title: 'Bar That',
      passProps: { myProp: 'bar' }
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <NavigatorIOS
          initialRoute={{
            component:Home,
            title: 'Sleepover',
            passProps: { myProp: 'foo' },
            rightButtonTitle: '+',
            onRightButtonPress: () => this._handleNavigationRequest(),
          }}
          style={{flex: 1}}
        />
        <Home />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    //marginTop: '20%',
    backgroundColor: '#fff',
  },
  datepicker: {
    backgroundColor: 'black',
    flex: 1,
    marginTop: '30%',
    justifyContent: 'center',
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    margin: '1%',
    backgroundColor: 'blue',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
 },
 circleChecked: {
   width: 40,
   height: 40,
   borderRadius: 20,
   margin: '1%',
   backgroundColor: 'red',
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
 },
 repeat: {
   flexWrap: 'wrap',
   alignItems: 'flex-start',
   flexDirection:'row',
 }
});
