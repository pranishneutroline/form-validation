import React, { useState, useEffect } from "react";
import {AiFillEye} from "react-icons/ai"
import "./formvalidation.css";

function FormValidation() {
  const initialValues = {
    username: "",
    email: "",
    password: "",
    retypePassword: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [showPassword, setShowPassword] = useState("");
  const [showRetypePassword, setShowRetypePassword] = useState("");

  const handleChange = (e) => {
    // console.log(e.target.value);
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    // console.log(formValues);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };
  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  });

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    // const regexForNumber = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const r = /[A-Za-z]+/;
    if (!values.username) {
      errors.username = "username is required";
    } else if (values.username.length < 3) {
      errors.username = "Name must be longer than 2 letters";
    }
    if (!values.email) {
      errors.email = "email is required";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format";
    }
    if (!values.password) {
      errors.password = "password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot be  more than 10 characters";
    } else if (!r.test(values.password)) {
      errors.password = "write a captial letter";
    }
    // if((!values.password.match(/\d+/) && !values.password.match(/[A-Za-z]+/))) {
    //     errors.password="wrong wrong"
    // }
    if (values.password !== values.retypePassword) {
      errors.password = "password isnt matching";
    }
    // else{
    //   errors.password="password matched"
    // }
    return errors;
  };

  function togglePassword(e) {
    setShowPassword(!showPassword);
  }
  function toggleRetypePassword(e) {
    setShowRetypePassword(!showRetypePassword);
  }

  return (
    <>
      <div className="container">
        <h1>Form Validation</h1>
        {Object.keys(formErrors).length === 0 && isSubmit ? (
          <div className="ui message success"> Signed in successfully</div>
        ) : (
          // <pre>{JSON.stringify(formValues, undefined, 2)}</pre>
          <pre>Fill the Form</pre>
        )}
        <form onSubmit={handleSubmit}>
          {/* <label htmlFor="username">UserName</label> */}

          <input
            type="text"
            placeholder="Username"
            name="username"
            value={formValues.username}
            onChange={handleChange}
          />
          <p>{formErrors.username}</p>
          <input
            type="email"
            name="email"
            id=""
            placeholder="Email"
            value={formValues.email}
            onChange={handleChange}
          />
          <p>{formErrors.email}</p>

          <input
            type={showPassword ? "text" : "password"}
            name="password"
            id=""
            placeholder="password"
            value={formValues.password}
            onChange={handleChange}
          />
          {/* <AiFillEye onClick={togglePassword}/> */}
          <button onClick={togglePassword} name="showPassword">
            {showPassword ? "Hide Password" : "Show password"}
          </button>

          <input
            type={showRetypePassword ? "text" : "password"}
            name="retypePassword"
            id=""
            placeholder="Retype-password"
            value={formValues.retypePassword}
            onChange={handleChange}
          />
          <button onClick={toggleRetypePassword} name="showPassword">
            {showRetypePassword ? "Hide Password" : "Show password"}
          </button>
          <p>{formErrors.password}</p>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}

export default FormValidation;
