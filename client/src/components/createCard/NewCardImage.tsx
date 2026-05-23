import { FormikProps } from 'formik';
import { CreateCardValues } from '../../interfaces/CreateCardValues';

interface NewCardImageProps {
    formik: FormikProps<CreateCardValues>;
}

const NewCardImage: React.FC<NewCardImageProps> = ({ formik }) => {
    return (
        <>
            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="imageUrl">Image URL</label>
                    <input type="text" id="url" placeholder="Image URL"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.url}
                        name="url" />
                </div>
                <div className="form-group">
                    <label htmlFor="imageAlt">Image Alt</label>
                    <input type="text" id="imageAlt" placeholder="Image Alt"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.alt}
                        name="alt" />
                </div>
            </div>
        </>
    )
};

export default NewCardImage;