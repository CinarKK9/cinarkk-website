import { useState, useEffect } from "react"
import { database } from './firebase'
import { signInWithEmailAndPassword, signOut } from "firebase/auth"
import swal from "sweetalert"
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import AddMod from "./AddMod"

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = database.onAuthStateChanged((user) => {
        setUser(user);
        });

        return () => unsubscribe();
    }, []);
        
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
            <>
                <button id="sign-out" onClick={() => {signOut(database); setUser(null)}}>Sign Out</button>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" exact Component={AddMod}/>
                    </Routes>
                </BrowserRouter>
            </>

        )
    }

    const handleSignIn = (email, password) => {
        signInWithEmailAndPassword(database, email, password).then((user) => {
            swal("Login Successful!", `Logged in as ${email}`, "success")
            setUser(user)
        }).catch((err) => {
            swal("Error", `${err.code}`, "error")
        })
    }

    return(
        <>
            <h1>Welcome to the Admin Panel of Bitemod</h1>
            <div className="container">{user ? <AdminDashboard /> : <SignIn />}</div>
        </>
    )
}

export default App