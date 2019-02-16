import React, { PureComponent } from "react";
import { Card, CardBody, CardHeader } from "reactstrap";

export default class DingDisplaySmall extends PureComponent {
  render() {
    const { ding } = this.props;
    return (
      <Card className=" m-3 text-center">
        <CardHeader className="d-flex" style={{ backgroundColor: "#17a2b8" }}>
          <div>
            <i className="fas fa-layer-group ml-auto mr-1" />
            <span>{ding.dingCategory}</span>
          </div>
          <div className="ml-auto">
            <i className="fas fa-bus mr-1 ml-2" />
            <span>{ding.routeId}</span>
            <i className="fas fa-clock mr-1 ml-2" />
            <span>{ding.dateAdded.substr(11, 5)}</span>
          </div>
        </CardHeader>
        <CardBody
          className="p-5"
          style={{ backgroundColor: "#f8f9fa", color: "black" }}
        >
          {ding.value}
        </CardBody>
      </Card>
      // <Card className=" m-3">
      //   <CardBody
      //     className="py-4 px-2"
      //     style={{ backgroundColor: "#f8f9fa", color: "black" }}
      //   >
      //     <Row>
      //       <Col xs={4} className="border-right pl-4">
      //         <div>
      //           <i className="fas fa-route ml-auto mr-2 pt-1" />
      //           <span>{ding.routeId}</span>
      //         </div>
      //         <div>
      //           <i className="fas fa-route ml-auto mr-2 pt-1" />
      //           <span>{ding.dingCategory}</span>
      //         </div>
      //         <div>
      //           <i className="fas fa-route ml-auto mr-2 pt-1" />
      //           <span>{ding.dateAdded.substr(11, 5)}</span>
      //         </div>
      //       </Col>
      //       <Col xs={8} className="d-flex">
      //         {" "}
      //         <div className="m-auto">{ding.value}</div>
      //       </Col>
      //     </Row>
      //   </CardBody>
      // </Card>
    );
  }
}
