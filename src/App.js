import React, {useState} from 'react';
import Form from './components/Form';
import TeamMembers from './components/TeamMembers';
import './App.css';

function App() {
  const [teamMembers, setTeamMembers] = useState([]);

  const updateTeam = (users) => {
    // const newTeamList = [...users];
    console.log('update team for display')
    setTeamMembers(users);
  }

  return (
    <div className="App container">
      <img className='schoolLogo' src="https://assets-global.website-files.com/5cd091cfb5499f22bdf72905/5dcda59e63bb6ae5c9282801_small-red-logo.png" alt="logo"/>
      <h1>Build Week Teams</h1>
      <h2>Sign Up</h2>
      <Form updateTeam={updateTeam}/>
      <TeamMembers team={teamMembers} />
    </div>
  );
}

export default App;
