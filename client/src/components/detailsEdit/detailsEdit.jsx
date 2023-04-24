import './detailsEdit.css';
import { useContext } from 'react';
import DetailsBody from '../detailsBody/detailsBody';
import UserContext from '../../userContext/userContex';

const DetailsEdit = () => {
    const { session } = useContext(UserContext);
    
    const Details = () => {
        return(
            <div className='details rounded-3xl'>
                <p>Profile</p>
                <p>Basic info, like your name and photo</p>
                <table className="detailsEdit table-fixed text-left mx-auto">
            <thead>
            <div className='profile'>
                <h3>Profile</h3>
                <p>Some info maybe visible to other people</p>
           </div>
            </thead>
            {session.map(user =>
              <DetailsBody user={user} key={user._id} />
            )}
              
          </table>
            </div>
            
        )
    }

   

    return(
        <div>
             <Details/>
        </div>
    )

 
}

export default DetailsEdit;

/*   <div>
                        <img src="" alt=""></img>
                        <button>change photo</button>
                    </div>*/