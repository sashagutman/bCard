import { FormikProps } from "formik";
import { RegisterFormValues } from "../../interfaces/RegisterFormValues";

interface ImageDetailsProps {
    formik: FormikProps<RegisterFormValues>;
}
 
const ImageDetails: React.FC<ImageDetailsProps> = ({formik}) => {
    return ( 
    <>
      <div className="form-row">
          <div className="form-group">
            <label htmlFor="image">Image URL</label>
            <input
              type="text"
              id="image"
              name="image"
              placeholder={
                formik.touched.image && formik.errors.image
                  ? formik.errors.image
                  : "Image"
              }
              value={formik.values.image}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.image && formik.errors.image && (
              <div className="error-message">{formik.errors.image}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="alt">Image Alt</label>
            <input
              type="text"
              id="alt"
              name="alt"
              placeholder={
                formik.touched.alt && formik.errors.alt
                  ? formik.errors.alt
                  : "Alt"
              }
              value={formik.values.alt}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.alt && formik.errors.alt && (
              <div className="error-message">{formik.errors.alt}</div>
            )}
          </div>
      </div>
    </> );
}   
 
export default ImageDetails;