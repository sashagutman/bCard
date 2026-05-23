import React from "react";
import { useFormik } from "formik";  
import { RegisterFormValues } from "../../interfaces/RegisterFormValues";
import * as yup from "yup";
import LoginDetails from './ LoginDetails';
import AddressDetails from './AddressDetails'; 
import BusinessCheckbox from './BusinessCheckbox';
import FormActions from './FormActions'; 
import PersonalDetails from './PersonalDetails';
import ImageDetails from "./ImageDetails";
import '../../styles/register.css';
import ButtonGoBack from '../ButtonGoBack';
import { normalizeUser } from "../../utils/users/normalizeUser";
import { unnormalizedUser } from "../../interfaces/users/UnnormalizedUser";
import { registerUser } from "../../services/userService";
import { errorMessage, sucessMassage } from "../../services/feedbackService";

const Register: React.FC = () => {
  const formik = useFormik<RegisterFormValues>({
    initialValues: {
      first: "",
      middle: "",
      last: "",
      phone: "",
      email: "",
      password: "",
      image: "",
      alt: "",
      state: "",
      country: "",
      city: "",
      street: "",
      houseNumber: 0,
      zip: null,
      isBusiness: false,
    },
    validationSchema: yup.object({
      first: yup.string().min(3).max(256).required("First Name is required"),
      middle: yup.string().min(3).max(256),
      last: yup.string().min(3).max(256).required("Last Name is required"),
      phone: yup.string().min(9).max(15).required("Phone is required"),
      email: yup.string().email().min(5).required("Email is required"),
      password: yup
      .string()
      .min(7)
      .max(20)
      .required("Password is required")
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*\-"])[A-Za-z\d!@#$%^&*\-"]{8,}$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*-"), and be at least 8 characters long'
      ),
      image: yup.string().min(14),
      alt: yup.string().min(3).max(256),
      state: yup.string().min(3).max(256),
      country: yup.string().min(3).max(256).required("Country is required"),
      city: yup.string().min(3).max(256).required("City is required"),
      street: yup.string().min(3).max(256).required("Street is required"),
      houseNumber: yup.number().min(1).max(9999).required("House Number is required"),
      zip: yup.number().nullable(),
      isBusiness: yup.boolean().required('Business checkbox is required'),
    }),
    onSubmit: (values, { resetForm }) => {
      const normalizedUser = normalizeUser(values as unnormalizedUser);
      console.log(normalizedUser);
      registerUser(normalizedUser)
        .then((res) => {
          console.log(res);
          sucessMassage(`${res.data.email} registerd successfuly`);
        })
        .catch((err) => {
          console.log(err);
          errorMessage(err.response.data);
        });
      resetForm();
    },
  });

  return (
    <>
    <div className="container">
      <div className="register-body">
        <h1 className="register-title title">REGISTER</h1>
        <form onSubmit={formik.handleSubmit} className="register-form">
          <PersonalDetails formik={formik} />
          <LoginDetails formik={formik} />
          <ImageDetails formik={formik} />
          <AddressDetails formik={formik} />
          <BusinessCheckbox formik={formik} />
          <FormActions formik={formik} />
        </form>
      </div>
    </div>
    <ButtonGoBack />
    </>
  );
};

export default Register;
