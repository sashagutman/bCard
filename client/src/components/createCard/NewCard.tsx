import { FormikProps, useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { normalizeCard } from "../../utils/cards/NormalizeCard";
import { postNewCard } from "../../services/cardsService";
import { errorMessage, sucessMassage } from "../../services/feedbackService";
import ButtonGoBack from "../ButtonGoBack";
import { CreateCardValues } from "../../interfaces/CreateCardValues";
import NewCardContact from "./NewCardContact";
import NewCardDescription from "./NewCardDescription";
import NewCardImage from "./NewCardImage";
import NewCardAddress from "./NewCardAddress";
import NewCardForm from "./NewCardForm";


const NewCard = () => {
  const navigate = useNavigate();
  const formik: FormikProps<CreateCardValues> = useFormik<CreateCardValues>({
    initialValues: {
      title: "",
      subtitle: "",
      description: "",
      phone: "",
      email: "",
      web: "",
      url: "",
      alt: "",
      state: "",
      country: "",
      city: "",
      street: "",
      houseNumber: 0,
      zip: null,
    },
    validationSchema: yup.object({
      title: yup.string().min(2).max(256).required('Title is required'),
      subtitle: yup.string().min(2).max(256).required('Subtitle is required'),
      description: yup.string().min(2).max(1024).required('Description is required'),
      phone: yup.string().min(9).max(11).required('Phone is required'),
      email: yup.string().email().min(5).required('Email is required'),
      web: yup.string(),
      url: yup.string().min(14),
      alt: yup.string().min(2).max(256),
      state: yup.string(),
      country: yup.string().required('Country is required'),
      city: yup.string().required('City is required'),
      street: yup.string().required('Street is required'),
      houseNumber: yup.number().min(1).required('House Number is required'),
      zip: yup.number().nullable().notRequired().typeError("Zip must be a number"),
    }),
    onSubmit: (values, { resetForm }) => {
      const normalizedCard = normalizeCard(values); 
      postNewCard(normalizedCard)
        .then(() => {
          sucessMassage("Your card was posted successfully!");
          navigate("/");
        })
        .catch((err) => {
          errorMessage(err.response.data);
        });
      resetForm();
    },
  });

  return (
    <div className="container">
      <div className="register-body">
        <h1 className="register-title title">Create Business Card</h1>
        <form onSubmit={formik.handleSubmit} className="register-form">
          <NewCardDescription formik={formik} />
          <NewCardContact formik={formik} />
          <NewCardImage formik={formik} />
          <NewCardAddress formik={formik} />
          <NewCardForm formik={formik} />
        </form>
      </div>
      <ButtonGoBack />
    </div>
  );
};

export default NewCard;
