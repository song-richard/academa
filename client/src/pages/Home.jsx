import {Content} from '../Components/Content';
import Auth from '../utils/auth';

const Home = () => {
    
    //Home page if user is logged in
    if(Auth.loggedIn()){
        return (<Content />);
    }

    //Home page if user is not logged in
    //TODO: Style this page
    return (
        <div>
            <h1>Welcome Academa</h1>
            <h2>Academa is a platform that allows students to create and study flashcards</h2>
            <button>Get Started</button>
        </div>
    )
}

export default Home;