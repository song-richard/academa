//Apollo Imports
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { Outlet } from 'react-router-dom';
import { setContext } from '@apollo/client/link/context';

//Component Imports
import { Footer } from "./Components/Footer";
import { Header } from "./Components/Header";
import { Content } from "./Components/Content";
import { ChatBot } from "./Components/ChatBot";

//GraphQL Queries
import { GET_PROFILES } from './utils/queries';

//COMMENTED OUT UNTIL AUTHO IS IN WORKING STATE - 03/05/2024
// import { Login } from "./Components/Login";
// import { Logout } from "./Components/Logout";
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
      <>
        <Header />
        {/* <Content /> */}
        <Outlet />
        <Footer />
        <ChatBot />
      </>

      {/* COMMENTED OUT UNTIL AUTHO IS IN WORKING STATE - 03/05/2024 */}
      {/* <Login />
      <Logout /> */}
    </ApolloProvider>
  );
};

export default App;