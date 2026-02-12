import React,{useState} from 'react';
import {useNavigate} from 'react-router-dom';
import '../../DisplayView.css';
import  {validateUser} from '../../Services/LoginService';

const LoginPage=()=>
{
  const navigate=useNavigate();
 const [errors,setErrors]=useState({});
 const [loginData,setLoginData]=useState({
    username:'',
    password:''
 });

 const onChangeHandler = (event) => 
 {
    event.persist();
    const name = event.target.name;
    const value = event.target.value;
    setLoginData(values => ({ ...values, [name]: value }));
 }

 return (
   <div>
     <h1>Login Page</h1>
     <form>
       <input 
         type="text" 
         name="username" 
         placeholder="Username"
         value={loginData.username}
         onChange={onChangeHandler}
       />
       <input 
         type="password" 
         name="password" 
         placeholder="Password"
         value={loginData.password}
         onChange={onChangeHandler}
       />
       <button type="submit">Login</button>
     </form>
   </div>
 );
};
export default LoginPage; 