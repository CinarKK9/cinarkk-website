import { useEffect, useState } from "react";
import { listAll, ref, uploadBytes } from 'firebase/storage';
import { storage } from './firebase';
import swal from "sweetalert";

function AddMod() {
    const [file, setFile] = useState('');
    const [name, setName] = useState('');

    const handleUpload = () => {
        const modRef = ref(storage, `mods/${name}`);
        uploadBytes(modRef, file).then((result) => {
            swal("Upload Successful!", `Uploaded: ${result.metadata.name}`, "success")
        }).catch((err) => {
            swal('Error uploading', `${err}`, "error")
        });
    }

    let files = [];

    useEffect(() => {
        listAll(ref(storage, "mods")).then((res) => {
            res.items.forEach((item) => {
                files.push(item.name);
            })
        })
    }, [])

    return(
        <>
        <div className="file-uplaoder">
            <input type="text" placeholder="enter file name" onChange={(e) => setName(e.target.value)}/>
            <input type="file" onChange={(e) => setFile(e.target.files[0])}/>
            <button onClick={handleUpload}>Upload Mod</button>
        </div>
        <div>
            Files: {files}
        </div>
        </>
    )
}

export default AddMod