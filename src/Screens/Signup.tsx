import React, { useState } from 'react';
import { fbSignup } from '../config/firebasemethids';
import BAInput from '../Components/BAInput';
import BARadioButton from '../Components/BARadioButton';
import BAButton from '../Components/BAButton';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate()
  const [model, setModel] = useState({
    userName: '',
    email: '',
    password: '',
    role: '',
    fullName: '',
  });

  const InputChange = (field: any, value: any) => {
    setModel({ ...model, [field]: value });
  };

  const RoleChange = (role: any) => {
    setModel({ ...model, role });
  };

  let signUpUser = () => {
    console.log(model);
    fbSignup(model)
      .then((res) => {
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };



  const containerStyle = {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: 'fit-content',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  };




  return (
    <div className="bg-gradient-to-r from-green-400 to-blue-500 bg-center  h-screen  flex justify-center items-center" style={containerStyle} >
      <div className="w-[500px] bg-[rgba(255,255,255,.2)] p-10 rounded-lg  m-5 drop-shadow-2xl"  >
        <div className="py-2">
          <h1 className="text-4xl tracking-wide  font-medium text-dark  text-center">Sign Up</h1>
        </div>
        <div className="py-3">
          <BAInput
            value={model.userName}
            onChange={(e: any) => InputChange('userName', e.target.value)}
            label="User Name"
          />
        </div>
        <div className="py-3">
          <BAInput
            value={model.fullName}
            onChange={(e: any) => InputChange('fullName', e.target.value)}
            label="Full Name"
          />
        </div>
        <div className="py-3">
          <BAInput
            value={model.email}
            onChange={(e: any) => InputChange('email', e.target.value)}
            label="Email"
          />
        </div>
        <div className="py-3">
          <BAInput
            value={model.password}
            onChange={(e: any) => InputChange('password', e.target.value)}
            label="Password"
          />
        </div>
        <div className="py-2">
          <h3>Role:</h3>
          <BARadioButton
            label="User"
            name="role"
            value="User"
            checked={model.role === 'User'}
            onChange={() => RoleChange('User')}
          />
          <BARadioButton
            label="Admin"
            name="role"
            value="Admin"
            checked={model.role === 'Admin'}
            onChange={() => RoleChange('Admin')}
          />
        </div>

        <div className="py-3">
          <BAButton onClick={signUpUser} label="Sign Up" />
          <div style={{ float: 'right' }}>
            <p className=" py-2">Have an account <Link className="p-3  text-light" to="/login">Log in</Link> </p>

          </div>
        </div>
      </div>
    </div>
  );
}

;



