import React, { PureComponent } from "react";
import SwipeWrapper from "../SwipeWrapper";
import DingInfiniteScrollContainerMine from "./ScrollContainers/DingInfiniteScrollContainerMine";

export default class MyDings extends PureComponent {
  render() {
    return (
      <SwipeWrapper {...this.props}>
        <h3
          className="text-center"
          style={{ color: "white", marginBottom: "30px" }}
        >
          My Dings
        </h3>
        <DingInfiniteScrollContainerMine {...this.props} />
      </SwipeWrapper>
    );
  }
}
