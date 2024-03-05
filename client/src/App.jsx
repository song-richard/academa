//Apollo
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import { Footer } from "./Components/Footer";
import { Header } from "./Components/Header";
import { Content } from "./Components/Content";
import { ChatBot } from "./Components/ChatBot";

// import { Login } from "./Components/Login";
// import { Logout } from "./Components/Logout";

//Apollo Client
const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <>
      <Header />
      <Content />
      <Footer />

      <ChatBot />
      {/* <Login />
      <Logout /> */}
    </>
  );
};

export default App;