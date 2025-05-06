import './loginRegister.css';
import devchallenges from '../../img/devchallenges.svg';
import { useState } from 'react';
import { useContext } from 'react';
import UserContext from '../../userContext/userContex';
import { useNavigate } from 'react-router-dom';


const LoginRegister = () => {

    const navigate = useNavigate();
    const { enterUser, registerContext } = useContext(UserContext);
    const [changeForm, setChangeForm] = useState(true);

    const RegisterInfo = () => {

        const registerUser = async (e) => {
            e.preventDefault();
            const name = e.target.elements.name.value;
            const bio = e.target.elements.bio.value;
            const phone = e.target.elements.phone.value;
            const email = e.target.elements.email.value;
            const password = e.target.elements.password.value;

            const userRegister = {
                name: name,
                bio: bio,
                phone: phone,
                email: email,
                password: password
            }

            await registerContext(userRegister);

            setChangeForm(!changeForm);
        }

        return (
            <div>
                <div className='edit w-[600px] mx-auto rounded-3xl pt-6 pb-12  pl-12 pr-12'>
                    <form onSubmit={(e) => registerUser(e)} className='rounded-3xl'>
                        <div className='form-header'>
                            <h2>CHATIO</h2>
                        </div>
                        <div className='relative form-input-edit mt-6'>
                            <label className='absolute left-0 text-xl' for="name">Name</label><br></br>
                            <input className="w-full rounded-lg pl-3 pt-2 pb-2 mt-2" type="text" name="name" placeholder="enter your name..." maxLength="20"></input>
                        </div>
                        <div className="relative form-input-edit mt-6">
                            <label className='absolute left-0 text-xl' for="bio">Bio</label><br></br>
                            <textarea className='mt-1' type="text" name="bio" col="10" placeholder="enter your bio..."></textarea>
                        </div>
                        <div className="relative form-input-edit mt-6">
                            <label className='absolute left-0 text-xl' for="phone">Phone</label><br></br>
                            <input className="w-full rounded-lg pl-3 pt-2 pb-2 mt-2" type="text" name="phone" placeholder="enter your phone..."></input>
                        </div>
                        <div className="relative form-input-edit mt-6">
                            <label className='absolute left-0 text-xl' for="email">Email</label><br></br>
                            <input className="w-full rounded-lg pl-3 pt-2 pb-2 mt-2" type="text" name="email" placeholder="enter your email..."></input>
                        </div>
                        <div className="relative form-input-edit mt-6">
                            <label className='absolute left-0 text-xl' for="password">Password</label>
                            <input className="w-full rounded-lg pl-3 pt-2 pb-2 mt-8" type="password" name="password" placeholder="enter your new password..."></input>
                        </div>

                        <button className='form-button rounded-xl font-bold mb-3 mt-9 w-[200px] pt-3 pb-3' type="submit" id="save">Save</button>
                    </form>
                    <p className='social mt-4'>Already a member? <button onClick={() => setChangeForm(!changeForm)}>Login</button></p>
                </div>
            </div>

        )

    }

    const enter = async (e) => {
        e.preventDefault();
        const email = e.target.elements.email.value;
        const password = e.target.elements.password.value;
        const confirm = await enterUser(email, password);

        if (confirm !== 0) {
            navigate("/details");
        } else {
            console.log("s");
        }
    }


    const Login = () => {
        return (
            <div>
                <div className="loginRegister w-[600px] mx-auto rounded-3xl pt-6 pb-12 pl-12 pr-12">
                    <div className='lr text-center mx-auto'>
                        <img src={devchallenges} alt=""></img>
                        {changeForm ? <p className='mt-6 mb-3'>Join thousands of leaners from around the world</p> : <p className='mt-6 mb-3'>Login</p>}
                        {changeForm ? <h2>WELCOME TO CHATIO</h2> : null}
                    </div>
                    <form onSubmit={(e) => enter(e)}>
                        <div className="form-input mt-6">
                            <input className="w-full rounded-lg pl-3 pt-2 pb-2" type="text" name="email" placeholder="Email"></input>
                        </div>
                        <div className='form-input mt-6'>
                            <input className="w-full rounded-lg pl-3 pt-2 pb-2" type="password" name="password" placeholder="Password"></input>
                        </div>
                        {changeForm ? <button className='form-button rounded-xl font-bold mt-9 pt-3 pb-3 pl-6 pr-6 mb-3' type="submit">Start Chat Now</button>
                            : <button className='form-button rounded-xl font-bold mb-3' type="submit">Login</button>}
                    </form>

                    <div className='social'>
                        <p className='mt-4'>Dont have account yet? <button onClick={() => setChangeForm(!changeForm)}>Register</button></p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className='pos'>
            {changeForm ? <Login /> : <RegisterInfo />}
        </div>
    )

}



export default LoginRegister;