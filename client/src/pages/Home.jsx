import { Content } from '../Components/Content';
import Auth from '../utils/auth';
import { Link } from 'react-router-dom';

const Home = () => {

    if (Auth.loggedIn()) {
        return (<Content />);
    }


    return (
        <div className="max-w-lg mx-auto px-4 py-8 text-center">
            <h1 className="text-4xl font-bold mb-4">Welcome to Academa</h1>
            <h2 className="text-lg text-gray-700 mb-8">Academa is a platform that allows students to create and study flashcards</h2>
            <Link to='/login'>
                <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                    Get Started
                </button>
            </Link>

        </div>
    );
}

export default Home;