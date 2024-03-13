//Apollo Imports
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { Outlet } from 'react-router-dom';
import { setContext } from '@apollo/client/link/context';

//Component Imports
import { Footer } from "./Components/Footer";
import { Header } from "./Components/Header";


// image imports
// import paperClipsBG from './assets/images/paperClipsBG.jpg';
// import yellowLaptopBG from './assets/images/yellowLaptopBG.jpg';
import glassesBG from './assets/images/glassesBG.jpg';
// import blueBG from './assets/images/blueBG.jpg';

const httpLink = createHttpLink({
  uri: '/graphql',
});
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

//Apollo Client
const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow" style={{
           backgroundImage: `url(${glassesBG})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            backgroundRepeat: 'no-repeat'
           }}>
          <Outlet />
        </main>
        <Footer />
      </div>
    </ApolloProvider>
  );
};

export default App;