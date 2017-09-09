import React, {Component} from 'react'
import {  DatePickerIOS,
          StyleSheet,
          Text,
          TextInput,
          Image,
          View, } from 'react-native'
import Task from './Task'

export default class App extends Component {
  constructor(props){
    super(props)

  }
  render() {
    return (
      <View style={styles.container}>
        <Task />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: '20%',
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
