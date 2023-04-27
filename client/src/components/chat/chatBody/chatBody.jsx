import './chatBody.css';
import io from "socket.io-client";
import { useContext, useEffect } from 'react';
import ChatContext from '../../../chatContext/chatContext';

const socket = io('http://localhost:4000');

const ChatBody = () => {
    const {addMemberContext, sendMessageContext, memberData, messages, setMessage} = useContext(ChatContext);

    useEffect(() => { //ultimo hecho
        socket.on('newMessage', msj => console.log(msj));

        return () => {
        socket.off('newMessage', msj => console.log(msj));
        }
    })
    
    const addMember = async (e, channelId) => {
        e.preventDefault();
       
        const addMember = {
            channelId: channelId,
            memberEmail: e.target.elements.addMember.value,
        }
    
        await addMemberContext(addMember);
    }

    const sendMessage = async (e, id) => {
        e.preventDefault();
        const msj = e.target.elements.newMessage.value;
        const messageData = {
            id:id,
            memberPhoto: memberData[0].photo.url,
            memberName: memberData[0].name,
            memberMessage: msj
        };
        await sendMessageContext(messageData);
        socket.emit("newMessage", msj);
        //setMessage([...messages, msj]);
    }

    return(
        <div className='w-full'>
            {messages.map((m) => <div key={m._id} >
                <div className='group-title'>
                    <p>{m.title}</p>
                    <form onSubmit={(e) => addMember(e, m._id)}>
                       <input name="addMember" type="email" placeholder=' '></input>
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
                    <form onSubmit={(e) => sendMessage(e, m._id)}>
                        <input name="newMessage" type="text" placeholder='Tape a new message'></input>
                    </form>
                </div>
            </div>)}
        </div>
    )
}

export default ChatBody;