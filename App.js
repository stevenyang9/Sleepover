import React, {Component} from 'react';
import * as firebase from 'firebase';

import {  DatePickerIOS,
          StyleSheet,
          Text,
          TextInput,
          View, } from 'react-native';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAWBZPThtjYc-K0P6OhVYrKv9yLT2y7XNM",
  authDomain: "sleepover-pennapps2017.firebaseapp.com",
  databaseURL: "https://sleepover-pennapps2017.firebaseio.com",
  storageBucket: "sleepover-pennapps2017.appspot.com",
  messagingSenderId: "990954020304"
};

firebase.initializeApp(firebaseConfig);

export default class App extends Component {
  constructor(props){
    super(props)
    let d = new Date()
    this.state = {
      date: d
    }
  }
  dateChange = (e) => {
    console.log(e)
    this.setState({date:e})
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>This is A TEST!</Text>
        <DatePickerIOS  date={this.state.date}
                        style={styles.button}
                        mode="date"
                        onDateChange= {this.dateChange}/>
      </View>
    );
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
  button: {
    backgroundColor: 'black',
    flex: 1,
    marginTop: '30%',
    justifyContent: 'center',
    //width: '500px'
  }
});
