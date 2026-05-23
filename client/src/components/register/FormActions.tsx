import { FormikProps } from 'formik';
import { RegisterFormValues } from '../../interfaces/RegisterFormValues'; 
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync } from "@fortawesome/free-solid-svg-icons";

interface FormActionsProps {
  formik: FormikProps<RegisterFormValues>;
}

const FormActions: React.FC<FormActionsProps> = ({ formik }) => {
  const navigate = useNavigate();

  return (
    <div className="form-actions">
      <button
        onClick={() => navigate("/")}
        type="button"
        className="cancel-button"
      >
        CANCEL
      </button>
      <button
        onClick={() => formik.resetForm()}
        type="button"
        className="reset-button"
      >
        <FontAwesomeIcon icon={faSync} />
      </button>
      <button type="button" className="submit-button"
        onClick={() => {
          if (!formik.isValid) {
            formik.setTouched(
              Object.fromEntries(
                Object.keys(formik.values).map((key) => [key, true])
              )
            );
            return;
          }
           formik.handleSubmit();
        }}
      >
        SUBMIT
      </button>
    </div>
  );
};

export default FormActions;
