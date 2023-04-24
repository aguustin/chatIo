import './chatBody.css';
import io from "socket.io-client";
import prueba from "../../../img/prueba.jpg";

const ChatBody = () => {
    return(
        <div className='w-full'>
            <div className='group-title'>
                <p>FRONT-END DEVELOPERS</p>
            </div>
            <div className='container-message'>
                <div className='message'>
                    <div>
                        <img src={prueba} alt=""></img>
                    </div>
                    <div className='message-info'>
                        <li className='flex'>
                            <p>username and lastname</p>
                            <p>january at 22:32 AM</p>
                        </li>
                        <p> Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                             Ullam laboriosam voluptatibus minus id impedit cum in, inventore quidem unde aut nostrum illum 
                             repellendus culpa explicabo quia expedita eveniet dolor ipsa.
                         </p>
                    </div>
                </div>
            </div>
            <div className='writeMessage'>
                <input name="newMessage" placeholder='Tape a new message'></input>
            </div>
        </div>
    )
}

export default ChatBody;