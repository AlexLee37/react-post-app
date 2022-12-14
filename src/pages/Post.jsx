import React, { useEffect, useState } from 'react';
import PostService from '../API/PostService';
import PostFilter from '../components/PostFilter';
import Postform from '../components/Postform';
import PostList from '../components/PostList';
import MyButton from '../components/UI/button/MyButton';
import MyModal from '../components/UI/MyModal/MyModal';
import Pagination from '../components/UI/pagination/Pagination';
import { useFetching } from '../hooks/useFetching';
import { usePosts } from '../hooks/usePosts';
import { getPageCount } from '../utils/pages';


function Posts() {
    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState({ sort: '', query: '' })
    const [modal, setModal] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

    const [fetchPosts, isPostLoading, postError] = useFetching(async (limit, page) => {
        const response = await PostService.getAll(limit, page);
        setPosts(response.data);
        const totalCount = response.headers['x-total-count']
        setTotalPages(getPageCount(totalCount, limit))
    })

    useEffect(() => {
        fetchPosts(limit, page);
    }, [])

    function createPost(newPost) {
        setPosts([...posts, newPost]);
        setModal(false);
    }


    // get post from children component
    function removePost(post) {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    function changePage(page) {
        setPage(page);
        fetchPosts(limit, page);
    }

    return (
        <div className="App">
            <MyButton style={{ marginTop: 20 }} onClick={() => setModal(true)}>
                create post
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <Postform create={createPost} />
            </MyModal>
            <hr style={{ margin: '15px 0' }} />
            <PostFilter
                filter={filter}
                setFilter={setFilter} />
            {postError &&
                <h1>Error ${postError}</h1>
            }
            {isPostLoading
                ? <h1 style={{ display: 'flex', justifyContent: 'center' }}>Loading in progress...</h1>
                : <PostList remove={removePost} posts={sortedAndSearchedPosts} title='List 1' />
            }
            <Pagination
                page={page}
                changePage={changePage}
                totalPages={totalPages}
            />
        </div>
    );
}

export default Posts;
