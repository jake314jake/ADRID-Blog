import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext'
import UserAvatar from './UserAvatar'
const Navbar = () => {
    const {currentUser,logout}=useContext(AuthContext)
  return (
    <div className='nav-container'>
        <div className='left-container'>
            <UserAvatar userName={currentUser?currentUser.user.username:null}></UserAvatar>
            
        </div>
        <div className='right-container'>
            <Link href="/">Home</Link>
            <Link href="">About</Link>
            {currentUser ? <Link to="/Login" onClick={logout}> Logout</Link> :<Link to="/Login"  >Login</Link>}
            
        </div>

    </div>
  )
}

export default Navbar