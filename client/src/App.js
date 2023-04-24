import './App.css';
import DetailsEdit from './components/detailsEdit/detailsEdit';
import LoginRegister from './components/loginRegister/loginRegister';
import Navigation from './components/navigation/navigation';
import SignOut from './components/signOut/signOut';
import Nav from './components/chat/nav/nav';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserContextProvider } from './userContext/userContex';


function App() {

  return (
    <div className="App">
      <BrowserRouter>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<LoginRegister/>}></Route>
          <Route path="/details" element={<DetailsEdit/>}></Route>
          <Route path="/signOut" element={<SignOut/>}></Route> 
          <Route path="/chat" element={<Nav/>}></Route>
        </Routes>
      </UserContextProvider>
      </BrowserRouter>
    </div>
  );
}
//<Navigation/>
export default App;
