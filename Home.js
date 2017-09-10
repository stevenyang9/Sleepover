import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
  } from 'react-native'
import { ref } from './config.js'
import Timeline from 'react-native-timeline-listview'
import { LinearGradient } from 'expo'
import Icon from 'react-native-vector-icons';


export default class Home extends Component {
  constructor(props, context){
    super(props, context)
    this.state = {
      data: []
    }
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
          description: `${item.date.split(':')[0].slice(0, item.date.split(':')[0].length-3)}\nContact: ${item.contact}`,
          time: `${item.date.split(':')[0].slice(-2)}:${item.date.split(':')[1]}`
        }
      }, [])
      console.log('set state')
      this.setState({data: formatData})
    })
  }

  componentWillMount(){
    this.listen() // fetch data from firebase
  }

  setNativeProps = (nativeProps) => {
    this._root.setNativeProps(nativeProps);
  }

  onPress() {
    console.log('asdf')
    this.props.navigator.push({
      component:Task,
      title: 'Genius',
      passProps: { myProp: 'genius' },
    });
  }

  render() {
    //'rgb(45,156,219)'
    return (
      <View style={styles.container}>
        <Text>
        {this.state.data ?
            <Timeline
              separator={0}
              style={styles.list}
              circleSize={12}
              circleColor='rgb(45,156,219)'
              timeContainerStyle={{minWidth:52, marginTop: -5}}
              timeStyle={{textAlign: 'center', backgroundColor:'#ff9797', color:'white', padding:5, borderRadius:13}}
              descriptionStyle={{color:'gray'}}
              options={{
                style:{paddingTop:5},
                enableEmptySections: true
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
    paddingTop: 83,
  },
  list: {
    flex: 1,
    marginBottom:10,
    width: 1000,
    height: 800
  },
});
