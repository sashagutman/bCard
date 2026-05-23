import { FormikProps } from 'formik';
import { RegisterFormValues } from '../../interfaces/RegisterFormValues'; 

interface PersonalDetailsProps {
  formik: FormikProps<RegisterFormValues>;
}

const PersonalDetails: React.FC<PersonalDetailsProps> = ({ formik }) => {
  return (
    <div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="first">First name *</label>
          <input
            type="text"
            id="first"
            name="first"
            placeholder={
              formik.touched.first && formik.errors.first
                ? formik.errors.first
                : "First name"
            }
            className={
              formik.touched.first && formik.errors.first ? "input-error" : ""
            }
            required
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.first}
          />
        </div>
        <div className="form-group">
          <label htmlFor="middleName">Middle name</label>
          <input
            type="text"
            id="middle"
            name="middle"
            placeholder="Middle name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.middle}
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="lastName">Last name *</label>
          <input
            type="text"
            id="last"
            name="last"
            placeholder={
              formik.touched.last && formik.errors.last
                ? formik.errors.last
                : "Last name"
            }
            className={
              formik.touched.last && formik.errors.last ? "input-error" : ""
            }
            required
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.last}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone *</label>
          <input
            type="text"
            id="phone"
            name="phone"
            placeholder={
              formik.touched.phone && formik.errors.phone
                ? formik.errors.phone
                : "+972"
            }
            className={
              formik.touched.phone && formik.errors.phone ? "input-error" : ""
            }
            required
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;

