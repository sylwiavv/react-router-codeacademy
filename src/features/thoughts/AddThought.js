import React, {useState} from 'react';
import { generateId, getNewExpirationTime } from './utilities';


export function AddThoughtForm(props) {
    const [text,setText] = useState('');

    const [thoughts, setThoughts] = useState([
        {
            id: generateId(),
            text: 'This is a place for your passing thoughts.',
            expiresAt: getNewExpirationTime(),
        },
        {
            id: generateId(),
            text: "They'll be removed after 15 seconds.",
            expiresAt: getNewExpirationTime(),
        },
    ]);


    const handleTextChange = ({target})=>{
        const {value} = target
        setText(value)
    }

    const handleSubmit = (event)=>{
        props.addThought = function (thought) {
            setThoughts(thoughts => [thought,...thoughts])
        }

        event.preventDefault();
        if (text.length){
            setTimeout(()=>{
                const thought = {
                    id : generateId(),
                    text: text,
                    expiresAt: getNewExpirationTime()
                }
                props.addThought(thought)
                setText('')
            },500)
        }
    }
    return (
        <form onSubmit={handleSubmit} className="AddThoughtForm">
            <input
                type="text"
                role="input"
                aria-label="What's on your mind?"
                placeholder="What's on your mind?"
                value = {text}
                onChange = {handleTextChange}
            />
            <input type="submit" role="submit" value="Add" />
        </form>
    );
}
