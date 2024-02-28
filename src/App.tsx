import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Table from './components/table';
import fetchData, { Student } from './service/Student'; 

const App: React.FC = () => {
  const [users, setUsers] = useState<Student[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersData = await fetchData();
      setUsers(usersData);
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <Navbar />
      <Table students={users} /> 
    </div>
  );
};

export default App;
