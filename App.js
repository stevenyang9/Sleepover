import React, {Component} from 'react'
import {  DatePickerIOS,
          StyleSheet,
          Text,
          TextInput,
          Image,
          View, } from 'react-native'
import { CheckBox } from 'react-native-elements'
//import Task from './Task'

export default class App extends Component {
  constructor(props){
    super(props)

  }
  render() {
    return (
      <View style={styles.container}>
        <Text>HI</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    marginTop: '20%',
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  datepicker: {
    backgroundColor: 'black',
    flex: 1,
    marginTop: '30%',
    justifyContent: 'center',
    //width: '500px'
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
