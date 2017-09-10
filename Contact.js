import React, { Component } from 'react'
import Contacts from 'react-native-contacts'
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableHighlight,
    ScrollView,
  } from 'react-native'
import { Card, ListItem, Button } from 'react-native-elements'
import { ref } from './config.js'
import Expo from 'expo'

export default class Contact extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      contacts: [],
      friends: []
    }
  }

  getContacts = (text) => {
    async function showFirstContactAsync() {
      // Ask for permission to query contacts.
      console.log('before await')
      const permission = await Expo.Permissions.askAsync(Expo.Permissions.CONTACTS);
      if (permission.status !== 'granted') {
        // Permission was denied...
        console.log('permission denied')
        return;
      }
      console.log('permission granted, getting contacts')
      const contacts = await Expo.Contacts.getContactsAsync({
        fields: [
          Expo.Contacts.PHONE_NUMBERS,
          Expo.Contacts.EMAILS,
        ],
        pageSize: 1000,
        pageOffset: 0,
      });
      if (contacts.total > 0) {
        console.log('contacts found')
        return contacts.data
      } else {
        return null
      }
    }
    showFirstContactAsync().then(res => res ? this.setState({contacts: res}) : null)
  }

  createContacts = (data) => {
    console.log('create contacts')
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
      if (friendArr.some((el, i) => el.name === data.name)) {
        console.log('friend already exists')
      } else {
        const friendId = ref.child('friends').push().key
        ref.child(`friends/${friendId}`).set(data)
      }
    })
  }

  filterContacts = (text) => {
    console.log('do some filtering')
    this.setState({text: text})
  }

  handleAddContact = (name, phone) => {
    //console.log('clicked', name, phone)
    let contactData = {
      name: name,
      phone: phone
    }
    this.setState({friends: [...this.state.friends, contactData]})
    this.createContacts(contactData)
  }

  componentDidMount() {
    this.getContacts()
  }

  render() {
    let avatars = ['boy', 'girl', 'girl2', 'man', 'man1']
    //console.log(this.state)
    return (
      <View style={styles.container}>
        {/* <TextInput
            style={{height: 40, margin: "5% 0%", textAlign: 'center', borderBottomColor: '#000000', borderBottomWidth: 1,}}
            placeholder={'Add Your Friends'}
            placeholderTextColor={'gray'}
            onChangeText={this.filterContacts}
            value={this.state.text}
          /> */}
          <Card containerStyle={{flex: 1}} title="Add To Sleep Over">
            <ScrollView>
              { this.state.contacts ?
                  this.state.contacts.map((u, i) => {
                    console.log(u.name)
                    return (
                      <ListItem
                        key={i}
                        roundAvatar
                        title={u.name}
                        avatar={{uri:'./assets/avatars/boy.png'}}
                        onPress={() => this.handleAddContact(u.name, u.phoneNumbers[0].digits)}
                      />
                    );
                  })
               : null}
            </ScrollView>
          </Card>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '20%',
    margin: '5%',
    backgroundColor: '#fff',
    borderRadius: 10,
  }
})
