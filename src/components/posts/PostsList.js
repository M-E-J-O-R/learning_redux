import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import { selectAllPosts, getPostsError, getPostsStatus, fetchPosts } from "./postsSlice";
import PostExcerpt from "./PostExercp";

const PostsList = () => {
    const posts = useSelector(selectAllPosts);
    const postsStatus = useSelector(getPostsStatus);
    const error = useSelector(getPostsError);

    const dispatch = useDispatch();

    useEffect(() => {
        if (postsStatus === 'idle') {
            dispatch(fetchPosts());
        }
    }, [dispatch, postsStatus]);


    let content;
    if (postsStatus === 'loading') {
        content = <p>Loadin.....</p>;
    } else if (postsStatus === 'succeeded') {
        const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date));

        const renderedPost = orderedPosts.map((post) =>
       
    );



    } else if (postsStatus === 'failed') {
        content = <p>Error while loading</p>;
    }

    
    return (
        <section>
            <h2>Posts</h2>
            {renderedPost}
        </section>
    );
};

export default PostsList;