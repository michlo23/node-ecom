const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;

    const status = 'pending';
    const comments = commentsByPostId[req.params.id] || [];
    const comment = { id: commentId, content, status }
    comments.push(comment);

    commentsByPostId[req.params.id] = comments;

    await axios.post('http://localhost:4005/events', {
        type: "CommentCreated",
        data: {
            id: commentId,
            content,
            status,
            postId: req.params.id
        }
    })

    res.status(201).send(comments);
});

app.post('/events', async (req, res) => {
    console.log('Received Event', req.body.type);
    const { type, data } = req.body;
    if (type === 'CommentModerated') {
        const { postId, id, status } = data;
        const comments = commentsByPostId[postId];

        const comment = comments.find(comment =>{
            return comment.id == id;
        });

        comment.status = status;
        
        await axios.post('http://localhost:4005/events', {
            ...req.body,
            type: 'CommentUpdated'
        });
    }

    res.send({});
});

app.listen(4001, () => {
    console.log('Listening on 4001');
});