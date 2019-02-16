import React from "react";

// See more loading icons here:
// https://fontawesome.com/how-to-use/on-the-web/styling/animating-icons
const PageLoader = () => {
  return (
    <div className="page-loader d-flex">
      {/* <img
        className="mx-auto"
        style={{ height: "60px", width: "60px" }}
        src="https://res.cloudinary.com/merrickcloud/image/upload/v1549783562/Rolling-1s-200px_p0pqtb.gif"
        alt="amazing-awesome-dog"
      /> */}
      <em className="fas fa-circle-notch fa-spin fa-2x text-muted" />
    </div>
  );
};

export default PageLoader;
