import './nav.css';
import ChatBody from '../chatBody/chatBody';
import { useContext, useState } from 'react';
import ChatContext from '../../../chatContext/chatContext';
import UserContext from '../../../userContext/userContex';
import menu from '../../../img/menu.png';
import notUser from '../../../img/notUser.jpg';
import {useNavigate} from "react-router-dom";

const Nav = () => {
    const nav = useNavigate();
    const [newChannelLayout, setNewChannelLayout] = useState(false);
    const {session} = useContext(UserContext);
    const [seeMember, seeMembersLayout] = useState(false);
    const { obtainChannelContext, addChannelContext, openChannelContext, channels, searchChannelContext} = useContext(ChatContext);

    const logout = async () => {
        await localStorage.removeItem('credentials');
        nav('/');
    }

    const addChannel = async (e) => {
        e.preventDefault(e);
        e.target.setCustomValidity("");
        if (e.target.channelName.length < 2) {
            e.target.setCustomValidity("You need to put at least 2 caracters to create a channel");
        }
        else {
        const channelPropierties = {
            title: e.target.elements.channelName.value,
            description: e.target.elements.channelDescription.value,
            idMember: session[0]._id,
            profilePhoto: session[0]?.photo?.url,
            memberEmail: session[0]?.email
        };
        await addChannelContext(channelPropierties);
        setNewChannelLayout(!newChannelLayout);
    }
    }

    const openChannel = async (e, channelId) => {
        e.preventDefault();
        await openChannelContext(channelId);
        seeMembersLayout(!seeMember);
    }

    const NewChannel = () => {
        return(
                <div className='form-channel'>
                    <p>New Channel</p>
                    <form onSubmit={(e) => addChannel(e)}>
                        <input type="text" name="channelName" placeholder='New channel'  minlength="1" maxLength="18" required></input>
                        <textarea type="text" name="channelDescription" placeholder='New channel' rows={5}></textarea>
                        <div className='addChannelBu d-flex'>
                            <button type="submit">Save</button>
                            <button onClick={() => setNewChannelLayout(!newChannelLayout)}>Cancel</button>
                        </div>
                    </form>
                </div>
        )
    }

    const a = async () => {
        seeMembersLayout(!seeMember);
        await obtainChannelContext();
    }

    const SeeMembers = () => { //ultimo hecho

        return(
            <nav className='nav decoration-white'>
                   <div className='addChannel flex'>
                       <button onClick={() => a()}>a ALL CHANNELS</button>
                   </div>
                   {channels.map((c) => <div key={c._id} className='groups text-left'>
                       <div className='ml-4'>{c.title.toUpperCase()}</div>
                       <div className='ml-4'>{c.description}</div>
                       <div>
                       <p>MEMBERS</p>
                       {channels[0].members.map((cm) => <li key={cm._id}  className='flex items-center'>
                           {cm.profilePhoto ? <img src={cm.profilePhoto} alt=""></img> : <img src={notUser} alt=""></img>}
                           <label>{cm.memberEmail}</label>
                       </li>)}
                       </div>
                   </div>)}
                   {session.map((s) =><div key={s._id} className='user-nav'>
                   {s.photo?.url ? <img src={s.photo.url} alt=""></img> : <img src={notUser} alt=""></img>}
                        <p>{s.name}</p>
                        <div id='logout'><button onClick={() => logout()}>- Logout</button></div>
                   </div>)}
               </nav>
        )
      
    }

    const searchChannel = async (e) => {
        e.preventDefault();
        const searching = {
            search: e.target.elements.search.value
        }
        await searchChannelContext(searching);
    }
    

    const SeeChannels = () => { //ultimo hecho
        return(
            <nav className='nav'>
                <div className='addChannel flex'>
                    <label>Channels</label>
                    <button className='text-lg bg-zinc-800' onClick={() => setNewChannelLayout(!newChannelLayout)}>+</button>
                </div>
                <div className='flex mt-6'>
                    <form onSubmit={(e) => searchChannel(e)}>
                        <input type="text" name="search" placeholder='Search channel' ></input>
                    </form>
                </div>
                <div className='groups'>
                    {channels.map((c) => <li key={c._id} className='flex'>
                        <button className='titleG bg-zinc-800'>{c.title.substr(0,2).toUpperCase()}</button>
                        <button className='w-full text-left' onClick={(e) => openChannel(e, c._id)}>{c.title}</button>
                    </li>)}
                </div>
                {session.map((s) =><div key={s._id} className='user-nav'>
                    {s.photo?.url ? <img src={s.photo.url} alt=""></img> : <img src={notUser} alt=""></img>}
                    <p>{s.name}</p>
                    <div id='logout'><button onClick={() => logout()}>- Logout</button></div>
                </div>)}
            </nav>
        )
    }

    return(
        <div className='chat-background'>
            <div className='flex justify-center items-center relative'>
                    <input id="openNav" type='checkbox' name="openNav"></input>
                    <label className='openNavLabel' htmlFor="openNav"><img src={menu} alt=""></img></label>
                    { seeMember ? <SeeMembers/> : <SeeChannels/> }
                    <ChatBody session={session[0]}/>
                    {newChannelLayout ? <NewChannel/> : ''}
            </div>
        </div>
    )
}

export default Nav;