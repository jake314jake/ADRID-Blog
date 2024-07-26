import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { FollowContext } from '../Context/FollowContext';
import Navbar from '../Components/Navbar';
import Followers from '../Components/Followers';
import ToFollow from '../Components/ToFollow';
const Home = () => {
  const { currentUser } = useContext(AuthContext);
  const { fetchFollowers } = useContext(FollowContext);
  const numberOfUsers="1"
  useEffect(() => {
    if (currentUser) {
      fetchFollowers(currentUser.user.username);
    }
  }, [currentUser]);

  return (
    <div className='home-container'>
      <Navbar />
      <div>Home</div>
       <Followers currentUser={currentUser} />
      <ToFollow currentUser={currentUser}  numberOfUsers={numberOfUsers}></ToFollow>
    </div>
  );
}

export default Home;
