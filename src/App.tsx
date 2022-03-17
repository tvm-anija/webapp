import React from 'react';
import './App.css';
import AdminAccess  from "../src/components/RoleManager"
//import AdminApp from "../src/components/admin"

function App() {
  return (
    <div className="App">
      <div className="container">
        {/* <AdminApp/> */}
          <AdminAccess />
        </div>
    </div>
  );
}

export default App;
