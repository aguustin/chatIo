import './loginRegister.css';
//import devchallengesLight from '../../img/devchallenges-light.svg';
import devchallenges from '../../img/devchallenges.svg';
import facebook from '../../img/Facebook.svg';
import github from '../../img/Gihub.svg';
import google from '../../img/Google.svg';
import twitter from '../../img/Twitter.svg';
import { useState } from 'react';
import { useContext } from 'react';
import UserContext from '../../userContext/userContex';
import { useNavigate } from 'react-router-dom';


const LoginRegister = () => {

    const navigate = useNavigate();
    const {enterUser, registerContext} = useContext(UserContext);
    const [changeForm, setChangeForm] = useState(true);
   
    const googleAcount = () => {
        window.open(
            `http://localhost:4000/google/callback`,
            "_self"
        );
    };

    const facebookAcount = () => {
        window.open(
            `http://localhost:4000/facebook/callback`,
            "_self"
        );
    };

    const twitterAcount = () => {
        window.open(
            `http://localhost:4000/twitter/callback`,
            "_self"
        );
    };

    const githubAcount = () => {
        window.open(
            `http://localhost:4000/github/callback`,
            "_self"
        );
    };

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
  
          return(
              <div>
              <div className='edit mx-auto'>
                  <form onSubmit={(e) => registerUser(e)}>
                      <div className='form-header'>
                            <h2>CHATIO</h2>
                      </div>
                      <div className='form-input-edit mt-6'>
                          <label for="name">name</label><br></br>
                          <input type="text" name="name" placeholder="enter your name..."></input>
                      </div>
                      <div className="form-input-edit">
                          <label for="bio">bio</label><br></br>
                          <textarea type="text" name="bio" col="10" placeholder="enter your bio..."></textarea>
                      </div>
                      <div className="form-input-edit">
                          <label for="phone">phone</label><br></br>
                          <input type="text" name="phone" placeholder="enter your phone..."></input>
                      </div>
                      <div className="form-input-edit">
                          <label for="email">email</label><br></br>
                          <input type="text" name="email" placeholder="enter your email..."></input>
                      </div>
                      <div className="form-input-edit">
                          <label for="password">password</label>
                          <input type="password" name="password" placeholder="enter your new password..."></input>
                      </div>
  
                      <button type="submit" id="save">Save</button>
                  </form>
                  <p className='mt-4'>already a member? <button onClick={() => setChangeForm(!changeForm)}>Login</button></p>
              </div>
                  
              </div>
             
      )
          
      }

      const enter = async (e) => {
        e.preventDefault();
        const email = e.target.elements.email.value;
        const password = e.target.elements.password.value;
        const confirm = await enterUser(email, password);

        console.log("e", confirm);

        if(confirm !== 0){
            navigate("/details");  //hacer la redireccion a details
        }else{
            console.log("s");
        }
    }


      const Login = () => {
        return(
            <div>
                <div className="loginRegister rounded-3xl">
                    <div className='lr text-center mx-auto'>
                        <img src={devchallenges} alt=""></img>
                        {changeForm ? <p>Join thousands of leaners from around the world</p> : <p>Login</p>}
                        {changeForm ? <p>WELCOME TO CHATIO</p> : null}
                    </div>
                    <form onSubmit={(e) => enter(e)}>
                        <div className="form-input">
                            <input className="rounded-xl" type="text" name="email" placeholder="Email"></input>
                        </div>
                        <div className='form-input'>
                            <input className="rounded-xl" type="password" name="password" placeholder="Password"></input>
                        </div>
                        { changeForm ? <button className='form-button rounded-xl font-bold' type="submit">Start Coding Now</button>
                        : <button className='form-button rounded-xl font-bold' type="submit">Login</button> }
                    </form>
                
                    <div className='social'>
                        <p className='mt-6'>or continue with these social profile</p>
                            <div className='flex mx-auto justify-center mt-4'>
                            
                                <button onClick={googleAcount}><img src={google} alt=""></img></button>
                                <button onClick={facebookAcount}><img src={facebook} alt=""></img></button>
                                <button onClick={twitterAcount}><img src={twitter} alt=""></img></button>
                                <button onClick={githubAcount}><img src={github} alt=""></img></button>
                            </div>
                            <p className='mt-4'>Dont have account yet? <button onClick={() => setChangeForm(!changeForm)}>Register</button></p>
                    </div>
                </div>
            </div>
        )
      }

      return(
        <div className='pos'>
            {changeForm ? <Login/> : <RegisterInfo/>}
        </div>
      )

}



export default LoginRegister;