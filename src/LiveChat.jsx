import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

function LiveChat() {

    return(
        <>
            <h1></h1>
        </>
    )
}

function signInToLiveChat() {
    signInWithEmailAndPassword(auth)
}

export default LiveChat