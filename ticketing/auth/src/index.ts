import express from 'express';
import { json } from 'body-parser';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signupRouter } from './routes/signup';
import { signoutRouter } from './routes/signout';

const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

// app.get('/api/users/currentuser', (req, res) => {
//   res.send({ user: 'Endrju' });
// });

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
