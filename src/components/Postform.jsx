import React, {useState} from 'react';
import MyButton from './UI/button/MyButton';
import MyInput from './UI/input/MyInput';

function Postform(props) {
    const [post, setPost] = useState({ title: '', body: '' })

    function addPost(event) {
        event.preventDefault();
        const newPost = {
            ...post, id: Date.now()
        };
        props.create(newPost);
        setPost({ title: '', body: '' });
    }

    return (
        <form>
            <MyInput
                type='text'
                placeholder='Title of post'
                value={post.title}
                onChange={event => setPost({ ...post, title: event.target.value })}
            />
            <MyInput
                type='text'
                placeholder='Enter your content'
                value={post.body}
                onChange={event => setPost({ ...post, body: event.target.value })}
            />
            <MyButton onClick={addPost}>Create</MyButton>
        </form>

    );
}

export default Postform;