import { createSlice } from '@reduxjs/toolkit'

const postSlice = createSlice({
    name: 'post',
    initialState: {
        posts: [],
        selectedPost: null,
        postsOnlyWhomIFollow: [],
        showAllPosts: true,
    },
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload;
        },
        setSelectedPost: (state, action) => {
            state.selectedPost = action.payload;
        },
        setPostsOnlyWhomIFollow: (state, action) => {
            state.postsOnlyWhomIFollow = action.payload;
        },
        setShowAllPosts: (state, action) => {
            state.showAllPosts = action.payload;
        }
    }
});

export const { setPosts, setSelectedPost, setPostsOnlyWhomIFollow, setShowAllPosts } = postSlice.actions;
export default postSlice.reducer;