import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroller";
import DingDisplaySmall from "../DingDisplaySmall";
// import PageLoader from "../PageLoader";

import * as dingSvc from "../../../Services/dingService";

export default class DingInfiniteScrollContainerMine extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dings: [],
      hasNextPage: true,
      noDings: false
    };

    this.pageIndex = 0;
    this.pageSize = 1;
  }

  loadItems(page) {
    const qStr = {
      pageSize: this.pageSize,
      pageIndex: this.pageIndex
    };

    dingSvc.getPageMine(qStr).then(resp => {
      let dings = [...this.state.dings];
      if (!resp.item) {
        this.setState({
          hasNextPage: false,
          noDings: true
        });
      } else {
        resp.item.pagedItems.forEach(ding => dings.push(ding));

        this.setState({
          dings,
          hasNextPage: resp.item.hasNextPage
        });

        this.pageIndex++;
      }
    });
  }

  mapDingToDisplay = ding => {
    return (
      <DingDisplaySmall key={Math.random().toString() + ding.id} ding={ding} />
    );
  };

  render() {
    // const loader = <PageLoader />;

    return (
      <InfiniteScroll
        pageStart={0}
        loadMore={this.loadItems.bind(this)}
        hasMore={this.state.hasNextPage}
        // loader={loader}
      >
        {this.state.noDings ? (
          <div className="text-center">
            <strong>You don't have any Dings yet. :(</strong>
            <div
              className="text-center p-3 mt-3"
              style={{
                backgroundColor: "rgb(23, 162, 184)",
                color: "white",
                margin: "0 20px 20px 20px",
                borderRadius: "50px"
              }}
              onClick={() => this.props.history.push("/ding/new")}
            >
              <i className="fas fa-bell mr-2" />
              <strong>Create First Ding</strong>
            </div>
          </div>
        ) : (
          this.state.dings.length > 0 &&
          this.state.dings.map(this.mapDingToDisplay)
        )}
      </InfiniteScroll>
    );
  }
}
