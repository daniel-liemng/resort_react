import React, { Component } from "react";

import items from "./data";

const RoomContext = React.createContext();
// Provider: hold info
// Consumer: access info
// <RoomContext.Provider value={} >

class RoomProvider extends Component {
  state = {
    rooms: [],
    sortedRooms: [],
    featuredRooms: [],
    loading: true
  };

  // getData

  // update state when mounting
  componentDidMount() {
    // THIS.GETDATA later

    // items here is import from data.js and are formated cleaner
    let rooms = this.formatData(items);
    console.log("component did mount", rooms);
    let featuredRooms = rooms.filter(room => room.featured === true);
    // update state
    this.setState({
      rooms,
      sortedRooms: rooms,
      featuredRooms,
      loading: false
    });
  }

  // items here is params of function
  // return an array of rooms with the customized data
  // MAKE DATA CLEANER TO READ
  formatData(items) {
    // extract data from data.js and format it to the data we want it to be
    let tempItems = items.map(item => {
      let id = item.sys.id;
      let images = item.fields.images.map(image => image.fields.file.url);

      // Copy all properties in fiels and ADD images to it to make new data for room
      let room = { ...item.fields, images, id };
      return room;
    });
    return tempItems;
  }
  render() {
    return (
      <RoomContext.Provider value={{ ...this.state }}>
        {this.props.children}
      </RoomContext.Provider>
    );
  }
}

const RoomConsumer = RoomContext.Consumer;

export { RoomProvider, RoomConsumer, RoomContext };
