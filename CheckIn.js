import React, { Component } from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
import { Button } from 'react-native-elements' // 0.16.0


import "@expo/vector-icons"; // 5.2.0
class Counter extends Component {
  state = {count: 60}
  componentDidMount() {
    setInterval(() => {
      this.setState({count: this.state.count - 1})
    }, 1000)
  }

  render() {
    const {count} = this.state
    const {color, size} = this.props
    return (
      <Text style={{color, fontSize: size}}>
        {checkElapsedTime(count)}
      </Text>
    )
  }

  /*stop counter when awake button is pressed*/
  stopCounter() {
    alert('clicked')
    const {stopCount} = this.state.count
    this.setState(50)

  }
}

function checkElapsedTime(count){
  if(count > 0){
    return count;
  }
  else{
    return 0;
  }
}

export default class CheckIn extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Counter color={'lightblue'} size={16} />
        <Counter color={'skyblue'} size={32} />
        <Counter color={'steelblue'} size={80} />
        <Counter color={'darkblue'} size={140}/>
        <Button
          raised
          large
          iconComponent={{name: 'home', size: 2000}}
          buttonStyle={{backgroundColor: 'green', borderRadius: 100}}
          textStyle={{textAlign: 'center'}}
          title={'AWAKE'}
          onPress={() => Alert.alert(
          'Good Morning!',
          '',
        )}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 40,
  },
})
