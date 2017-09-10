import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
  } from 'react-native'
import { ref } from './config.js'
import Timeline from 'react-native-timeline-listview'

export default class Home extends Component {
  constructor(props, context){
    super(props, context)
    this.state = {
      data: []
    }
    // [
    //   {time: '09:00', title: 'Event 1', description: 'Event 1 Description'},
    //   {time: '10:45', title: 'Event 2', description: 'Event 2 Description'},
    //   {time: '12:00', title: 'Event 3', description: 'Event 3 Description'},
    //   {time: '14:00', title: 'Event 4', description: 'Event 4 Description'},
    //   {time: '16:30', title: 'Event 5', description: 'Event 5 Description'}
    // ]
  }

  listen = () => {
    let arr = []
    let taskPromise = new Promise((resolve, reject) => {
      ref.child('tasks').once('value', (snapshot) => {
        console.log('fetching tasks')
        const tasks = snapshot.val() || {}
        arr = Object.values(tasks)
        if (arr.length === Object.keys(tasks).length) {
          resolve(arr)
        }
      })
    })
    taskPromise.then((tasks) => {
      console.log('resolving promise')
      console.log(tasks)
      let formatData = tasks.map((item, i) => {
        // time description title
        return {
          title: item.title,
          description: `${item.date.split(':')[0].slice(0, item.date.length-3)} Contact: ${item.contact}`,
          time: `${item.date.split(':')[0].slice(-2)}:${item.date.split(':')[1]}`
        }
      }, [])
      console.log('set state')
      this.setState({data: formatData})
    })
  }

  componentWillMount(){
    this.listen()
    //contact, date, repeat, title

  }

  render() {
    //'rgb(45,156,219)'
    return (
      <View style={styles.container}>
        <Text>
        {this.state.data ?
        <Timeline
          style={styles.list}
          circleSize={20}
          circleColor='rgb(45,156,219)'
          lineColor='rgb(45,156,219)'
          timeContainerStyle={{minWidth:52, marginTop: -5}}
          timeStyle={{textAlign: 'center', backgroundColor:'#ff9797', color:'white', padding:5, borderRadius:13}}
          descriptionStyle={{color:'gray'}}
          options={{
            style:{paddingTop:5}
          }}
          data={this.state.data}
        /> : <Text>No events upcoming! :)</Text>
        }
        </Text>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
		paddingTop:65,
    marginTop: '10%',
  },
  list: {
    flex: 1,
    marginTop:20,
    width: 1000,
    height: 800
  },
});
