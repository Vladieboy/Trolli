import React from "react";
import { Form, Formik } from "formik";
import { Row, Button, Label, Input } from "reactstrap";
import * as schemas from "../../models/dingsSchemas";
import * as dingService from "../../Services/dingService";
import constants from "../Dings/constRoutes";
import SwipeWrapper from "../SwipeWrapper";

class DingCreate extends React.Component {
  constructor(props) {
    super(props);
    this.validation = schemas.getDingSchema;
    this.state = {
      primarySponsorTypeId: 1,
      routes: [],
      categorys: [],
      inputHide: "d-none",
      selectedAgency: "",
      selectedRouteName: ""
    };
    this.state.dings = this.validation.initialValues;
  }
  componentDidMount() {}
  handleSubmitDing = (values, obj) => {
    var data;
    navigator.geolocation.getCurrentPosition(response => {
      data = {
        DingCategory: values.category,
        Value: values.message,
        RouteId: values.route,
        StopId: 1,
        StopDisplayName: this.state.selectedRouteName,
        Agency: values.agency,
        Lat: response.coords.latitude == null ? 0 : response.coords.latitude,
        Long: response.coords.longitude == null ? 0 : response.coords.longitude
      };
      dingService
        .create(data)
        .then(() => this.props.history.push("/"))
        .catch(() => console.log("error"));
    });
  };
  hand = a => {
    if (a.target.value === "lametro") {
      this.setState({ inputHide: "", selectedAgency: a.target.value });
    }
    if (a.target.value === "lametro-rail") {
      this.setState({ inputHide: "", selectedAgency: a.target.value });
    }
    if (a.target.value === "") {
      this.setState({ inputHide: "d-none", selectedAgency: "" });
    }
    console.log(a.target.value);
  };
  routeClick = e => {
    this.setState({ selectedRouteName: e.target.textContent });
  };
  renderLametro = lametro => {
    return (
      <option key={lametro.id} value={lametro.id}>
        {lametro.display_name}
      </option>
    );
  };
  renderLametroRail = lametroRail => {
    return (
      <option key={lametroRail.id} value={lametroRail.id}>
        {lametroRail.display_name}
      </option>
    );
  };
  render() {
    return (
      <SwipeWrapper {...this.props}>
        <div className="bg-light-blue">
          <Formik
            enableReinitialize={true}
            initialValues={this.state.dings}
            onSubmit={this.handleSubmitDing}
            validationSchema={this.validation()}
          >
            {props => {
              const {
                values,
                touched,
                errors,
                handleChange,
                handleBlur,
                handleSubmit
              } = props;
              return (
                <Row>
                  <div className="col-lg-12">
                    <Form
                      className="form-horizontal"
                      action="#"
                      data-parsley-validate=""
                      noValidate=""
                    >
                      <div className="col-md-6">
                        <div className="card card-default">
                          <div className="card-header">
                            <div className="card-title text-primary">
                              New Ding
                            </div>
                          </div>

                          <div className="card-body">
                            <fieldset>
                              <Label className="col-form-label text-primary">
                                Agency
                              </Label>
                              <select
                                className="form-control"
                                name="agency"
                                value={values.agency}
                                onChange={handleChange}
                                onClick={this.hand}
                                onBlur={handleBlur}
                                style={{ display: "block" }}
                              >
                                <option value="" label="Select Type" />
                                <option value="lametro" label="lametro" />
                                <option
                                  value="lametro-rail"
                                  label="lametro-rail"
                                />
                              </select>
                              {errors.agency && touched.agency && (
                                <div className="input-feedback text-danger">
                                  {errors.agency}
                                </div>
                              )}
                            </fieldset>
                            <fieldset className={this.state.inputHide}>
                              <Label className="col-form-label text-primary">
                                Route
                              </Label>
                              <select
                                className="form-control"
                                name="route"
                                value={values.route}
                                onChange={handleChange}
                                onClick={this.routeClick}
                                onBlur={handleBlur}
                                style={{ display: "block" }}
                              >
                                <option value="" label="Select Type" />
                                {this.state.selectedAgency === "lametro-rail"
                                  ? constants.routse.lametroRail.map(
                                      this.renderLametroRail
                                    )
                                  : this.state.selectedAgency === "lametro"
                                  ? constants.routse.lametro.map(
                                      this.renderLametroRail
                                    )
                                  : ""}
                              </select>
                              {errors.route && touched.route && (
                                <div className="input-feedback text-danger">
                                  {errors.route}
                                </div>
                              )}
                            </fieldset>
                            <fieldset className={this.state.inputHide}>
                              <Label className="col-form-label text-primary">
                                Category
                              </Label>
                              <select
                                className="form-control"
                                name="category"
                                value={values.category}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                style={{ display: "block" }}
                              >
                                <option value="" label="Select Type" />
                                <option value="Delay" label="Delay" />
                                <option
                                  value="Disturbance"
                                  label="Disturbance"
                                />
                                <option
                                  value="Route Closed"
                                  label="Route Closed"
                                />
                              </select>
                              {errors.category && touched.category && (
                                <div className="input-feedback text-danger">
                                  {errors.category}
                                </div>
                              )}
                            </fieldset>
                            <fieldset className={this.state.inputHide}>
                              <div className="row">
                                <Label
                                  className="col-xl-2 col-form-label text-primary"
                                  for="message"
                                >
                                  Message
                                </Label>
                                <div className="col-xl-10">
                                  <Input
                                    className={
                                      errors.message && touched.message
                                        ? "error"
                                        : ""
                                    }
                                    value={values.message}
                                    name="message"
                                    type="textarea"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  />
                                  {errors.message && touched.message && (
                                    <label className="error text-danger">
                                      {errors.message}
                                    </label>
                                  )}
                                </div>
                              </div>
                            </fieldset>
                          </div>
                          <div className="card-footer text-center">
                            <Button
                              color="primary"
                              type="button"
                              onClick={handleSubmit}
                              className="submitForm"
                            >
                              Ding!
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Form>
                  </div>
                </Row>
              );
            }}
          </Formik>
        </div>
      </SwipeWrapper>
    );
  }
}
export default DingCreate;
