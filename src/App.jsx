import { useState } from "react"
import { database } from './firebase'
import { signInWithEmailAndPassword } from "firebase/auth"
import swal from "sweetalert"
import './index.css'

function App() {
    const [login, setLogin] = useState(false)


    const SignIn = () => {
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('')
        return(
            <>  
                <input name="email" value={email} type="email" placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)}/><br />
                <input name="password" value={password} type="password" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)}/><br />
                <button onClick={(e) => {handleSignIn(email, password)}}>Sign In</button>
            </>
        )
    }
    
    const AdminDashboard = () => {
        return(
            <ul><li><a href="/add-mod">Upload Mod Library</a></li></ul>
        )
    }

    const handleSignIn = (email, password) => {
        signInWithEmailAndPassword(database, email, password).then(() => {
            swal("Login Successful!", `Logged in as ${email}`, "success")
            setLogin(true)
        }).catch((err) => {
            swal("Error", `${err.code}`, "error")
        })
    }

    return(
        <>
            <h1>Welcome to the Admin Panel of Bitemod</h1>
            <div className="container">{login ? <AdminDashboard /> : <SignIn />}</div>
        </>
    )
}

export default App