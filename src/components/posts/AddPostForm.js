import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postAdded } from './postsSlice';
import { selectAllUsers } from '../users/usersSlice';

const AddPostForm = () => {
    //states variables
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [userId, setUserId] = useState('');
    // const date = new Date();
    // const postTime = `${date.getHours()}:${date.getMinutes()}`;

    //redux variables
    const dispatch = useDispatch();
    const users = useSelector(selectAllUsers);

    //functions handling change
    const handleTitleChange = e => setTitle(e.target.value);
    const handleContentChange = e => setContent(e.target.value);
    const handleAuthorChange = e => setUserId(e.target.value);


    const handlePostAdded = (e) => {
        if (content && title) {
            dispatch(
                postAdded(title, content, userId)
            );
            setTitle('');
            setContent('');

        }

    };

    const canSave = Boolean(title) && Boolean(content) && (userId);

    const userOptions = users.map(user => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ));
    return (
        <section>
            <h2>Add New Post</h2>
            <form>
                <label htmlFor="postTile"> Post Title:
                </label>
                <input type="text"
                    id='postTiltle'
                    name='postTitle'
                    value={title}
                    onChange={handleTitleChange}
                />
                <label htmlFor="postAuthor">Author:</label>
                <select
                    id="postAuthor"
                    value={userId}
                    onChange={handleAuthorChange}
                >
                    <option value=""></option>
                    {userOptions}
                </select>

                <label htmlFor="postContent">Content:</label>
                <textarea type="text"
                    id='postContent'
                    name='postContent'
                    value={content}
                    onChange={handleContentChange}
                />
                <button type='button' onClick={handlePostAdded} disabled={!canSave}>Save Post</button>

            </form>
        </section>
    );
};

export default AddPostForm;