import { FormikProps } from 'formik';
import { RegisterFormValues } from '../../interfaces/RegisterFormValues';

interface AddressDetailsProps {
  formik: FormikProps<RegisterFormValues>;
}

const AddressDetails: React.FC<AddressDetailsProps> = ({ formik }) => {
  return (
    <>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="state">State</label>
          <input
            type="text"
            id="state"
            name="state"
            placeholder="State"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.state}
          />
        </div>
        <div className="form-group">
          <label htmlFor="country">Country *</label>
          <input
            type="text"
            id="country"
            name="country"
            placeholder={
              formik.touched.country && formik.errors.country
                ? formik.errors.country
                : "Country"
            }
            className={
              formik.touched.country && formik.errors.country ? "input-error" : ""
            }
            required
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.country}
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="city">City *</label>
          <input
            type="text"
            id="city"
            name="city"
            placeholder={
              formik.touched.city && formik.errors.city
                ? formik.errors.city
                : "City"
            }
            className={
              formik.touched.city && formik.errors.city ? "input-error" : ""
            }
            required
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.city}
          />
        </div>
        <div className="form-group">
          <label htmlFor="street">Street *</label>
          <input
            type="text"
            id="street"
            name="street"
            placeholder={
              formik.touched.street && formik.errors.street
                ? formik.errors.street
                : "Street"
            }
            className={
              formik.touched.street && formik.errors.street ? "input-error" : ""
            }
            required
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.street}
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="houseNumber">House number *</label>
          <input
            type="text"
            id="houseNumber"
            placeholder={
              formik.touched.houseNumber && formik.errors.houseNumber
                ? formik.errors.houseNumber
                : "House Number"
            }
            className={
              formik.touched.houseNumber && formik.errors.houseNumber
                ? "input-error"
                : ""
            }
            required
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.houseNumber}
          />
        </div>
        <div className="form-group">
          <label htmlFor="zip">Zip</label>
          <input
            type="number"
            id="zip"
            placeholder="Zip"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.zip ?? ""}
          />
        </div>
      </div>
    </>
  );
};

export default AddressDetails;

