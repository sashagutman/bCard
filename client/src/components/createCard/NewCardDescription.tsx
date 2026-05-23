import { FormikProps } from 'formik';
import { CreateCardValues } from '../../interfaces/CreateCardValues';


interface NewCardDescriptionProps {
    formik: FormikProps<CreateCardValues>;
}

const NewCardDescription: React.FC<NewCardDescriptionProps> = ({ formik }) => (
    <>
    <div className="form-row">
        <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input type="text" id="title"
                name="title"
                value={formik.values.title}
                placeholder={formik.touched.title && formik.errors.title ? formik.errors.title: "Title"}
                onChange={formik.handleChange} onBlur={formik.handleBlur}
                className={formik.touched.title && formik.errors.title ? "input-error" : ""}
                required
            />
        </div>

        <div className="form-group">
            <label htmlFor="subtitle">Subtitle *</label>
            <input type="text"
                id="subtitle"
                name="subtitle"
                required
                placeholder={formik.touched.subtitle && formik.errors.subtitle ? formik.errors.subtitle : "Subtitle"}
                className={formik.touched.subtitle && formik.errors.subtitle ? "input-error" : ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.subtitle}
            />
        </div>
    </div>

    <div className='form-row'>
        <div className="form-group">
            <label htmlFor="description">Description *</label>
            <input
                type="text"
                id="description"
                name="description"
                placeholder={formik.touched.description && formik.errors.description ? formik.errors.description : "Description"}
                className={formik.touched.description && formik.errors.description ? "input-error" : ""}
                required
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
            />

        </div>
    </div>
    </>
);

export default NewCardDescription;