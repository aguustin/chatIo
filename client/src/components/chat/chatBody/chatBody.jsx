import './chatBody.css';
import io from "socket.io-client";
import { useContext, useState } from 'react';
import ChatContext from '../../../chatContext/chatContext';

const socket = io.connect('http://localhost:4000');

const ChatBody = () => {
    const {addMemberContext, sendMessageContext, memberData, messages, socketMessages, setSocketMessages} = useContext(ChatContext);
    let fecha = new Date();
    let day = ["Sunday", "Saturday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    let month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const [newMessages, setNewMessages] = useState([]);
    const addMember = async (e, channelId) => {
        e.preventDefault();
       
        const addMember = {
            channelId: channelId,
            memberEmail: e.target.elements.addMember.value,
        }
    
        await addMemberContext(addMember);
    }
    console.log("mm:", socketMessages);
    const sendMessage = async (e, id) => {
        e.preventDefault();
        const msj = e.target.elements.newMessage.value;
        const messageDate = `${day[fecha.getDay()]}, ${fecha.getDate()} ${month[fecha.getMonth()]} - ${fecha.getHours()}:${fecha.getMinutes()}`;
        const messageData = {
            id:id,
            memberPhoto: memberData[0].photo?.url,
            memberEmail: memberData[0].email,
            memberName: memberData[0].name,
            messageDate : messageDate,
            messageMember: msj
        };
        await sendMessageContext(messageData);
        e.target.reset();
        socket.emit('newMessage', messageData); //le saque el await
        socket.on('receiveMessage', (messageData) => { 
            console.log("o: ", newMessages);
            setNewMessages(...socketMessages, messageData);
        });
        
        return () => {
        socket.off('receiveMessage', (messageData) => { 
            console.log("o: ", newMessages);
            setNewMessages(...socketMessages, messageData);
        });   
        }
}

    return(
        <div className='w-full'>
            <div>
            {messages.map((m) => <div key={m._id} className='group-title'>
                    <p>{m.title}</p>
                    <form onSubmit={(e) => addMember(e, m._id)}>
                       <input name="addMember" type="email" placeholder=' '></input>
                    </form>
                </div>)}
                <div className='container-message'>
                    {socketMessages.map((mm) => {
                     return mm.memberEmail !== memberData.email ? (<div className='message'> 
                        <div>
                            <img src={mm.memberPhoto} alt=""></img>
                        </div>
                        <div className='message-info'>
                            <li className='flex'>
                                <p>{mm.memberName}</p>
                                <p>{mm.messageDate}</p>
                            </li>
                            <p>{mm.messageMember}</p>
                        </div>
                    </div>) : (
                     <div className='message-session'> 
                        <div>
                            <img src={mm.memberPhoto} alt=""></img>
                        </div>
                        <div className='message-info-session'>
                            <li className='flex'>
                                <p>{mm.memberName}</p>
                                <p>{mm.messageDate}</p>
                            </li>
                            <p>{mm.messageMember}</p>
                        </div>
                    </div>)} )}
                </div>
                {messages.map((m) => <div key={m._id} className='writeMessage'>
                    <form onSubmit={(e) => sendMessage(e, m._id)}>
                        <input name="newMessage" type="text" placeholder='Tape a new message'></input>
                    </form>
                </div>)}
            </div>
        </div>
    )
}

export default ChatBody;
