import React, {Component} from 'react'
import {  DatePickerIOS,
          StyleSheet,
          Text,
          TextInput,
          Image,
          Picker,
          TouchableHighlight,
          View, } from 'react-native'
import { CheckBox, Button } from 'react-native-elements'
import { ref } from './config.js'
import { LinearGradient } from 'expo'

export default class Task extends Component {
  constructor(props){
    super(props)
    let d = new Date()
    this.state = {
      date: d,
      title: '',
      contact: {},
      checked: true,
      repeat: [false, false, false, false, false, false, false]
    }
    this.friends = []
  }
  dateChange = (e) => {
    this.setState({
      date: e
    })
  }

  handleClick = (i, e) => {
    let newState = [...this.state.repeat]
    console.log(i)
    newState[i] ? newState[i]=false : newState[i]=true
    console.log(newState)
    this.setState({repeat: newState})
  }

  getFriends = () => {
    let friendPromise = new Promise((resolve, reject) => {
      ref.child('friends').once('value', (snapshot) => {
        console.log('fetching friends')
        const tasks = snapshot.val() || {}
        arr = Object.values(tasks)
        if (arr.length === Object.keys(tasks).length) {
          resolve(arr)
        }
      })
    })
    friendPromise.then((friendArr) => {
      if (friendArr.length > 0) {
        console.log('friends found', friendArr)
        this.data = friendArr
        this.setState({contact: friendArr[0]})
      }
    })
  }

  createTask = () => {
    console.log('createTask')
    const taskId = ref.child('tasks').push().key
    let date = new Date(this.state.date).toString()
    ref.child(`tasks/${taskId}`).set({...this.state, date, taskId})
  }

  handlePicker = (data) => {
    this.setState({contact: data})
    this.onValueChange.bind(this, data)
  }

  componentWillMount() {
    this.getFriends()
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
            style={{height: 40, margin: "10% 0%", textAlign: 'center', borderBottomColor: '#000000', borderBottomWidth: 1,}}
            placeholder={'Please enter Task Title'}
            placeholderTextColor={'gray'}
            onChangeText={(text) => this.setState({title: text})}
            value={this.state.title}
          />
        <DatePickerIOS  date={this.state.date}
                        style={styles.datepicker}
                        mode="datetime"
                        onDateChange= {this.dateChange}/>
        <View style={{alignItems: 'center'}}>
          <Text style={{marginTop: '25%', padding: '5%'}}>Pick days to repeat this alarm.</Text>
        </View>
        <View style={styles.repeat}>

          { ['S','M','T','W','T','F','S'].map((day, i) => {
            return (
              <TouchableHighlight key={i} onPress={(e) => {this.handleClick(i, e)}}
                style={this.state.repeat[i] ? styles.circleChecked : styles.circle}>
                  <Text style={this.state.repeat[i] ? styles.textChecked : styles.textNotCheck} >{day}</Text>
              </TouchableHighlight>
              )
          }) }
        </View>
          <Picker
            style={{marginTop: 0}}
            selectedValue={this.state.contact.name}
            onValueChange={(e) => this.handlePicker(e)}>
            {this.data ? this.data.map((friend,i) => {
                return (
                  <Picker.Item key={i} label={friend.name} value={friend} />
                )
              }) : null }
          </Picker>

          <View style={{alignItems: 'center'}}>
            <LinearGradient colors={['#0cc5c7', '#0097d1', '#0058d1']} style={{ width: 250, padding: 10, alignItems: 'center', borderRadius: 40 }}>
                <Button buttonStyle={{backgroundColor:'transparent'}}
                icon={{name: 'calendar-plus-o', type: 'font-awesome'}}
                onPress={this.createTask}
                title='CREATE' />
            </LinearGradient>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    marginTop: '10%',
    margin: '5%',
    backgroundColor: '#fff',
    borderRadius: 10,
    },
  datepicker: {
    backgroundColor: 'black',
    flex: 1,
    marginTop: '20%',
    justifyContent: 'center',
  },
  circle: {
    width: 35,
    height: 40,
    borderRadius: 20,
    margin: '1%',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#0097d1',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
 },
 circleChecked: {
   width: 35,
   height: 40,
   borderRadius: 20,
   margin: '1%',
   backgroundColor: '#0058d1',
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
