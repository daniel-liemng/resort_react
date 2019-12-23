import React, { Component } from "react";

import { RoomContext } from "../context";
import Loading from "./Loading";
import Title from "./Title";
import Room from "./Room";

class FeaturedRooms extends Component {
  static contextType = RoomContext;
  render() {
    // EXAMPLE
    // value is obj hold { greeting, name } in state of context
    // const value = this.context;
    // const { loading } = this.context;
    // console.log(loading);

    let { loading, featuredRooms: rooms } = this.context;
    // console.log("from featured", rooms);
    rooms = rooms.map(room => {
      return <Room key={room.id} room={room} />;
    });

    return (
      <section className="featured-rooms">
        <Title title="featured rooms" />
        <div className="featured-rooms-center">
          {loading ? <Loading /> : rooms}
        </div>
      </section>
    );
  }
}

export default FeaturedRooms;
