import './chatBody.css';
import io from "socket.io-client";
import { useContext, useEffect} from 'react';
import ChatContext from '../../../chatContext/chatContext';
import notUser from '../../../img/notUser.jpg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const socket = io();


const ChatBody = () => {
   
    const {addMemberContext, sendMessageContext, memberData, messages, newMessages, setNewMessages} = useContext(ChatContext);
    let fecha = new Date();
    let day = ["Sunday", "Saturday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    let month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const addMember = async (e, channelId) => {
        e.preventDefault();
    
        const addMember = {
            channelId: channelId,
            memberEmail: e.target.elements.addMember.value,
        }

       const res = await addMemberContext(addMember);
            
       if(res > 0){
        toast.info('Member Added!!', {
            position: "top-right",
            autoClose: 500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
       }else{
        toast.warn('Member already exist!!', {
            position: "top-right",
            autoClose: 500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
       }
    }

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
        socket.emit('newMessage', newMessages, messageData);
        
    }
    useEffect(() => {
        socket.on('receiveMessage', (socketId, newMessages, messageData) => { 
            setNewMessages([...newMessages, messageData]);
        });
        // eslint-disable-next-line
    }, []);    

    return(
        <div className='chatBody w-full'>
            {messages.map((m) => <div key={m._id} className='group-title'>
                    <p>{m.title}</p>
                    {m.adminId === memberData[0]._id ? <form onSubmit={(e) => addMember(e, m._id)}>
                       <input name="addMember" type="email" placeholder=' '></input>
                    </form>: ''}
                </div>)}
                <div className='container-message'>     
                {newMessages.map((mm, i) => <div key={mm._id} className='message'> 
                        <div>
                            { mm.memberPhoto ? <img src={mm.memberPhoto} alt=""></img> : <img src={notUser} alt=""></img> }
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
                <ToastContainer 
                position="top-right"
                autoClose={500}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"/>
        </div>
    )
}

export default ChatBody;
