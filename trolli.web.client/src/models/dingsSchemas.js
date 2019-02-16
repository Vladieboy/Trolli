import * as Yup from "yup";

const getDingSchema = () =>
  Yup.object().shape({
    agency: Yup.string().required("Required"),
    route: Yup.string().required("Required"),
    category: Yup.string().required("Required"),
    message: Yup.string()
      .max(100)
      .required("Required")
  });

getDingSchema.initialValues = {
  agency: "",
  route: "",
  category: "",
  message: ""
};

export { getDingSchema };
