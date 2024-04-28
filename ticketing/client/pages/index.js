import buildClient from '../api/build-client';

const landingPage = ({ currentUser }) => {
  console.log(currentUser);

  return currentUser ? (
    <h1>You are signed in {currentUser.email} </h1>
  ) : (
    <h1>Landing Page!!!</h1>
  );
};

// method called before page will be rendered (server side rendering) UNLESS it was redirected from subpage...
landingPage.getInitialProps = async ({ req }) => {
  var axios = buildClient({ req });
  const { data } = await axios.get('/api/users/currentuser').catch((err) => {
    console.log(err.message);
  });

  return data;
};

export default landingPage;
