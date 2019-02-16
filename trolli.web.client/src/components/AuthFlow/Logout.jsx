import * as userService from "../../Services/userService";

const Logout = props => {
  userService.logout().then(() =>
    props.history.push("/login", {
      action: "USERLOGOUT"
    })
  );
  return null;
};

export default Logout;
