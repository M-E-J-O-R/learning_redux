import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { sub } from "date-fns";
//chapter 2 initial state

// const initialState = [
//     {
//         id: 1,
//         title: 'Learning Redux Toolkit',
//         content: 'I have heard good things',
//         date: sub(new Date(), { minutes: 10 }).toISOString(),
//         reactions: {
//             thumbsUp: 0,
//             wow: 0,
//             heart: 0,
//             rocket: 0,
//             coffee: 0
//         }


//     },
//     {
//         id: 2,
//         title: 'Slices...',
//         content: 'The more i say slice the more i want pizza',
//         date: sub(new Date(), { minutes: 5 }).toISOString(),
//         reactions: {
//             thumbsUp: 0,
//             wow: 0,
//             heart: 0,
//             rocket: 0,
//             coffee: 0
//         }

//     },
// ];


const initialState = {
    posts: [],
    status: 'idle', // 'idle', 'success', 'failed', 'loading'
    error: null,
};
const POST_URL = 'https://jsonplaceholder.typicode.com/posts';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    try {
        const response = await axios.get(POST_URL);
        return response.data;
    } catch (err) {
        return err.message;
    }


});

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer: (state, action) => {
                state.posts.push(action.payload);
            },
            prepare(title, content, userId, reactions) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        date: new Date().toISOString(),
                        userId,
                        reactions
                    }
                };
            }
        },
        reactionsAdded(state, action) {
            const { postId, reaction } = action.payload;
            const existingPost = state.posts.find(post => post.id === postId);
            if (existingPost) {
                existingPost.reactions[reaction]++;
            }

        },
        extraReducers(builder) {
            builder
                .addCase(fetchPosts.pending, (state, action) => {
                    state.status = 'loading';
                })
                .addCase(fetchPosts.fulfilled, (state, action) => {
                    state.status = 'succeeded';

                    //Adding date and reactions
                    let min = 1;
                    const loadedPost = action.payload.map((post) => {
                        post.date = sub(new Date(), { minute: min++ }).toISOString();
                        post.reactions = {
                            thumbsUp: 0,
                            hooray: 0,
                            heart: 0,
                            rocket: 0,
                            eyes: 0
                        };

                        return post;
                    });

                    //add fetched post to the array
                    state.posts = state.posts.concat(loadedPost);
                })
                .addCase(fetchPosts.rejected, (state, action) => {
                    state.status = 'failed';
                    state.error = action.error.message;
                });
        }
    }
});


export const selectAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;


export const { postAdded, reactionsAdded } = postsSlice.actions;
export default postsSlice.reducer;