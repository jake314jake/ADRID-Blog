import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { FollowContext } from '../Context/FollowContext';
import Navbar from '../Components/Navbar';
import Followers from '../Components/Followers';
import ToFollow from '../Components/ToFollow';
import Post from '../Components/Post';
import Upload from './Upload';
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
       <Upload currentUser={currentUser}></Upload>
       <Post currentUser={currentUser}></Post>
    </div>
  );
}

export default Home;
