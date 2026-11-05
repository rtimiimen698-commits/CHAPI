import './App.css';
import AddContact from './Components/AddContact';
import ContactsList from './Components/ContactsList';
import EditContact from './Components/EditContact';
import Home from './Components/Home';
import NavContacts from './Components/NavContacts';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div>
      <NavContacts/>

      <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/ContactsList' element={<ContactsList/>} />
          <Route path='/AddContact' element={<AddContact/>} />
          <Route path='/EditContact/:id' element={<EditContact/>}/>
      </Routes>
    </div>
  );
}

export default App;
