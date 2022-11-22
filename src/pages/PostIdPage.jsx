import React from 'react';
import { useParams } from 'react-router-dom';
import { useFetching } from '../hooks/useFetching';
import PostService from '../API/PostService';
import { useState } from 'react';
import { useEffect } from 'react';


function PostIdPage() {
    const params = useParams();
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([])
    const [fetchPostById] = useFetching(async (id) => {
        const response = await PostService.getById(id);
        setPost(response.data);
    });
    const [fetchComments] = useFetching(async (id) => {
        const response = await PostService.getCommentsByPostId(id);
        setComments(response.data);
    });

    useEffect(() => {
        fetchPostById(params.id)
        fetchComments(params.id)
    }, [])

    return ( 
        <div>
            <h1>You open the post ID = {params.id}</h1>
            <div>Post ID: {post.id}</div>
            <div>Title: {post.title}</div>
            <div>Body: {post.body}</div>
            <h1>Commentaries</h1>
            {comments.map(comm => 
                <div key={comm.id} style={{marginTop: 15}}>
                    <h5>{comm.email}</h5>
                    <div>{comm.body}</div>
                </div>
                    )}
        </div>
     );
}

export default PostIdPage;