import firebase from 'firebase/compat/app'
import { getStorage } from 'firebase/storage'
import config from './config'

firebase.initializeApp(config)
const storage = getStorage(config);

export { firebase, storage }