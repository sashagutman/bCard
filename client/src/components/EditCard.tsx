import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFormik, FormikProps } from "formik";
import * as yup from "yup";
import { getCardById, updateCard } from "../services/cardsService";
import { UnnormalizedCard } from "../interfaces/cards/UnnormalizedCard";
import { normalizeCard } from "../utils/cards/NormalizeCard";
import { errorMessage, sucessMassage } from "../services/feedbackService";
import ButtonGoBack from "../components/ButtonGoBack";
import "../styles/update.css"

const EditCard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState<UnnormalizedCard | null>(null);

  useEffect(() => {
    if (id) {
      getCardById(id)
        .then(res => {
          const card = res.data;
          setInitialValues({
            title: card.title,
            subtitle: card.subtitle,
            description: card.description,
            phone: card.phone,
            email: card.email,
            web: card.web,
            url: card.image.url,
            alt: card.image.alt,
            state: card.address.state,
            country: card.address.country,
            city: card.address.city,
            street: card.address.street,
            houseNumber: card.address.houseNumber,
            zip: card.address.zip,
          });
        })
        .catch(() => errorMessage("Card not found"));
    }
  }, [id]);

  const formik: FormikProps<UnnormalizedCard> = useFormik({
    enableReinitialize: true,
    initialValues: initialValues || {
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
      zip: 0,
    },
    validationSchema: yup.object({
      title: yup.string().required(),
      subtitle: yup.string().required(),
      description: yup.string().required(),
      phone: yup.string().required(),
      email: yup.string().email().required(),
      web: yup.string(),
      url: yup.string().url(),
      alt: yup.string(),
      state: yup.string(),
      country: yup.string().required(),
      city: yup.string().required(),
      street: yup.string().required(),
      houseNumber: yup.number().required(),
      zip: yup.number().nullable(),
    }),
    onSubmit: (values) => {
      if (!id) return;

      const normalizedCard = normalizeCard(values);
      updateCard(id, normalizedCard)
        .then(() => {
          sucessMassage("Card updated successfully");
          navigate("/my-cards");
        })
        .catch(err => errorMessage(err.response.data));
    },
  });


  const renderMainInfo = () => (
    <>
    <div className="form-row">
      <div className="form-group">
        <label className="edit-label">Title</label>
        <input className="edit-input" name="title" value={formik.values.title} onChange={formik.handleChange} />
      </div>
      <div className="form-group">
        <label className="edit-label">Subtitle</label>
        <input className="edit-input" name="subtitle" value={formik.values.subtitle} onChange={formik.handleChange} />
      </div>
    </div>
    <div className="form-row">
      <div className="form-group">
        <label className="edit-label">Description</label>
        <input className="edit-input" name="description" value={formik.values.description} onChange={formik.handleChange} />
      </div>
    </div>
    </>
  );

  const renderContactInfo = () => (
    <div className="form-row">
      <div className="form-group">
        <label className="edit-label">Phone</label>
        <input className="edit-input" name="phone" value={formik.values.phone} onChange={formik.handleChange} />
      </div>
      <div className="form-group">
        <label className="edit-label">Email</label>
        <input className="edit-input" name="email" value={formik.values.email} onChange={formik.handleChange} />
      </div>
    </div>
  );

  const renderAddress = () => (
    <div className="form-row">
      <div className="form-group">
        <label className="edit-label">Street</label>
        <input className="edit-input" name="street" value={formik.values.street} onChange={formik.handleChange} />
      </div>
      <div className="form-group">
        <label className="edit-label">City</label>
        <input className="edit-input" name="city" value={formik.values.city} onChange={formik.handleChange} />
      </div>
      <div className="form-group">
        <label className="edit-label">House number</label>
        <input className="edit-input" name="houseNumber" value={formik.values.houseNumber} onChange={formik.handleChange} />
      </div>
      <div className="form-group">
        <label className="edit-label">Zip</label>
        <input type="number" className="edit-input" name="zip"
              value={formik.values.zip ?? ""}
              onChange={(e) => {
              const value = e.target.value;
              formik.setFieldValue("zip", value === "" ? null : Number(value));
    }}
  />
      </div>
    </div>
  );

  const renderImage = () => (
    <div className="form-row">
      <div className="form-group">
        <label className="edit-label">Image URL</label>
        <input className="edit-input" name="url" value={formik.values.url} onChange={formik.handleChange} />
      </div>
      <div className="form-group">
        <label className="edit-label">Alt</label>
        <input className="edit-input" name="alt" value={formik.values.alt} onChange={formik.handleChange} />
      </div>
    </div>
  );

  const renderFormButtons = () => (
    <div className="form-actions">
      <button className="edit-btn save-btn" type="submit">Save</button>
      <button className="edit-btn cancel-btn" type="button" onClick={() => navigate("/my-cards")}>Cancel</button>
    </div>
  );


  return (
    <div className="container">
      <div className="edit-inner">
        <h2 className="title edit-title">Update Card</h2>
        <form className="edit-form" onSubmit={formik.handleSubmit}>
          {renderMainInfo()}
          {renderContactInfo()}
          {renderImage()}
          {renderAddress()}
          {renderFormButtons()}
        </form>
      </div>
      <ButtonGoBack />
    </div>
  );
};

export default EditCard;