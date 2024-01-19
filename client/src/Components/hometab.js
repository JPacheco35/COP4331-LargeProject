import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import LoginForm from './Forms/loginform';
import SignupForm from './Forms/signupform';
import React, { useEffect, useState } from 'react';

function HomeTab() {
  return (
    <Tabs
      defaultActiveKey="login"
      id="fill-tab-example"
      className="mb-3"
      fill
    >

      <Tab eventKey="login" title="Login">
        <LoginForm/>

        {/*
        <div className="mt-3">
          <p className="mb-0  text-center">
            Don't have an account?{" "}
            <a  href="{''}" className="text-primary fw-bold">
              Sign Up
            </a>
          </p>
        </div>
         */}

      </Tab>

      
      <Tab eventKey="signup" title="Sign Up">
        <SignupForm/>

         {/*
        <div className="mt-3">
          <p className="mb-0  text-center">
            Already Have an Account?{" "}
            <a href="{''}" className="text-primary fw-bold">
              Login
            </a>
          </p>
        </div>
        */}

      </Tab>
    </Tabs>
  );
}

export default HomeTab;