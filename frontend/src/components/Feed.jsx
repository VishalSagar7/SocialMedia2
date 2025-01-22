import React from 'react'
import Posts from './Posts';
import PostsWhomIFollowOnlu from './PostsWhomIFollowOnlu';
import { useSelector } from 'react-redux';

const Feed = () => {

    const { showAllPosts } = useSelector((store) => store.post);
    

    return (
        <div className='flex-1 my-8 flex flex-col items-center pl-[20%] '>

            {showAllPosts ? <Posts /> : <PostsWhomIFollowOnlu/>}
            
            
        </div>
    )
}

export default Feed;
