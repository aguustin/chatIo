import './nav.css';
import prueba from "../../../img/prueba.jpg";
import ChatBody from '../chatBody/chatBody';
import { useContext, useState } from 'react';
import UserContext from '../../../userContext/userContex';

const Nav = () => {

    const [newChannelLayout, setNewChannelLayout] = useState(false);
    const {session} = useContext(UserContext);

    const addChannel = (e) => {
        e.preventDefault(e);
        setNewChannelLayout(!newChannelLayout)
    }
    
    const NewChannel = () => {
        return(
                <div className='form-channel'>
                    <p>New Channel</p>
                    <form onSubmit={(e) => addChannel(e)}>
                        <input type="text" name="channelName" placeholder='New channel'></input>
                        <textarea type="text" name="channelDescription" placeholder='New channel' rows={5}></textarea>
                        <button type="submit">Save</button>
                    </form>
                </div>
        )
    }

    return(
        <div className='chat-background'>
            <div className='flex justify-center items-center'>
                <nav className='nav'>
                    <div className='addChannel flex'>
                        <label>Channels</label>
                        <button className='text-lg bg-zinc-800' onClick={() => setNewChannelLayout(!newChannelLayout)}>+</button>
                    </div>
                    <div className='flex mt-6'>
                        <input name="searchChannel" placeholder='Search channel'></input>
                    </div>
                    <div className='groups mt-6'>
                        <li className='flex'>
                            <button className='bg-zinc-800'>FM</button>
                            <button className='w-full text-left'>FM GROUP MEMB</button>
                        </li>
                    </div>
                    {session.map((s) =><div key={s._id} className='user-nav'>
                        <img src={s.photo?.url} alt=""></img>
                         <p>{s.name}</p>
                    </div>)}
                </nav>
                    <ChatBody session={session[0]}/>
                    {newChannelLayout ? <NewChannel/> : ''}
            </div>
        </div>
    )
}

export default Nav;