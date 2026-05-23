import { FormikProps } from 'formik';
import { RegisterFormValues } from '../../interfaces/RegisterFormValues'; 


interface LoginDetailsProps {
  formik: FormikProps<RegisterFormValues>;
}

const LoginDetails: React.FC<LoginDetailsProps> = ({ formik }) => {
  return (
    <div className="form-row">
      <div className="form-group">
        <label htmlFor="email">Email *</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder={
            formik.touched.email && formik.errors.email
              ? formik.errors.email
              : "Email"
          }
          className={
            formik.touched.email && formik.errors.email ? "input-error" : ""
          }
          required
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password *</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder={
            formik.touched.password && formik.errors.password
              ? formik.errors.password
              : "Password"
          }
          className={
            formik.touched.password && formik.errors.password ? "input-error" : ""
          }
          required
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
      </div>
    </div>
  );
};

export default LoginDetails;

