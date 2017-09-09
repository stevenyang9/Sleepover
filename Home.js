import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight
  } from 'react-native';
import Timeline from 'react-native-timeline-listview'
import Task from './Task'

export default class Home extends Component {
  constructor(){
    super()
    this.data = [
      {time: '09:00', title: 'Event 1', description: 'Event 1 Description'},
      {time: '10:45', title: 'Event 2', description: 'Event 2 Description'},
      {time: '12:00', title: 'Event 3', description: 'Event 3 Description'},
      {time: '14:00', title: 'Event 4', description: 'Event 4 Description'},
      {time: '16:30', title: 'Event 5', description: 'Event 5 Description'}
    ]
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
        <TouchableHighlight onPress={this.onPress}>
          <Text> HI </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
		paddingTop:65,
		backgroundColor:'white'
  },
  list: {
    flex: 1,
    marginTop:20,
  },
});
