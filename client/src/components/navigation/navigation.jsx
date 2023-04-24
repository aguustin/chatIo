
import { Link } from 'react-router-dom';
import devchallenge from '../../img/devchallenges.svg';


const Navigation = () => {


    return(
        <div className="flex">
            <div>
                <img src={devchallenge} alt=""></img>
            </div>
            <div className='flex'>
                <img src="" alt=""></img>
            </div>
            <div>
                <Link to="/signOut">Sign Out</Link>
            </div>
        </div>
    )
}

export default Navigation;