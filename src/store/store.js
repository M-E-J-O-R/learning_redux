import { configureStore } from "@reduxjs/toolkit";
import counterReducer from '../components/counter/counterSlice';
import postsReducer from '../components/posts/postsSlice'
import usersReducer from '../components/users/usersSlice'

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        posts: postsReducer,
        users:usersReducer,
    }

});