import './detailsEdit.css';
import { useContext } from 'react';
import DetailsBody from '../detailsBody/detailsBody';
import UserContext from '../../userContext/userContex';

const DetailsEdit = () => {
    const { session } = useContext(UserContext);

    const Details = () => {
        return (
            <div className='details text-center mx-auto rounded-3xl'>
                <div className='h2'>
                    <h2 className='text-3xl'>PROFILE</h2>
                </div>
                <table className="detailsEdit text-center table-fixed text-left mx-auto">
                    <thead>
                        <div className='profile mb-5 mt-3'>
                            <p className='text-xl'>Some info maybe visible to other people</p>
                        </div>
                    </thead>
                    {session.map(user =>
                        <DetailsBody user={user} key={user._id} />
                    )}

                </table>
            </div>

        )
    }

    return (
        <div>
            <Details />
        </div>
    )

}

export default DetailsEdit;

