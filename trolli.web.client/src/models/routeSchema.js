import * as Yup from "yup";

const getRouteSchema = () =>
  Yup.object().shape({
    route: Yup.string().required("This field is required.")
  });

getRouteSchema.initialValues = {
  route: ""
};

export { getRouteSchema };
