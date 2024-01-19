import { useState } from 'react'
import firebase from './firebase'
import { useEffect } from 'react';

function Ideas() {
    const [ideas, setIdeas] = useState([]);
    const [loading, setLoading] = useState(false)

    const ref = firebase.firestore().collection('ideas')

    function getIdeas() {
        setLoading(true);
        ref.onSnapshot((querySnapshot) => {
            const items = []
            querySnapshot.forEach((doc) => {
                items.push(doc.data())
            });
            setIdeas(items)
            setLoading(false)
        })
    }

    useEffect(() => {
        getIdeas()
        //eslint-disable-next-line
    }, [])

    if(loading) return (
        <h1>Loading...</h1>
    )
    return(
        <>
            <main>
                <h1>Ideas of People</h1>
                {ideas.map((idea) => (
                    <div className='ideas' key={idea.timestamp.seconds / 1000}>
                        <div className='idea-card'>
                            <h2 className='idea-title'>{idea.ideaTitle}</h2>
                            <p className='idea-main'>{idea.userIdea}</p>
                            <span className='author'>By <span>{idea.userName}</span> | Discord: @<span>{idea.userDcName}</span></span>
                            <span className='time' style={{float: 'right'}}>At {new Date(idea.timestamp.seconds * 1000).toLocaleString()}</span>
                        </div>
                    </div>
                ))}
            </main>
        </>
    )
}

export default Ideas