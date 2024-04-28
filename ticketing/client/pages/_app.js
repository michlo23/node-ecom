import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client';

const appComponent = ({ Component, pageProps }) => {
  return (
    <div>
      <h1>Header</h1>
      <Component {...pageProps} />
    </div>
  );
};

appComponent.getInitialProps = (appContenxt, context) => {
  //console.log('fefe - ', fefe);
  console.log(
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
  );
  console.log('aaa - ', Object.keys(appContenxt));
  //const axios = buildClient(fefe.ctx.req);
  return 1;
};

export default appComponent;
