const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
    res.send(posts);
});

const handleEvent = (type, data) => {
    if (type === 'PostCreated') {
        const { id, title } = data;

        posts[id] = { id, title, comments: [] };
    }

    if (type === 'CommentCreated') {
        const { id, content, postId, status } = data;
        posts[postId].comments.push({ id, content, status });
    }

    if (type === 'CommentModerated') {
        const { id, postId, status, content } = data;
        const comments = posts[postId].comments;

        const comment = comments.find(comment => {
            return comment.id == id;
        });

        comment.status = status;
        comment.content = content;
    }
}

app.post('/events', (req, res) => {
    const { type, data } = req.body;
    handleEvent(type, data);


    res.send({});
});

app.listen(4002, async () => {
    console.log('Listening on 4002');

    const res = await axios.get('http://localhost:4005/events').catch((err) => {
        console.log(err.message);
    });

    if (!res) {
        return;
    }

    for (let event of res.data) {
        console.log('Processing event:', event.type);

        handleEvent(event.type, event.data);
    }
});