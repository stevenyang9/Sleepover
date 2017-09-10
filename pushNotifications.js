import Expo from 'exponent-server-sdk'
import { ref } from './config.js'
// Create a new Expo SDK client

  let expo = new Expo()

  // Get tokens from firebase
  let tokenPromise = new Promise((resolve, reject) => {
    ref.child('tokens').once('value', (snapshot) => {
      console.log('fetching tokens')
      const tokens = snapshot.val() || {}
      arr = Object.values(tokens)
      if (arr.length === Object.keys(tasks).length) {
        resolve(arr)
      }
    })
  })
  tokenPromise.then((tokenArr) => {
    let pushTokens = tokenArr
    // Create the messages that you want to send to clents
    let messages = [];
    for (let pushToken of pushTokens) {
      // Each push token looks like ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]
      pushToken = pushToken.value
      // Check that all your push tokens appear to be valid Expo push tokens
      if (!Expo.isExpoPushToken(pushToken)) {
        console.error(`Push token ${pushToken} is not a valid Expo push token`);
        continue;
      }

      // Construct a message (see https://docs.expo.io/versions/latest/guides/push-notifications.html)
      messages.push({
        to: pushToken,
        sound: 'default',
        body: 'This is a test notification',
        data: { withSome: 'data' },
      })
    }

    // The Expo push notification service accepts batches of notifications so
    // that you don't need to send 1000 requests to send 1000 notifications. We
    // recommend you batch your notifications to reduce the number of requests
    // and to compress them (notifications with similar content will get
    // compressed).
    let chunks = expo.chunkPushNotifications(messages);

    (async () => {
      // Send the chunks to the Expo push notification service. There are
      // different strategies you could use. A simple one is to send one chunk at a
      // time, which nicely spreads the load out over time:
      for (let chunk of chunks) {
        try {
          let receipts = await expo.sendPushNotificationsAsync(chunk);
          console.log(receipts);
        } catch (error) {
          console.error(error);
        }
      }
    })()
