import { useContext, useState } from 'react';
import UserContext from '../../userContext/userContex';

const DetailsBody = (user) => {

    const [detailsBody, setDetailsBody] = useState(true);
    const [image] = useState([]);
    const { editUserContext } = useContext(UserContext);

    const edit = async (e, id) => {
        e.preventDefault();
        const photo = e.target.elements.photo.files[0];
        const name = e.target.elements.name.value;
        const bio = e.target.elements.bio.value;
        const password = e.target.elements.password.value;

        const editUserOb = {
            photo: photo,
            name: name,
            bio: bio,
            password: password
        }
        await editUserContext(id, editUserOb);
        setDetailsBody(!detailsBody);
    }

    const SeeInfo = () => {
        return (
            <div className="loginRegister w-[600px] mx-auto rounded-3xl pt-6 pb-12 pl-12 pr-12">
                <form>
                    <div className='image-form mt-6 text-center relative'>
                        <label className='text-xl'>Photo</label>
                        {user.user.photo?.url.length === 0 ? <img className='w-[250px] mx-auto mt-2' src="" alt=""></img> : <img className='w-[250px] mx-auto mt-2' src={user.user.photo?.url} alt=""></img>}
                    </div>
                    <div className='form-group mt-6 relative'>
                        <label className='text-xl absolute left-0'>Name</label>
                        <textarea className="mt-8" type="text" disabled="true" name="name" value={user.user.name} maxlength="10"></textarea>
                    </div>
                    <div className='form-group mt-6 relative'>
                        <label className='text-xl absolute left-0'>Bio</label>
                        <textarea className="mt-8" type="text" disabled="true" name="bio" value={user.user.bio} ></textarea>
                    </div>
                    <div className='form-group mt-6 relative'>
                        <label className='text-xl absolute left-0'>Phone</label>
                        <input className="w-full rounded-lg pl-3 pt-2 pb-2 mt-8" type="text" disabled="true" name="phone" value={user.user.phone}  ></input>
                    </div>
                </form>
                <div className='form-buttons flex justify-between mt-12 pl-9 pr-9'>
                    <button className='edit-b w-[150px] p-3 rounded-lg text-lg' onClick={() => setDetailsBody(!detailsBody)}>Edit</button>
                    <button className='enter-b w-[150px] p-3 rounded-lg text-lg'><a href="/chat">Enter</a></button>
                </div>
            </div>
        )

    }

    const EditInfo = () => {
        return (
            <div className="loginRegister w-[600px] mx-auto rounded-3xl pt-6 pb-12 pl-12 pr-12">
                <form onSubmit={(e) => edit(e, user.user._id)} encType="multipart/form-data">
                    {image.length === 0 ? <img src="" alt=""></img> : <img src={image.name} alt=""></img>}
                    <div className='form-group'>
                        <label className='text-2xl'>Photo</label>
                        <input className="w-full rounded-lg pl-3 pt-2 pb-2 mt-8" type="file" name="photo" accept='image/*'></input>
                    </div>
                    <div className='form-group mt-6 relative'>
                        <label className='text-xl absolute left-0'>Name</label>
                        <input className="w-full rounded-lg pl-3 pt-2 pb-2 mt-8" type="text" name="name" placeholder='New name' required></input>
                    </div>
                    <div className='form-group mt-6 relative'>
                        <label className='text-xl absolute left-0'>Bio</label>
                        <textarea className="w-full rounded-lg pl-3 pt-2 pb-2 mt-8" type="text" name="bio" placeholder='New bio' required></textarea>
                    </div>
                    <div className='form-group mt-6 relative'>
                        <label className='text-xl absolute left-0'>Password</label>
                        <input className="w-full rounded-lg pl-3 pt-2 pb-2 mt-8" type="password" name="password" placeholder='New password'></input>
                    </div>
                    <div className='form-buttons flex justify-between mt-12 pl-9 pr-9'>
                        <button className='edit-b w-[150px] p-3 rounded-lg text-lg' onClick={() => setDetailsBody(!detailsBody)}>Cancel Edit</button>
                        <button className='enter-b w-[150px] p-3 rounded-lg text-lg' type='submit'>Save Changes</button>
                    </div>
                </form>
            </div>
        )
    }

    return (
        <div>
            {detailsBody ? <SeeInfo /> : <EditInfo />}
        </div>
    )

}

export default DetailsBody;
