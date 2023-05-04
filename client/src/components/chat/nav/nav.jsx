import './nav.css';
import ChatBody from '../chatBody/chatBody';
import { useContext, useState } from 'react';
import ChatContext from '../../../chatContext/chatContext';
import UserContext from '../../../userContext/userContex';


const Nav = () => {

    const [newChannelLayout, setNewChannelLayout] = useState(false);
    const {session} = useContext(UserContext);
    const {addChannelContext, openChannelContext, channels} = useContext(ChatContext);

    const addChannel = async (e) => {
        e.preventDefault(e);
        const channelPropierties = {
            title: e.target.elements.channelName.value,
            description: e.target.elements.channelDescription.value,
            idMember: session[0]._id
        };
        await addChannelContext(channelPropierties);
        setNewChannelLayout(!newChannelLayout);
    }

    const openChannel = async (e, channelId) => {
        e.preventDefault();
        await openChannelContext(channelId);
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
                        {channels.map((c) => <li key={c._id} className='flex'>
                            <button className='bg-zinc-800'>{c.title.substr(0,2).toUpperCase()}</button>
                            <button className='w-full text-left' onClick={(e) => openChannel(e, c._id)}>{c.title}</button>
                        </li>)}
                    </div>
                    {session.map((s) =><div key={s._id} className='user-nav'>
                        <img src={s.photo?.url} alt=""></img>
                         <p>{s.name}</p>
                    </div>)}
                </nav>
                <div>
                <ChatBody session={session[0]}/>
                    {newChannelLayout ? <NewChannel/> : ''}
                </div>
                    
            </div>
        </div>
    )
}

export default Nav;