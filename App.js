import React, {Component} from 'react';
import {  DatePickerIOS,
          StyleSheet,
          Text,
          TextInput,
          Image,
          View, } from 'react-native';

export default class App extends Component {
  constructor(props){
    super(props)
    let d = new Date()
    this.state = {
      date: d,
      title: ''
    }
  }
  dateChange = (e) => {
    console.log(e)
    this.setState({
      date:e
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput
            style={{height: 40, textAlign: 'center', borderBottomColor: '#000000', borderBottomWidth: 1,}}
            placeholder={'Please enter Task Title'}
            placeholderTextColor={'gray'}
            onChangeText={(text) => this.setState({title: text})}
            value={this.state.title}
          />
        <DatePickerIOS  date={this.state.date}
                        style={styles.datepicker}
                        mode="datetime"
                        onDateChange= {this.dateChange}/>
        <TextInput
            style={{marginTop: "30%", height: 40, textAlign: 'center', borderBottomColor: '#000000', borderBottomWidth: 1,}}
            placeholder={'Please enter Task Title'}
            placeholderTextColor={'gray'}
            onChangeText={(text) => this.setState({title: text})}
            value={this.state.title}
          />
          <Text>Repeat</Text>
          <View style={styles.repeat}>

          { ['S','M','T','W','T','F','S'].map((day, i) => {
            return (  <Image key={i} style={styles.circle}>
                        <Text>{day}</Text>
                      </Image>)
          }) }
          </View>
          {/* <View>
            <Image style={styles.circle} source={{uri: 'http://placehold.it/100x100'}}/>
          <View/> */}
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
  datepicker: {
    backgroundColor: 'black',
    flex: 1,
    marginTop: '30%',
    justifyContent: 'center',
    //width: '500px'
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginTop: '10%',
    backgroundColor: 'blue',
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
