import express from 'express';

const router = express.Router();

router.post('/api/users/signin', (req, res) => {
  res.send({ user: 'Endrju1' });
});

export { router as signinRouter };
