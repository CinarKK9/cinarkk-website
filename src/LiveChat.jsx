import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const auth = getAuth();
const provider = new GoogleAuthProvider();

function LiveChat() {
    const user = auth.currentUser
    if(!user) {
        return (
            <div>
            <h1>Live Chat (in development)</h1>
            <p>Now you can discuss ideas with other people. <u>Live.</u></p>
            <p>You must sign in to chat with others</p>
            <button onclick={signInWithGoogle}>Sign in with google</button>
            </div>
        )
    }
}

function signInWithGoogle() {
    signInWithPopup(auth, provider)
    .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
    }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
    });
}

export default LiveChat