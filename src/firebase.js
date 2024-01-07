import firebase from 'firebase/compat/app'
import { getStorage } from 'firebase/storage'
import { getAuth } from 'firebase/auth'
import config from './config'

const app = firebase.initializeApp(config)
const storage = getStorage(app);
const database = getAuth(app)

export { app, storage, database }