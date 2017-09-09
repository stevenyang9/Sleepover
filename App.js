import React, {Component} from 'react'
import {  NavigatorIOS,
          StyleSheet,
          Text,
          TextInput,
          Image,
          View,
          TouchableOpacity } from 'react-native'
import Task from './Task'
import Home from './Home'


export default class App extends Component {
  constructor(){
    super()
  }

  _handleNavigationRequest() {
    console.log('ADSFJASLKDFJASLDFJASLDJFKSLJFKLSJD')
    this.props.navigator.push({
      component:Home,
      title: 'Genius',
      // passProps: { myProp: 'genius' },
    });
  }

  static renderRightButton = (props) => {
      return (
          <TouchableOpacity onPress={() => console.log('onRightPressed')}>
              <Text>Right Button</Text>
          </TouchableOpacity>
      );
    }

  render() {
    return (
      <View style={styles.container}>
        <Task/>
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
