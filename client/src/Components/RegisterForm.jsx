import React from 'react';
import { useForm } from 'react-hook-form';
import {  Link } from 'react-router-dom';
const RegisterForm = ({ handleRegister }) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => handleRegister(data);

  const password = watch('password');

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input
          type="text"
          {...register('username', { required: 'Username is required' })}
          placeholder="Username"
        />
        {errors.username && <span className="spanerror">{errors.username.message}</span >}
      </div>
      <div>
        <input
          type="email"
          {...register('email', { required: 'Email is required' })}
          placeholder="Email"
        />
        {errors.email && <span className="spanerror">{errors.email.message}</span >}
      </div>
      <div>
        <input
          type="password"
          {...register('password', { required: 'Password is required' })}
          placeholder="Password"
        />
        {errors.password && <span className="spanerror">{errors.password.message}</span >}
      </div>
      <div>
        <input
          type="password"
          {...register('confirmPassword', {
            required: 'Confirm Password is required',
            validate: value =>
              value === password || 'Passwords do not match'
          })}
          placeholder="Confirm Password"
        />
        {errors.confirmPassword && <span className="spanerror">{errors.confirmPassword.message}</span >}
      </div>
      <div>
        <input
          type="date"
          {...register('dateOfBirth', { required: 'Date of Birth is required' })}
        />
        {errors.dateOfBirth && <span className="spanerror">{errors.dateOfBirth.message}</span >}
      </div>
      <div>
        <label>
          <input
            type="radio"
            {...register('gender', { required: 'Gender is required' })}
            value="male"
          />
          Male
        </label>
        <label>
          <input
            type="radio"
            {...register('gender', { required: 'Gender is required' })}
            value="female"
          />
          Female
        </label>
        {errors.gender && <span className="spanerror">{errors.gender.message}</span >}
      </div>
      <button type="submit">Register</button>
      <span>
        Already have an account? <Link to="/Login">Login</Link>
      </span>
    </form>
  );
};

export default RegisterForm;
