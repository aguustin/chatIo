import './chatBody.css';
import io from "socket.io-client";
import { useContext } from 'react';
import ChatContext from '../../../chatContext/chatContext';

const socket = io.connect('http://localhost:4000');

const ChatBody = () => {
    const {addMemberContext, sendMessageContext, memberData, messages, socketMessages, setSocketMessages} = useContext(ChatContext);
    let fecha = new Date();
    let day = ["Sunday", "Saturday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    let month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    const addMember = async (e, channelId) => {
        e.preventDefault();
       
        const addMember = {
            channelId: channelId,
            memberEmail: e.target.elements.addMember.value,
        }
    
        await addMemberContext(addMember);
    }
    //console.log("mm:", socketMessages);
    const sendMessage = async (e, id) => {
        e.preventDefault();
        const msj = e.target.elements.newMessage.value;
        const messageDate = `${day[fecha.getDay()]}, ${fecha.getDate()} ${month[fecha.getMonth()]} - ${fecha.getHours()}:${fecha.getMinutes()}`;
        const messageData = {
            id:id,
            memberPhoto: memberData[0].photo?.url,
            memberName: memberData[0].name,
            messageDate : messageDate,
            messageMember: msj
        };
        await sendMessageContext(messageData);
        e.target.reset();
        await socket.emit('newMessage', messageData);
        socket.on('receiveMessage', (messageData) => { 
            //console.log("o: ", socketMessages);
            setSocketMessages([...socketMessages, messageData]);
        });
        console.log("mess: ", messages);
        return () => {
        socket.off('receiveMessage', (messageData) => { 
            setSocketMessages([...socketMessages, messageData]);
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
                    {socketMessages.map((mm) => <div className='message'>
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
                    </div>)}
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

/*import './chatBody.css';
import io from "socket.io-client";
import { useContext } from 'react';
import ChatContext from '../../../chatContext/chatContext';

const socket = io('http://localhost:4000');

const ChatBody = () => {
    const {addMemberContext, sendMessageContext, memberData, messages, setMessage, socketMessages, setSocketMessages} = useContext(ChatContext);
    let fecha = new Date();
    let day = ["Sunday", "Saturday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    let month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
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
        const messageDate = `${day[fecha.getDay()]}, ${fecha.getDate()} ${month[fecha.getMonth()]} - ${fecha.getHours()}:${fecha.getMinutes()}`;
        const messageData = {
            _id: id,
            memberPhoto: memberData[0].photo.url,
            memberName: memberData[0].name,
            messageDate : messageDate,
            messageMember: msj
        };
         await sendMessageContext(messageData);  
        console.log("aaa: ",messages);
        console.log("bvvv: ",socketMessages);
        e.target.reset();
        socket.emit('newMessage', messageData);
        
        socket.on('receiveMessage', (messageData) => { //ultimo hecho
            setSocketMessages([...socketMessages, messageData]);
        });
        
        return () => {
        socket.off('receiveMessage', (messageData) => { //ultimo hecho
            setSocketMessages([...socketMessages, messageData]);
        });
       
    }
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
                    {socketMessages.map((mm) => <div key={mm._id} className='message'>
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
                    </div>)}
                </div>
                <div className='writeMessage'>
                    <form id="sendText" onSubmit={(e) => sendMessage(e, m._id)}>
                        <input name="newMessage" type="text" placeholder='Tape a new message'></input>
                    </form>
                </div>
            </div>)}
        </div>
    )
}

export default ChatBody;*/