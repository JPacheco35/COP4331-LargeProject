import React, { useEffect, useState } from 'react';

// Import Toasts
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

// Import Bootstrap
import 'bootstrap/dist/css/bootstrap.css';
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import {Link, useNavigate} from 'react-router-dom';

import axios from "axios";
import { FormControl } from 'react-bootstrap';

function SignupForm() {
	
	// The Form Values 
	const [passwordCheck, setPasswordCheck] = React.useState("")

	// This holds the form's input values
	const [data,setData] = useState
	({
		firstname: "",
		lastname: "",
		email: "",
		username: "",
		password: "",
	})

	const navigate = useNavigate()
	const [error, setError] = useState("");

	// Update the form's values when a change is detected
	const handleChange = ({ currentTarget: input}) => { setData({...data,[input.name]:input.value}); }

	// The Password Type
	const [passwordType, setPasswordType] = React.useState("password");

	// Update the Values Functions
	const onPasswordCheckChange = (e) => { setPasswordCheck(e.target.value); };

	// Toggle Between Show/Hide Password Function
	const toggle = () => 
	{
	  if (passwordType === "password") {
		setPasswordType("text");
		return;
	  }

	  setPasswordType("password");	  
	};

	const giveErrorNotification = (errorMsg) =>
	{
		toast.error(errorMsg, {
			position: toast.POSITION.TOP_CENTER,
			autoClose: 1000
		});

	}

	// This function is called when the user hits the submit button
	const handleSubmit = async(e) =>  {

		// Prevents the page from reloading on button click
		e.preventDefault();

		// Verify that the passwords match each other
		if (data.password != passwordCheck)
		{
			// Pop Error Message
			giveErrorNotification("Passwords Do Not Match")
			return;
		}

		try {
			const url = "http://192.241.132.66:5000/signup";
			const {data: res} = await axios.post(url,data)
			localStorage.setItem("token",res.data);
			navigate("/main")

			console.log("Message: " + res.message);
			console.log("JWT Token: " + res.data);

		} catch (error) 
		{
			switch (error.response.status)
			{
				case 409:
					giveErrorNotification("Username is Already Taken");
					break;

				case 500:
					giveErrorNotification("Server Error: Try Again Later")	
					break;

				case 404:
					giveErrorNotification("Server Not Found: Try Again Later")
					break;
				
				default:
					break;	
			}
		}
	}
	
	return (
        <Form onSubmit = {handleSubmit} id = 'signupform'>
          <Form.Group className="mb-3" controlId="formBasicFname">
            <Form.Label className="text-center"> First Name </Form.Label>
            <Form.Control type="text" required value = {data.firstname} name = "firstname" placeholder="Enter First Name" onChange = {handleChange}></Form.Control>
          </Form.Group>


          <Form.Group className="mb-3" controlId="formBasicLname">
            <Form.Label className="text-center">
              Last Name
            </Form.Label>
            <Form.Control type="text" value = {data.lastname} name = "lastname" placeholder="Enter Last Name" onChange = {handleChange} required />
          </Form.Group>


          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="text-center">
              Email Address
            </Form.Label>
            <Form.Control type="email" value = {data.email} name = "email" placeholder="Enter Email" onChange = {handleChange} required/>
          </Form.Group>


          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label className="text-center">
              Username
            </Form.Label>
            <Form.Control type="text" value = {data.username} name = "username" placeholder="Enter Username" onChange = {handleChange} required/>
          </Form.Group>

		  <Form.Label className="text-center">
              Type Password
        	</Form.Label>

		  <div className="input-group">
				<input
				type={passwordType}
				onChange={handleChange}
				value={data.password}
				placeholder="Enter Password"
				name="password"
				className="form-control"
				required
				/>

				<button className="btn btn-primary" type = "button" onClick={toggle}>
				{passwordType === "password" ? (
					<svg
					width="20"
					height="17"
					fill="currentColor"
					className="bi bi-eye-slash-fill"
					viewBox="0 0 16 16"
					>
					<path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
					<path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z" />
					</svg>
				) : (
					<svg
					width="20"
					height="17"
					fill="currentColor"
					className="bi bi-eye-fill"
					viewBox="0 0 16 16"
					>
					<path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
					<path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
					</svg>
				)}
				</button>
			</div>

			<br></br>

			<Form.Label className="text-center">
              Re-Type Password
            </Form.Label>

		   <div className="input-group">
				<input
				type={passwordType}
				placeholder="Re-Type Password"
				name="passwordType"
				className="form-control"
				value = {passwordCheck}
				onChange = {onPasswordCheckChange}
				required
				/>
				<button className="btn btn-primary" type = "button" onClick={toggle}>
				{passwordType === "password" ? (
					<svg
					width="20"
					height="17"
					fill="currentColor"
					className="bi bi-eye-slash-fill"
					viewBox="0 0 16 16"
					>
					<path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
					<path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z" />
					</svg>
				) : (
					<svg
					width="20"
					height="17"
					fill="currentColor"
					className="bi bi-eye-fill"
					viewBox="0 0 16 16"
					>
					<path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
					<path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
					</svg>
				)}
				</button>
		    </div>
			
			<Button variant="primary" type = "submit">
				Sign Up
			</Button>

			<ToastContainer />

        </Form>  
	);
}

export default SignupForm;