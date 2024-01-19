import { useState } from "react"
import firebase from "./firebase"
import { getFirestore, addDoc, collection, serverTimestamp } from "firebase/firestore"
import swal from 'sweetalert'

function AddIdeas() {
    const [ideaTitle, setIdeaTitle] = useState('')
    const [idea, setIdea] = useState('')
    const [ideaUserName, setIdeaUserName] = useState('')
    const [ideaDcUserName, setIdeaDcUserName] = useState('')
    const db = getFirestore(firebase.app)
    const ref = collection(db, "ideas")

    async function createIdea() {
        await addDoc(ref, {ideaTitle: ideaTitle, userIdea: idea, userName: ideaUserName, userDcName: ideaDcUserName, timestamp: serverTimestamp()}).then((result) => {
            swal("Idea Added Successfully", `${ideaTitle}`, "success" ).then(() => {
                window.location.reload()
            })
        }).catch((err) => {
            swal("Could not add idea :(", `${err}`, "error");
        });

    }

    return(
        <>
            <main>
                <h1>Add Your Ideas</h1>
                <div className="idea-form">
                    <div>
                        <label htmlFor="title">Idea Title</label>
                        <input type="text" placeholder="Title Here" id="title" name="title" onChange={(e) => {
                            setIdeaTitle(e.target.value)
                        }}/>
                    </div>
                    <div>
                        <label htmlFor="idea">Idea</label>
                        <textarea name="idea" id="idea" placeholder="What Do You Think?" onChange={(e) => {
                            setIdea(e.target.value)
                        }}/>
                    </div>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input name="name" id="name" placeholder="Your Name" onChange={(e) => {
                            setIdeaUserName(e.target.value)
                        }}/>
                    </div>
                    <div>
                        <label htmlFor="dc-username">Discord Username</label>
                        <input name="dc-username" id="dc-username" placeholder="Your Dc Username" onChange={(e) => {
                            setIdeaDcUserName(e.target.value)
                        }}/>
                    </div>
                    <button type="submit" onClick={createIdea}>Send Idea</button>
                </div>
            </main>
        </>
    )
}

export default AddIdeas