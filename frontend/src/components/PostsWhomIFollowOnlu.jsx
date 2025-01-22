import React from 'react'
import { useSelector } from 'react-redux';
import Post from './Post';

const PostsWhomIFollowOnlu = () => {

    const { postsOnlyWhomIFollow } = useSelector(store => store.post);

    return (
        <div className=''>
            {
                postsOnlyWhomIFollow?.length > 0 ? postsOnlyWhomIFollow?.map((post) => {
                    return <Post key={post?._id} post={post} />
                }) : <div>
                    <p>You don't follow anyone.</p>
                </div>
            }
        </div>
    )
}

export default PostsWhomIFollowOnlu
