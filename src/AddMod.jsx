import { useEffect, useState } from "react";
import { ref, uploadBytes, listAll, getDownloadURL, deleteObject, getMetadata } from 'firebase/storage';
import { storage } from './firebase';
import swal from "sweetalert";

function AddMod() {
    const [file, setFile] = useState('');
    const [name, setName] = useState('');
    const [fileList, setFileList] = useState([]);

    const handleUpload = () => {
        const modRef = ref(storage, `mods/${name}`);
        if(!name) {
            return swal("You must enter a name", "No name provided", "error")
        }
        uploadBytes(modRef, file).then((result) => {
            swal("Upload Successful!", `Uploaded: ${result.metadata.name}`, "success").then(() => {
                listFiles()
            })
        }).catch((err) => {
            swal('Error uploading', `${err}`, "error")
        });
    }

    const listFiles = async () => {
        const modsRef = ref(storage, 'mods/');
        const res = await listAll(modsRef);
        
        const files = await Promise.all(res.items.map(async (item) => {
            const metadata = await getMetadata(item);

            return {
                name: item.name,
                downloadURL: await getDownloadURL(item),
                size: (metadata.size / 1000).toFixed() + "kb",
                uploadTime: metadata.timeCreated.substring(-1, 10),
                fullPath: item.fullPath,
            };
        }));

        setFileList(files);
    }

    const handleFileDelete = async (fullPath) => {
        const fileRef = ref(storage, fullPath)
        await deleteObject(fileRef).then(() => {
            swal("Deleted file", "Done, nice", "success")
            listFiles()
        }).catch((err) => {
            swal("Error deleting file", `${err}`, "error")
            listFiles()
        })

    }

    useEffect(() => {
        listFiles()
    }, [])

    return (
        <>
            <div className="file-uploader">
                <input type="text" placeholder="enter file name" onChange={(e) => setName(e.target.value)} />
                <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                <button onClick={handleUpload}>Upload Mod</button>
            </div>
            <div>
                <ul style={{padding: '0'}}>
                    {fileList.map((file) => {
                        return <li><b>Name:</b> {file.name} | <b>Size:</b> {file.size} | <b>Uploaded At:</b> {file.uploadTime} | <button><a href={file.downloadURL}>Download File</a></button> <button onClick={() => {handleFileDelete(file.fullPath)}}>Delete File</button></li>
                    })}
                </ul>
            </div>
        </>
    )
}

export default AddMod;
