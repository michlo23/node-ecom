import axios from "axios";
import React, { useState } from "react";

const CommentCreate = ({ postId }) => {
    const [content, setContent] = useState('');

    console.log("fasf  " +postId )
    const onSubmit = async (event) => {
        event.preventDefault();

        await axios.post(`http://localhost:4001/posts/${postId}/comments`, { content });

        setContent('');
    }

    return <div>
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label>New Comment</label>
                <input
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    className="form-control" />
            </div>
            <button className="btn btn-primary">Submit</button>
        </form>
    </div>
};

export default CommentCreate;