import {Content} from '../Components/Content';

const Home = () => {
    
    //Home page if user is logged in
    if(user){
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