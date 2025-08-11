import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import styles from './Register.module.css';
import config from "../../config";
const Register = () => {
    const { register, handleSubmit, errors } = useForm();
    const [message, setMessage] = useState();
    const onSubmit = (data, e) => {
        setMessage({
          data: "Registration is in progress...",
          type: "alert-warning",
        });
        fetch(`${config.baseUrl}/user/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((res) => res.json())
          .then((data) => {
            const hasError = "error" in data && data.error != null;
            setMessage({
              data: hasError ? data.error : "Registered successfully",
              type: hasError ? "alert-danger" : "alert-success",
            });
             !hasError && e.target.reset();
          });
      };


   return <div className={`${styles.container} container-fluid d-flex align-items-center bg-dark  justify-content-center`}>
        <div className={'row mt-5'}>
            <div className="col-md-12 bg-light py-5 px-5 rounded">
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
                 <legend className={`border  rounded p-1 text-center text-white bg-primary `} >
                        Registration Form
                 </legend>
                    <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">

                <div className="form-group">
                    <label htmlFor="inputForName">Your Name</label>
                    <span className="mandatory">*</span>
                    <input
                    id="inputForName"
                    type="text"
                    name="name"
                    className="form-control"
                    aria-describedby="Enter your name"
                    placeholder="Enter your name"
                    ref={register({
                        required: {
                          value: true,
                          message: "Please enter your name",
                        },
                        minLength: {
                          value: 4,
                          message: "Minimum 4 characters are allowed",
                        },
                        maxLength: {
                          value: 20,
                          message: "Maximum 20 characters are allowed",
                        },
                      })}
                      
                    />
                        {errors.name && (
                            <span className={`${styles.errorMessage} text-danger`}>
                         {errors.name.message}
                            </span>
                        )}
                </div>
                <div className="form-group">
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
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Enter a valid email address",
                  },
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters are allowed",
                  },
                  maxLength: {
                    value: 255,
                    message: "Maximum 255 characters are allowed",
                  },
                })}
              />
              
              {errors.email && (
                <span className={`${styles.errorMessage}  text-danger`}>
                  {errors.email.message}
                </span>
              )}
                </div>
                
                <div className="form-group">
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
                          message: "Please enter a new password",
                        },
                        minLength: {
                          value: 8,
                          message: "Minimum 8 characters are required",
                        },
                        maxLength: {
                          value: 20,
                          message: "Maximum 20 characters are allowed",
                        },
                      })}
                    />
                    {errors.password && (
                        <span className={`${styles.errorMessage}  text-danger`}>
                    {errors.password.message}
                     </span>
              )}
                </div>
                <div className=" d-flex align-items-center justify-content-center">
                    <button type="submit" className="btn btn-primary">
                    Submit
                    </button>
                    <button className="ml-3 btn btn-secondary">
                    <Link to="/login">Cancel</Link>
                    </button>
                </div>
                </form>
            
      </fieldset>
       
            </div>
        </div>
    </div>
};
export default Register;