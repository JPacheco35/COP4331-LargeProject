import React from 'react';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';

function SignupForm() {
	
	// The Form Values 
	const [firstname, setFirstName] = React.useState("");
	const [lastname, setLastName] = React.useState("");
	const [email, setEmail] = React.useState("");
	const [username, setUsername] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [passwordCheck, setPasswordCheck] = React.useState("")

	// The Password Type
	const [passwordType, setPasswordType] = React.useState("passwordType");

	// Update the Values Functions
	const onFirstNameChange = (e) => { setFirstName(e.target.value); };
	const onLastNameChange = (e) => { setLastName(e.target.value); };
	const onEmailChange = (e) => { setEmail(e.target.value); };
	const onUsernameChange = (e) => { setUsername(e.target.value);};
	const onPasswordChange = (e) => { setPassword(e.target.value); };
	const onPasswordCheckChange = (e) => { setPasswordCheck(e.target.value); };

	// Toggle Between Show/Hide Password
	const toggle = () => 
	{
	  if (passwordType === "passwordType") {
		setPasswordType("text");
		return;
	  }

	  setPasswordType("passwordType");	  
	};

	// This function is called when the user hits the submit button
	const handleSubmit = (e) =>  {

		// Prevents the page from reloading on button click
		e.preventDefault();

		// Verify that the passwords match each other
		if (password != passwordCheck)
		{
			alert ("Passwords do not match.");
			return;
		}

		// DEBUG: Log all form values
		console.log("firstname = " + firstname);
		console.log("lastname = " + lastname);
		console.log("email = " + email);
		console.log("username = " + username);
		console.log("password = " + password);
		console.log("passwordCheck = " + passwordCheck);



		// JSON to be passed for CHECKUSERNAME
		var jsonData = { username: username };

		// Runs /login route in the Express Server --> Checks if username is taken
		fetch("http://192.241.132.66:5000/record/checkUsername", 
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(jsonData)
		})
		.then(response => response.json())
		.then(data => 
		{
			// Grab the Result
			//console.log(data); // logs the JSON data received from the Express server
			var res = JSON.parse(JSON.stringify(data)).exists;

			// Username is taken
			if(res == "True")
			{
				alert("Username is already taken");
				return;
			}

			// Username is not taken --> continue with registration
			else 
			{
				// JSON to be passed for SIGNUP
				jsonData = 
				{
					firstname: firstname,
					lastname: lastname,
					email: email,
					username: username,
					password: password,
				};

				// Runs /sign route in the Express Server
				fetch("http://192.241.132.66:5000/record/signup", 
				{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(jsonData)
				})
				.then(data =>
				{
					//console.log(data);
					//console.log("reached the end of the request");

					// Send the user to the logged in page
					window.location = '/main';
				})  
			}
		})


	}
	
	return (
        <Form onSubmit = {handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicFname">
            <Form.Label className="text-center"> First Name </Form.Label>
            <Form.Control 
			type={firstname} placeholder="Enter First Name" onChange = {onFirstNameChange} required/>
			<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>


          <Form.Group className="mb-3" controlId="formBasicLname">
            <Form.Label className="text-center">
              Last Name
            </Form.Label>
            <Form.Control type={lastname} placeholder="Enter Last Name" onChange = {onLastNameChange} required />
          </Form.Group>


          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="text-center">
              Email Address
            </Form.Label>
            <Form.Control type = "email" value = {email} placeholder="Enter Email" onChange = {onEmailChange} required/>
          </Form.Group>


          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label className="text-center">
              Username
            </Form.Label>
            <Form.Control type="username" value = {username} placeholder="Enter Username" onChange = {onUsernameChange} required/>
          </Form.Group>

		  <Form.Label className="text-center">
              Type Password
        	</Form.Label>

		  <div className="input-group">
				<input
				type={passwordType}
				onChange={onPasswordChange}
				value={password}
				placeholder="Enter Password"
				name="passwordType"
				className="form-control"
				required
				/>

				<button className="btn btn-primary" type = "button" onClick={toggle}>
				{passwordType === "passwordType" ? (
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
				{passwordType === "passwordType" ? (
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
			<Button variant="primary" type="submit">
				Sign Up
			</Button>

        </Form>  
	);
}

export default SignupForm;