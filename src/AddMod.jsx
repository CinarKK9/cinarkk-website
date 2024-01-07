import { useEffect, useState } from "react";
import { listAll, ref, uploadBytes } from 'firebase/storage';
import { storage } from './firebase';

function AddMod() {
    const [file, setFile] = useState('');
    const [name, setName] = useState('');

    const handleUpload = () => {
        const modRef = ref(storage, `mods/${name}`);
        uploadBytes(modRef, file)
    }

    useEffect(() => {
        listAll(ref(storage, "mods"))
    }, [])

    return(
        <>
        <div className="file-uplaoder">
            <input type="text" placeholder="enter file name" onChange={(e) => setName(e.target.value)}/>
            <input type="file" onChange={(e) => setFile(e.target.files[0])}/>
            <button onClick={handleUpload}>Upload Mod</button>
        </div>
        </>
    )
}

export default AddMod