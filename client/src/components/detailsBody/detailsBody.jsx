import { useContext, useState } from 'react';
import UserContext from '../../userContext/userContex';

const DetailsBody = (user) => {

    const [detailsBody, setDetailsBody] = useState(true);
    const [image, setImage] = useState([]);
    const {editUserContext} = useContext(UserContext);

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
        return(
            <div className="details-form">
                <form>
                    <div className='image-form'>
                        <label>Photo</label>
                        {user.user.photo?.url.length === 0 ? <img src="" alt=""></img> : <img src={user.user.photo?.url} alt=""></img>}
                    </div>
                    <div className='form-group'>
                        <label>Name</label>
                        <textarea type="text" disabled="true" name="name" value={user.user.name} ></textarea>
                    </div>
                    <div className='form-group'>
                        <label>Bio</label>
                        <textarea type="text" disabled="true" name="bio" value={user.user.bio} ></textarea>
                    </div>
                    <div className='form-group mt-2'>
                        <label>Phone</label>
                        <input type="text" disabled="true" name="phone" value={user.user.phone}  ></input>
                    </div>
                </form>
                <div className='form-buttons flex justify-between'>
                    <button onClick={() => setDetailsBody(!detailsBody)}>Edit</button>
                    <button><a href="/chat">Enter</a></button>
                </div>
        </div>
    )
        
    }

    const EditInfo = () => {
        return (
            <div className="details-form">
                <form onSubmit={(e) => edit(e, user.user._id)} encType="multipart/form-data">
                    { image.length === 0 ? <img src="" alt=""></img> :  <img src={image.name} alt=""></img> }
                    <div className='form-group'>
                        <label>Photo</label>
                        <input  type="file" name="photo" accept='image/*'></input>
                    </div>
                    <div className='form-group'>
                        <label>Name</label>
                        <input type="text" name="name" placeholder='New name'></input>
                    </div>
                    <div className='form-group'>
                        <label>Bio</label>
                        <textarea type="text" name="bio" placeholder='New bio'></textarea>
                    </div>
                    <div className='form-group'>
                        <label>Password</label>
                        <input type="password" name="password" placeholder='New password'></input>
                    </div>
                    <div className='form-buttons flex justify-between'>
                        <button onClick={() => setDetailsBody(!detailsBody)}>Cancel Edit</button>
                    </div>
                        <button type='submit'>Save Changes</button>
                </form>
                
            </div>
        )
    }

    return(
        <div>
               { detailsBody ? <SeeInfo/> : <EditInfo/> }
        </div>
    )
   
}

export default DetailsBody;
/*import { useContext, useState } from 'react';
import UserContext from '../../userContext/userContex';

const DetailsBody = (user) => {

    const [detailsBody, setDetailsBody] = useState(true);
    const [image, setImage] = useState([]);
    const {editUserContext} = useContext(UserContext);

    const edit = async (e, id) => {
        e.preventDefault();
        const photo = e.target.elements.photo.files[0];
        const name = e.target.elements.name.value;
        const bio = e.target.elements.bio.value;
        const phone = e.target.elements.phone.value;
        const email = e.target.elements.email.value;
        const password = e.target.elements.password.value;
      
        const editUserOb = {
            photo: photo,
            name: name,
            bio: bio,
            phone: phone,
            email: email,
            password: password
        }

        await editUserContext(id, editUserOb);

        setDetailsBody(!detailsBody);
    }

    const SeeInfo = () => {
        return(
            <div>
            <form>
                <div>
                    <label>Photo</label>
                    {user.user.photo?.url.length === 0 ? <img src="" alt=""></img> : <img src={user.user.photo?.url} alt=""></img>}
                </div>
                <div>
                    <label>Name</label>
                    <textarea type="text" disabled="true" name="name" value={user.user.name} ></textarea>
                </div>
                <div>
                    <label>Bio</label>
                    <textarea type="text" disabled="true" name="bio" value={user.user.bio} ></textarea>
                </div>
                <div>
                    <label>Phone</label>
                    <input type="text" disabled="true" name="phone" value={user.user.phone}  ></input>
                </div>
                <div>
                    <label>Email</label>
                    <input type="text" disabled="true" name="email" value={user.user.email}  ></input>
                </div>
                <div>
                    <label>Password</label>
                    <input type="text" disabled="true" name="password" value={user.user.password} placeholder={user.password}></input>
                </div>
            </form>
            <button onClick={() => setDetailsBody(!detailsBody)}>Edit</button>
            <button><a href="/chat">Enter</a></button>
        </div>
    )
        
    }

    const EditInfo = () => {
        return (
            <div>
                <form onSubmit={(e) => edit(e, user.user._id)} encType="multipart/form-data">
                    { image.length === 0 ? <img src="" alt=""></img> :  <img src={image.name} alt=""></img> }
                    <div>
                        <label>Photo</label>
                        <input  type="file" name="photo" accept='image/*'></input>
                    </div>
                    <div>
                        <label>Name</label>
                        <textarea type="text" name="name" placeholder='New name'></textarea>
                    </div>
                    <div>
                        <label>Bio</label>
                        <textarea type="text" name="bio" placeholder='New bio'></textarea>
                    </div>
                    <div>
                        <label>Phone</label>
                        <input type="text" name="phone" placeholder='New phone'></input>
                    </div>
                    <div>
                        <label>Email</label>
                        <input type="text" name="email" placeholder='New email'></input>
                    </div>
                    <div>
                        <label>Password</label>
                        <input type="text" name="password" placeholder='New password'></input>
                    </div>
                    <button type='submit'>Save Changes</button>
                </form>
                <button onClick={() => setDetailsBody(!detailsBody)}>Cancel Edit</button>
                
            </div>
        )
    }

    return(
        <div className='detailsBody'>
               { detailsBody ? <SeeInfo/> : <EditInfo/> }
        </div>
    )

   
}

export default DetailsBody;*/