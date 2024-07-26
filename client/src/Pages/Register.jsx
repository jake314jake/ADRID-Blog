import React, { useContext } from 'react';
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';
import RegisterForm from '../Components/RegisterForm';
import { AuthContext } from '../Context/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  
  const {register}=useContext(AuthContext)
  const handleRegister = async (formData) => {
    try {
      const isRegistered = await register( formData);
       if(isRegistered)  navigate("/Login");
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="boxs">
      <h1>Register</h1>
      <RegisterForm handleRegister={handleRegister} />
    </div>
  );
};

export default Register;
