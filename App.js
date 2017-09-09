import React, {Component} from 'react'
import {  DatePickerIOS,
          StyleSheet,
          Text,
          TextInput,
          Image,
          View, } from 'react-native'
import { CheckBox } from 'react-native-elements'


export default class App extends Component {
  constructor(props){
    super(props)
    let d = new Date()
    this.state = {
      date: d,
      title: '',
      contact: '',
      checked: true,
      repeat: [false, false, false, false, false, false, false]
    }
  }
  dateChange = (e) => {
    console.log(e)
    this.setState({
      date:e
    })
  }

  handleClick = (i, e) => {
    let newState = [...this.state.repeat]
    console.log(i)
    newState[i] ? newState[i]=false : newState[i]=true
    console.log(newState)
    //this.setState({repeat: newState})
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
        {/* <Text>Repeat</Text> */}
        <CheckBox title='Repeat' checked={this.state.checked} style={{marginTop: '30%', padding: '5%'}}/>
        <View style={styles.repeat}>

        { ['S','M','T','W','T','F','S'].map((day, i) => {
          return (  <Image key={i} style={this.state.repeat[i] ? styles.circleChecked : styles.circle} >
                      <Text onPress={(e) => {this.handleClick(i, e)}}>{day}</Text>
                    </Image>)
        }) }
        </View>
        <TextInput
            style={{marginTop: "30%", height: 40, textAlign: 'center', borderBottomColor: '#000000', borderBottomWidth: 1,}}
            placeholder={'Please enter Contact'}
            placeholderTextColor={'gray'}
            onChangeText={(text) => this.setState({contact: text})}
            value={this.state.contact}
          />
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
