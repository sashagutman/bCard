import { FunctionComponent } from "react";
import "../styles/login.css";
import ButtonGoBack from "./ButtonGoBack";
import { FormikValues, useFormik } from "formik";
import * as yup from "yup";
import { loginUser } from "../services/userService";
import { errorMessage, sucessMassage } from "../services/feedbackService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; 
import { UserLogin } from "../interfaces/users/UserLogin";

const Login: FunctionComponent = () => {
    let navigate = useNavigate();
    const { login } = useAuth();

    const formik: FormikValues = useFormik<UserLogin>({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: yup.object({
            email: yup.string().email().min(5).required(),
            password: yup
                .string()
                .min(7)
                .max(20)
                .required()
                .matches(
                    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*\-"])[A-Za-z\d!@#$%^&*\-"]{8,}$/,
                    'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*-"), and be at least 8 characters long'
                ),
        }),
        onSubmit: async (values: UserLogin, { resetForm }) => {
            try {
                const { token, isBusiness } = await loginUser(values);
        
                localStorage.setItem("token", token);
                localStorage.setItem("isBusiness", isBusiness.toString());
        
                login(token, isBusiness);
                sucessMassage(`${values.email} Logged in successfully`);
                navigate("/");
            } catch (err) {
                errorMessage("Login failed. Please check your credentials.");
            }
            resetForm();
        },
    });

    return (
        <>
            <div className="container">
                <div className="login-body">
                    <h1 className="login-title title">LOGIN</h1>
                    <form className="login-form" onSubmit={formik.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email *</label>
                            <input
                                type="email"
                                id="email"
                                placeholder={formik.touched.email && formik.errors.email ? formik.errors.email : "Email"}
                                className={formik.touched.email && formik.errors.email ? "input-error" : ""}
                                name="email"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password *</label>
                            <input
                                type="password"
                                className={formik.touched.password && formik.errors.password ? "input-error" : ""}
                                id="password"
                                placeholder={formik.touched.password && formik.errors.password ? formik.errors.password : "Password"}
                                name="password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                                required
                            />
                        </div>
                        <div className="form-actions">
                            <button onClick={() => navigate("/")} type="button" className="cancel-button">
                                CANCEL
                            </button>
                            <button onClick={() => formik.resetForm()} type="reset" className="reset-button">
                                <i className="fa-solid fa-arrow-rotate-left"></i>
                            </button>
                            <button disabled={!formik.dirty || !formik.isValid} type="submit" className="submit-button">
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <ButtonGoBack />
        </>
    );
};

export default Login;
