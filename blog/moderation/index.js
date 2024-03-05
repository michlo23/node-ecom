const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

app.post('/events', async (req, res) => {

    if (req.body.type === 'CommentCreated') {

        const { data } = req.body;
        const status = data.content.includes('orange') ? 'rejected' : 'approved';

        await axios.post('http://event-bus-srv:4005/events', {
            type: "CommentModerated",
            data: {
                // id: data.id,
                // postId: data.postId,
                // status: status,
                // content: data.content
                ...data,
                status
            }
        });
    };

    res.send({});
});

app.listen(4003, () => {
    console.log('Listen on 4003');
});