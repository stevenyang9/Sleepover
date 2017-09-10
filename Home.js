import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    Button,
    TouchableHighlight,
  } from 'react-native'
import { ref } from './config.js'
import Timeline from 'react-native-timeline-listview'
import { Permissions, Notifications } from 'expo';
import CheckIn from './CheckIn'


async function registerForPushNotificationsAsync() {
  const { existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    return;
  }

  // Get the token that uniquely identifies this device
  let token = await Notifications.getExpoPushTokenAsync();

  // POST the token to our backend so we can use it to send pushes from there
  const tokenId = ref.child('tokens').push().key
  return ref.child(`tokens/${tokenId}`).set({token: {value: token}})
}


export default class Home extends Component {
  constructor(props, context){
    super(props, context)
    this.state = {
      data: [],
      notifications: {}
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
    registerForPushNotificationsAsync();

    this._notificationSubscription = Notifications.addListener(this._handleNotification);
    console.log(this._notificationSubscription);
  }

  _handleNotification = (notification) => {
    console.log(';enetered via notification')
   this.setState({notification: notification});
  };



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
    console.log(this.state.notifications)
    console.log('mobile')
    return (
      <View style={styles.container}>
      { this.state.notifications ?
            <CheckIn /> :
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
                style:{paddingTop:5},
                enableEmptySections: true
              }}
              data={this.state.data}
            /> : <Text>No events upcoming! :)</Text>
            }
            </Text>
      }

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
