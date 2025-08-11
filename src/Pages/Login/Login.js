import React, { useState } from "react";
import { 
   withRouter } from "react-router-dom";
import styles from "./Login.module.css";

import { useForm } from "react-hook-form";
import config from "../../config";

const Login = (props) => {
  // const {history} = props;
  const { register, handleSubmit, errors } = useForm();
  const [message, setMessage] = useState();

  const login = async (data, e) => {
    try {
      const response = await fetch(`${config.baseUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      
      const responseData = await response.json();
      
      if (response.ok && responseData.success) {
        setMessage({
          data: responseData.message || "Login successful",
          type: "alert-success",
        });
        
        // Store token and redirect on successful login
        setTimeout(() => {
          localStorage.setItem("token", responseData.data.token);
          window.location.href = "/";
        }, 1500);
      } else {
        setMessage({
          data: responseData.message || "Login failed",
          type: "alert-danger",
        });
        
        // Reset form on failed login
        e.target.reset();
      }
    } catch (error) {
      setMessage({
        data: "An error occurred during login",
        type: "alert-danger",
      });
      console.error("Login error:", error);
    }
  }
  
  const onSubmit = (data, e) => {
    setMessage({
      data: "Login is in progress...",
      type: "alert-warning",
    });
    
    login(data,e);
  };

  return (
    <div
      className={`${styles.container} container-fluid d-flex align-items-center justify-content-end`}
    >
      <div className={`${styles.loginFormContainer} py-5 px-5 rounded`}>
        <div className={`${styles.theLogo}`}></div>
        {message && (
          <div
            className={`alert fade show d-flex ${message.type}`}
            role="alert"
          >
            {message.data}
            <span
              aria-hidden="true"
              className="ml-auto cursor-pointer"
              onClick={() => setMessage(null)}
            >
              &times;
            </span>
          </div>
        )}
        <fieldset className="border border-primary p-3 rounded">
          {/* <legend
            className={`${styles.loginFormLegend} border rounded p-1 text-center text-primary`}
          >
            Sign In
          </legend> */}
          <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
            <div className="form-group text-primary">
              <label htmlFor="inputForEmail">Email address</label>
              <span className="mandatory">*</span>
              <input
                id="inputForEmail"
                name="email"
                type="email"
                className="form-control"
                aria-describedby="Enter email address"
                placeholder="Enter email address"
                ref={register({
                  required: {
                    value: true,
                    message: "Please enter your email address",
                  },
                })}
              />
              
              {errors.email && (
                <span className={`${styles.errorMessage} mandatory`}>
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className="form-group text-primary">
              <label htmlFor="inputForPassword">Password</label>
              <span className="mandatory">*</span>
              <input
                type="password"
                name="password"
                className="form-control"
                id="inputForPassword"
                placeholder="Enter password"
                ref={register({
                  required: {
                    value: true,
                    message: "Please enter password",
                  },
                })}
              />
              {errors.password && (
                <span className={`${styles.errorMessage} mandatory`}>
                  {errors.password.message}
                </span>
              )}
            </div>
            <div className="d-flex align-items-center justify-content-center">
              <button type="submit" className="btn btn-block btn-primary">
                Login
              </button>

              {/* <button className="btn btn-link ml-auto">
                <Link to="/register">New User</Link>
              </button> */}
            </div>
          </form>
        </fieldset>
      </div>
    </div>
  );
};

export default withRouter(Login);