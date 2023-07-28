import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddUser from 'pages/AddUser';
import Home from 'pages/home/Home';
// import EditUser from 'pages/EditUser';

function App() {
  

  return (
    <Router>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/add-user" element={<AddUser />} />
        {/* <Route path="/edit-user/:id" element={<EditUser />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
