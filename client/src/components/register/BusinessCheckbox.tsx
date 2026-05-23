import { FormikProps } from 'formik';
import { RegisterFormValues } from '../../interfaces/RegisterFormValues';


interface BusinessCheckboxProps {
  formik: FormikProps<RegisterFormValues>;
}

const BusinessCheckbox: React.FC<BusinessCheckboxProps> = ({ formik }) => {
  return (
    <div className="form-group-checkbox">
      <label className="custom-checkbox">
        <input
          type="checkbox"
          name="isBusiness"
          checked={formik.values.isBusiness}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <span className="checkmark"></span>
        <p>Is Business</p>
      </label>
      {formik.touched.isBusiness && formik.errors.isBusiness && (
        <p className="text-danger">{formik.errors.isBusiness}</p>
      )}
    </div>
  );
};

export default BusinessCheckbox;
