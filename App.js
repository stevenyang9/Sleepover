import React, {Component} from 'react';
import {  DatePickerIOS,
          StyleSheet,
          Text,
          TextInput,
          View, } from 'react-native';

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
                        mode="datetime"
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
