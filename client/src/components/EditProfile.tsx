import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormikProps, useFormik } from "formik";
import * as yup from "yup";
import { decodeToken } from "../services/tokenService";
import { getUserById, updateUser } from "../services/userService";
import { errorMessage, sucessMassage } from "../services/feedbackService";
import ButtonGoBack from "../components/ButtonGoBack";
import { User } from "../interfaces/users/User";
import { normalizeUpdatedUser } from "../utils/users/normalizeUpdatedUser";
import "../styles/update.css"
import { useAuth } from "../context/AuthContext";
 
const EditProfile = () => {
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState<User | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const { setProfileImage } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = decodeToken(token);
      setUserId(decoded._id);
      getUserById(decoded._id)
        .then((res) => setInitialValues(res.data))
        .catch(() => errorMessage("User not found"));
    }
  }, []);   

  const formik: FormikProps<User> = useFormik({
    enableReinitialize: true,
    initialValues: initialValues || {
      name: { first: "", middle: "", last: "" },
      phone: "",
      email: "",
      password: "",
      image: { url: "", alt: "" },
      address: {
        state: "",
        country: "",
        city: "",
        street: "",
        houseNumber: 0,
        zip: 0,
      },
      isBusiness: false,
    },
    validationSchema: yup.object({
      name: yup.object({
        first: yup.string().required("First name is required"),
        middle: yup.string(),
        last: yup.string().required("Last name is required"),
      }),
      phone: yup.string().required("Phone is required"),
      // email: yup.string().email().required("Email is required"),
      image: yup.object({
        url: yup.string().url("Invalid image URL"),
        alt: yup.string(),
      }),
      address: yup.object({
        state: yup.string(),
        country: yup.string().required("Country is required"),
        city: yup.string().required("City is required"),
        street: yup.string().required("Street is required"),
        houseNumber: yup.number().required("House number is required"),
        zip: yup.number().nullable(),
      }),
    }),
    onSubmit: (values) => {
      if (!userId) return;
      const normalized = normalizeUpdatedUser(values);
      updateUser(userId, normalized)
        .then((res) => {
          setProfileImage(res.data.image?.url || null);
          sucessMassage("Profile updated successfully");
          navigate("/profile");
        })
        .catch((err) => errorMessage(err.response?.data || "Update failed"));
    },
  });

  const renderMainSection = () => (
    <div className="form-row">
      <div className="form-group">
        <label className="edit-label">First Name</label>
        <input className="edit-input" name="name.first" value={formik.values.name.first} onChange={formik.handleChange} />
      </div>
      <div className="form-group">
        <label className="edit-label">Last Name</label>
        <input className="edit-input" name="name.last" value={formik.values.name.last} onChange={formik.handleChange} />
      </div>
      <div className="form-group">
        <label className="edit-label">Phone</label>
        <input type="text" className="edit-input" name="phone" value={formik.values.phone} onChange={formik.handleChange} />
      </div>
    </div>
  );

  const renderImageSection = () => (
    <div className="form-row">
      <div className="form-group">
        <label className="edit-label">Image URL</label>
        <input className="edit-input" name="image.url" value={formik.values.image.url} onChange={formik.handleChange} />
      </div>
      <div className="form-group">
        <label className="edit-label">Alt</label>
        <input className="edit-input" name="image.alt" value={formik.values.image.alt} onChange={formik.handleChange} />
      </div>
    </div>
  );

  const renderAddressSection = () => (
    <>
    <div className="form-row">
      <div className="form-group">
        <label className="edit-label">Street</label>
        <input className="edit-input" name="address.street" value={formik.values.address.street} onChange={formik.handleChange} />
      </div>
      <div className="form-group">
        <label className="edit-label">City</label>
        <input className="edit-input" name="address.city" value={formik.values.address.city} onChange={formik.handleChange} />
      </div>
    </div>
      <div className="form-row">
        <div className="form-group">
          <label className="edit-label">House Number</label>
          <input type="number" className="edit-input" name="address.houseNumber" value={formik.values.address.houseNumber} onChange={formik.handleChange} />
        </div>
        <div className="form-group">
          <label className="edit-label">Zip</label>
          <input type="number" className="edit-input" name="address.zip" value={formik.values.address.zip} onChange={formik.handleChange} />
        </div>
      </div>
      </>
  );

  const renderFormButtons = () => (
    <div className="form-actions">
      <button className="edit-btn save-btn" type="submit">Save</button>
      <button className="edit-btn cancel-btn" type="button" onClick={() => navigate("/profile")}>Cancel</button>
    </div>
  );

  if (!initialValues) return <p>Loading profile...</p>;

  return (
    <div className="container">
      <div className="edit-inner">
        <h2 className="title edit-title">Edit Profile</h2>
        <form className="edit-form" onSubmit={formik.handleSubmit}>
          {renderMainSection()}
          {renderImageSection()}
          {renderAddressSection()}
          {renderFormButtons()}
        </form>
      </div>
      <ButtonGoBack />
    </div>
  );
};

export default EditProfile;
