import { FormikProps } from 'formik';
import { CreateCardValues } from '../../interfaces/CreateCardValues';

interface NewCardContactProps {
    formik: FormikProps<CreateCardValues>;
}
 
const NewCardContact: React.FC<NewCardContactProps> = ({formik}) => {
    return (
        <>
            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="phone">Phone *</label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        placeholder={formik.touched.phone && formik.errors.phone ? formik.errors.phone : "+972"}
                        className={formik.touched.phone && formik.errors.phone ? "input-error" : ""}
                        required
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.phone} />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder={formik.touched.email && formik.errors.email ? formik.errors.email : "Email"}
                        className={formik.touched.email && formik.errors.email ? "input-error" : ""}
                        required
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Web</label>
                    <input
                        type="web"
                        id="web" name="web" placeholder='Web'
                        className={formik.touched.web && formik.errors.web ? "input-error" : ""}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                </div>
            </div>
        </>
    );
}
 
export default NewCardContact;