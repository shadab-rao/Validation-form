import React, { useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";


const validationSchemaSignUp = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match").required("Confirm Password is required"),
  file: Yup.mixed().required("File is required"),
  checkbox: Yup.boolean().oneOf([true],"You must accept the terms and conditions"),
  city: Yup.string().required('Please select a city'),
});

const validationSchemaLogin = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const initialValuesSignUp = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  file: null,
  checkbox: false,
  city:''
};

const initialValuesLogin = {
  email: "",
  name: "",
  password: "",
  confirmPassword: "",
  checkbox: false,
  file: null,
  city:''
};

const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Miami'];


const App = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const fileInputRef = useRef(null);
  const[showSuccess,setShowSuccess] = useState(false)
 

  const toggleForm = () => {
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
  };

  const validationSchema = isSignUp
    ? validationSchemaSignUp
    : validationSchemaLogin;
  const initialValues = isSignUp ? initialValuesSignUp : initialValuesLogin;

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values,{resetForm}) => {
      resetForm() 
      setShowSuccess(true)

      setTimeout(()=>{
        setShowSuccess(false)
      },5000)

      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }
    },
    
    
  });
 

  return (
    <div className="bg-blue-500 w-screen h-screen flex flex-col justify-center items-center">
       {showSuccess && (
        <div
          className="bg-green-500 text-white py-2 mb-4 px-4 rounded mt-10">
         {isSignUp?" Form submitted successfully!" :"Login Successfully"}
        </div>
      )}
      <div className="flex flex-col  items-center bg-white w-[25%]  h-auto rounded-md shadow-slate-950 shadow-md text-black">
        <h1 className="mt-8 text-2xl font-semibold mb-2">{isSignUp?"Registration Form":"Login Form"}</h1>
        <div className="border-black border-[1px] w-80 mb-2"></div>
        <form className="mt-4" encType="" onSubmit={formik.handleSubmit}>
          {isSignUp && (
            <div className="mb-4">
              <input
                className="border-2 block rounded-md w-72 ml-4 h-10 p-2 mx-2"
                type="text"
                name="name"
                onChange={formik.handleChange}
                value={formik.values.name}
                placeholder="Enter name"
              />
              {formik.errors.name && formik.touched.name && (
                <div className="text-red-500 text-sm ml-5">{formik.errors.name}</div>
              )}
            </div>
          )}

          <div className="mb-4">
            <input
              className="border-2 block rounded-md ml-4  w-72 h-10 p-2 mx-2"
              type="email"
              name="email"
              placeholder="Enter email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.errors.email && formik.touched.email && (
              <div className="text-sm text-red-500 ml-5">
                {formik.errors.email}
              </div>
            )}
          </div>

          <div className="mb-4">
            <input
              className="border-2 block ml-4 rounded-md  w-72 h-10 p-2 mx-2"
              type="password"
              name="password"
              placeholder="Password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            {formik.errors.password && formik.touched.password && (
              <div className="text-sm ml-5 mb-4 text-red-500">
                {formik.errors.password}
              </div>
            )}
          </div>

          {isSignUp && (
            <div className="mb-6">
              <input
                className="border-2 block ml-4 rounded-md w-72  h-10 p-2 mx-2"
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
              />
              {formik.errors.confirmPassword &&
                formik.touched.confirmPassword && (
                  <div className="text-sm ml-5  text-red-500">
                    {formik.errors.confirmPassword}
                  </div>
                )}
            </div>
          )}

       {isSignUp && (
         <div className="ml-5 mb-4"> 
         <select
         className="border border-black text-sm w-28 px-2 py-1"
           id="city"
           name="city"
           onChange={formik.handleChange}
           onBlur={formik.handleBlur}
           value={formik.values.city}
         >
           <option value="" label="Select a city" />
           {cities.map((city) => (
             <option key={city} value={city} label={city} />
           ))}
         </select>
         {formik.errors.city && formik.touched.city && (
           <div className="text-red-500 text-sm">{formik.errors.city}</div>
         )}
       </div>
 
       )}
          {isSignUp && (
            <div>
              <input
                className="block ml-5 text-sm"
                type="file"
                name="file"
                onChange={(event) => {
                  formik.setFieldValue("file", event.currentTarget.files[0]);
                }}
                ref={fileInputRef}
              />
              {formik.errors.file && formik.touched.file && (
                <div className="text-red-500 text-sm ml-5">{formik.errors.file}</div>
              )}
            </div>
          )}

          {isSignUp && (
            <div className="mt-4 ml-2 mb-4 text-gray-600 items-center">
              <input
                className="ml-3 mr-1 "
                type="checkbox"
                name="checkbox"
                checked={formik.values.checkbox}
                onChange={formik.handleChange}
              />
              <label className="text-sm font-semibold " htmlFor="checkbox">
                Accept privacy policy and terms
              </label>
              {formik.errors.checkbox && formik.touched.checkbox && (
                <div className="text-red-500 text-sm ml-3">{formik.errors.checkbox}</div>
              )}
            </div>
          )}

          <button
            type="submit"
            className="bg-blue-500 text-white p-2 w-[330px] mt-4 rounded-md"
          >
            {isSignUp ? "Sign Up" : "Login"}
          </button>
          <p
            className="mb-6 mt-3 cursor-pointer ml-2 text-sm font-semibold"
            onClick={toggleForm}
          >
            {isSignUp
              ? "Already have an account? Login"
              : "Need an account? Sign Up"}
          </p>
        </form>
      </div>
     
    </div>
  );
};

export default App;
