import './nav.css';
import ChatBody from '../chatBody/chatBody';
import { useContext, useState } from 'react';
import ChatContext from '../../../chatContext/chatContext';
import UserContext from '../../../userContext/userContex';
import menu from '../../../img/menu.png';
import meetmePng from '../../../img/meetme.png'
import notUser from '../../../img/notUser.jpg';
import { useNavigate } from "react-router-dom";

const Nav = () => {
    const nav = useNavigate();
    const [newChannelLayout, setNewChannelLayout] = useState(false);
    const { session } = useContext(UserContext);
    const [seeMember, seeMembersLayout] = useState(false);
    const { obtainChannelContext, addChannelContext, openChannelContext, channels, searchChannelContext } = useContext(ChatContext);

    const logout = async () => {
        await localStorage.removeItem('credentials');
        nav('/');
    }

    const addChannel = async (e) => {
        e.preventDefault(e);
       // e.target.setCustomValidity("");

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

    const openChannel = async (e, channelId) => {
        e.preventDefault();
        await openChannelContext(channelId);
        seeMembersLayout(!seeMember);
    }

    const NewChannel = () => {
        return (
            <div className='form-channel'>
                <p>New Channel</p>
                <form onSubmit={(e) => addChannel(e)}>
                    <input type="text" name="channelName" placeholder='New channel' minlength="1" maxLength="18" required></input>
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

        return (
            <nav className='nav w-[480px] p-6 h-screen relative'>
                <div className='addChannel relative justify-between flex items-center pb-5'>
                    <div className='flex items-center'>
                        <img src={meetmePng} alt=""></img>
                        <p className='ml-3 text-2xl'>ChatIo</p>
                    </div>
                </div>
                {channels.map((c) => <div key={c._id} className='groups text-left'>
                    <div className='mt-3'>{c.title.toUpperCase()}</div>
                    <div className='mt-2'>Description: {c.description}</div>
                    <div className='mt-6'>
                        <p>MEMBERS</p>
                        {channels[0].members.map((cm) => 
                        <li key={cm._id} className='flex items-center mt-4'>
                            {cm.profilePhoto ? <img  className='members w-[80px]' src={cm.profilePhoto} alt=""></img> : <img className='members w-[80px]' src={notUser} alt=""></img>}
                            <label className='ml-2'>{cm.memberEmail}</label>
                        </li>)}
                    </div>
                </div>)}
                {session.map((s) => <div key={s._id} className='user-nav absolute bottom-6 flex items-center'>
                    {s.photo?.url ? 
                    <img className='w-[80px] rounded-2xl' src={s.photo.url} alt=""></img> : <img className='w-[80px] rounded-2xl' src={notUser} alt=""></img>}
                    <p className='ml-3 text-xl'>{s.name}</p>
                    <div className='p-2 ml-5 rounded-lg' id='logout'><button onClick={() => logout()}>Logout</button></div>
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
        return (
            <nav className='nav w-[480px] p-6 h-screen relative'>
                <div className='addChannel relative justify-between flex items-center pb-5'>
                    <div className='flex items-center'>
                        <img src={meetmePng} alt=""></img>
                        <p className='ml-3 text-2xl'>ChatIo</p>
                    </div>
                    <button className='text-lg p-3 bg-zinc-800' onClick={() => setNewChannelLayout(!newChannelLayout)}>+</button>
                </div>
                <div className='flex mt-6'>
                    <form onSubmit={(e) => searchChannel(e)}>
                        <input className='bg-zinc-900 pl-2 pt-2 pb-2 w-[250px] rounded-lg text-lg' type="text" name="search" placeholder='Search channel' ></input>
                    </form>
                </div>
                <div className='groups text-left mt-6'>
                    <label className='text-lg'>Channels</label>
                    {channels.map((c) => 
                    <li key={c._id} className='flex mt-6'>
                        <button className='titleG p-3 ml-3 rounded-lg'>{c.title.substr(0, 2).toUpperCase()}</button>
                        <button className='full-title w-full text-left text-lg ml-3' onClick={(e) => openChannel(e, c._id)}>{c.title}</button>
                    </li>)}
                </div>
                {session.map((s) => <div key={s._id} className='user-nav absolute bottom-6 flex items-center'>
                    {s.photo?.url ? <img className='w-[80px] rounded-2xl' src={s.photo.url} alt=""></img> : <img className='w-[80px] rounded-2xl' src={notUser} alt=""></img>}
                    <p className='ml-3 text-xl'>{s.name}</p>
                    <div className='p-2 ml-5 rounded-lg' id='logout'><button onClick={() => logout()}>Logout</button></div>
                </div>)}
            </nav>
        )
    }

    return (
        <div className='chat-background w-[96vw] h-full'>
            <div className='flex justify-center items-center relative'>
                <input id="openNav" type='checkbox' name="openNav"></input>
                {/*<label className='openNavLabel' htmlFor="openNav"><img src={menu} alt=""></img></label>*/ }
                {seeMember ? <SeeMembers /> : <SeeChannels />}
                <ChatBody session={session[0]} />
                {newChannelLayout ? <NewChannel /> : ''}
            </div>
        </div>
    )
}

export default Nav;