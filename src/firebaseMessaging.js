// src/firebaseMessaging.js
import { getMessaging, getToken, onMessage } from 'firebase/messaging'
import app from './firebaseConfig';


// Initialize Firebase Messaging
const messaging = getMessaging(app)

// Request permission and get token
export async function requestFCMToken() {
  try {
    const currentToken = await getToken(messaging, { vapidKey: 'BCKkGXdiEWBctGnkl6gKrEzQ0qNq8B6NsLSmkteECT7JPJaiD3l4EPzg8F36vozV8lkMboQ0sDUx_2DBGwBkr3U' })
    if (currentToken) {
      console.log('FCM Token:', currentToken)
      // Save this token to your backend or Firestore so you can send notifications to this device later.
      return currentToken
    } else {
      console.warn('No registration token available. Request permission to generate one.')
      return null
    }
  } catch (error) {
    console.error('An error occurred while retrieving token. ', error)
    return null
  }
}

// Listen for incoming messages (foreground notifications)
onMessage(messaging, (payload) => {
  console.log('Message received. ', payload)
  // Handle the message as needed (e.g., show a toast notification)
})
