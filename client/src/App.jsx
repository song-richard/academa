import { Footer } from "./Components/Footer";
import { Header } from "./Components/Header";
import { Content } from "./Components/Content";
import { Login } from "./Components/Login";
import { Logout } from "./Components/Logout";



function App() {
  return (
    <>
      <Header />
      <Content />
      <Footer />

      <Login />
      <Logout />
    </>
  );
};

export default App;