import React, { Component } from "react";

import { RoomContext } from "../context";

class FeaturedRooms extends Component {
  static contextType = RoomContext;
  render() {
    // EXAMPLE
    // value is obj hold { greeting, name } in state of context
    // const value = this.context;
    // const { loading } = this.context;
    // console.log(loading);

    const { featuredRooms: rooms } = this.context;
    console.log("from featured", rooms);

    return <div>FeaturedRooms</div>;
  }
}

export default FeaturedRooms;
