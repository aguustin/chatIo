import './chatBody.css';
import io from "socket.io-client";
import { useContext } from 'react';
import ChatContext from '../../../chatContext/chatContext';

const socket = io('http://localhost:4000');

const ChatBody = (session) => {
    const {messages, setMessage} = useContext(ChatContext);

    const addMember = async (e) => {
        const addMember = e.target.elements.addMember.value;
    }

    const sendMessage = async (e) => {
        e.preventDefault();
        const msj = e.target.elements.newMessage.value;
        socket.emit("newMessage", msj);
        setMessage([...messages, msj]);
    }

    return(
        <div className='w-full'>
            {messages.map((m) => <div key={m._id} >
                <div className='group-title'>
                    <p>{m.title}</p>
                    <form onSubmit={(e) => addMember(e)}>
                       <input name="addMember" placeholder=' '></input>
                    </form>
                </div>
                <div className='container-message'>
                    {messages[0].message.map((mm) => <div key={mm._id} className='message'>
                        <div>
                            <img src={mm.memberPhoto} alt=""></img>
                        </div>
                        <div className='message-info'>
                            <li className='flex'>
                                <p>{mm.memberName}</p>
                                <p>january at 22:32 AM</p>
                            </li>
                            <p>{mm.messageMember}</p>
                        </div>
                    </div>)}
                </div>
                <div className='writeMessage'>
                    <form onSubmit={(e) => sendMessage(e)}>
                        <input name="newMessage" placeholder='Tape a new message'></input>
                    </form>
                </div>
            </div>)}
        </div>
    )
}

export default ChatBody;

/* {messages.message.map((mm) => <div key={mm._id} className='message'>
                        <div>
                            <img src={mm.memberPhoto} alt=""></img>
                        </div>
                        <div className='message-info'>
                            <li className='flex'>
                                <p>{mm.memberName}</p>
                                <p>january at 22:32 AM</p>
                            </li>
                            <p>{mm.memberMessage}</p>
                        </div>
                    </div>)}*/