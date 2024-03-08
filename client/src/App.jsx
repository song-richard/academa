//Apollo Imports
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Outlet } from 'react-router-dom';

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

//Apollo Client
const client = new ApolloClient({
  uri: '/graphql',
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