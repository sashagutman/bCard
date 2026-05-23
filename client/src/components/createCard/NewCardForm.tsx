import { FormikProps } from 'formik';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons/faSync';
import { CreateCardValues } from '../../interfaces/CreateCardValues';
import { errorMessage } from '../../services/feedbackService';

interface NewCardFormProps {
  formik: FormikProps<CreateCardValues>;
}

const NewCardForm: React.FC<NewCardFormProps> = ({ formik }) => {
  const navigate = useNavigate();

  return (
    <div className="form-actions">
      <button onClick={() => navigate('/')} type="button" className="cancel-button">
        CANCEL
      </button>
      <button onClick={() => formik.resetForm()} type="button" className="reset-button">
        <FontAwesomeIcon icon={faSync} />
      </button>
      <button
        type="button"
        className="submit-button"
        onClick={() => {
          formik.setTouched(
            Object.fromEntries(
              Object.keys(formik.values).map((key) => [key, true])
            )
          );

          formik.validateForm().then((errors) => {
            if (Object.keys(errors).length > 0) {
              errorMessage("Please fill in all required fields.");
            } else {
              formik.handleSubmit();
            }
          });
        }}
      >
        SUBMIT
      </button>
    </div>
  );
};

export default NewCardForm;
