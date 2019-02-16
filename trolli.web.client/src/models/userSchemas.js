import * as Yup from "yup";

const getRegisterSchema = () =>
  Yup.object().shape({
    username: Yup.string()
      .required("This field is required.")
      .test("len", "Username must be between 5-30 characters.", val =>
        val ? val.length >= 5 && val.length <= 30 : ""
      )
      .matches(/^\S*$/, {
        message: "Username must not contain any spaces.",
        excludeEmptyString: true
      }),
    password: Yup.string()
      .required("This field is required.")
      .matches(
        /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])(?!.*\s).{8,20}$/,
        {
          message:
            "Password must be 8-20 char, not include spaces, & contain one of each: A, a, 123, !@#$%^&*, and no spaces.",
          excludeEmptyString: true
        }
      ),
    passwordConfirm: Yup.string()
      .required("This field is required.")
      .oneOf([Yup.ref("password")], ["Must match password."])
  });

// const getEmailUsernameSchema = () =>
//   Yup.object().shape({
//     userName: Yup.string()
//       .required("This field is required.")
//       .test("len", "Username must be between 5-30 characters.", val =>
//         val ? val.length >= 5 && val.length <= 30 : ""
//       )
//       .matches(/^\S*$/, {
//         message: "Username must not contain any spaces.",
//         excludeEmptyString: true
//       }),
//     emailAddress: Yup.string()
//       .required("This field is required.")
//       .email("Please provide a valid email address")
//   });

const getLoginSchema = () =>
  Yup.object().shape({
    username: Yup.string()
      .required("This field is required.")
      .test("len", "Username must be between 5-30 characters.", val =>
        val ? val.length >= 5 && val.length <= 30 : ""
      )
      .matches(/^\S*$/, {
        message: "Username must not contain any spaces.",
        excludeEmptyString: true
      }),
    password: Yup.string().required("This field is required.")
  });

// const getEmailSchema = () =>
//   Yup.object().shape({
//     emailAddress: Yup.string()
//       .required("This field is required.")
//       .email("Please provide a valid email address")
//   });

// const getPasswordSchema = () =>
//   Yup.object().shape({
//     password: Yup.string()
//       .required("This field is required.")
//       .matches(
//         /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#\\$%\\^&\\*])(?!.*\\s).{8,20}$/,
//         {
//           message:
//             "Password must be 8-20 characters, must contain at least 1 uppercase letter, 1 lowercase letter, 1 special character (!@#$%^&*), and must not contain any spaces.",
//           excludeEmptyString: true
//         }
//       ),
//     passwordConfirm: Yup.string()
//       .required("This field is required.")
//       .oneOf([Yup.ref("password")], ["Must match password."])
//   });

// const GetChangePasswordSchema = () =>
//   Yup.object().shape({
//     oldPassword: Yup.string().required("this field is rerequired"),
//     // .oneOf([Yup.ref(this.props.currentUser.emailAddress)], ["Must match password."])
//     password: Yup.string()
//       .required("This field is required.")
//       .matches(
//         /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#\\$%\\^&\\*])(?!.*\\s).{8,20}$/,
//         {
//           message:
//             "Password must be 8-20 characters, must contain at least 1 uppercase letter, 1 lowercase letter, 1 special character (!@#$%^&*), and must not contain any spaces.",
//           excludeEmptyString: true
//         }
//       ),
//     passwordConfirm: Yup.string()
//       .required("This field is required.")
//       .oneOf([Yup.ref("password")], ["Must match password."])
//   });

getRegisterSchema.initialValues = {
  username: "",
  password: "",
  passwordConfirm: ""
};

getLoginSchema.initialValues = {
  username: "",
  password: ""
};

// getPasswordSchema.initialValues = {
//   password: "",
//   passwordConfirm: ""
// };

// GetChangePasswordSchema.initialValues = {
//   oldPassword: "",
//   password: "",
//   passwordConfirm: ""
// };

// getEmailUsernameSchema.initialValues = {
//   userName: "",
//   emailAddress: ""
// };

export { getRegisterSchema, getLoginSchema };
