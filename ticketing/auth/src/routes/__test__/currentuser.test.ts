import request from 'supertest';
import { app } from '../../app';

it('responds with details about current user', async () => {
  const cookie = await signin();

  const response = await request(app)
    .get('/api/users/currentuser')
    .set('Cookie', cookie!)
    .send()
    .expect(200);

  expect(response.body.currentUser.email).toEqual('test@test.com');
});

it('responds with null on unathenticated user', async () => {
  const response = await request(app)
    .get('/api/users/currentuser')
    .send()
    .expect(200);

  expect(response.body.currentUser).toBeNull();
});
