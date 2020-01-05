import React, { Component } from "react";

// import items from "./data";
import Client from "./Contentful";
// test contentful
// Client.getEntries({
//   content_type: "beachResort"
// }).then(res => console.log(res.items));

const RoomContext = React.createContext();
// Provider: hold info
// Consumer: access info
// <RoomContext.Provider value={} >

class RoomProvider extends Component {
  state = {
    rooms: [],
    sortedRooms: [],
    featuredRooms: [],
    loading: true,
    type: "all",
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    breakfast: false,
    pets: false
  };

  // getData
  getData = async () => {
    try {
      let res = await Client.getEntries({
        content_type: "beachResort",
        // order: "sys.createdAt"
        order: "-fields.price"
      });
      // items here is import from data.js and are formated cleaner
      let rooms = this.formatData(res.items);

      // console.log("component did mount", rooms);
      let featuredRooms = rooms.filter(room => room.featured === true);

      // set maxPrice is the biggest price in data
      let maxPrice = Math.max(...rooms.map(item => item.price));
      // console.log(maxPrice);

      // set maxSize is the biggest size in data
      let maxSize = Math.max(...rooms.map(item => item.size));
      // console.log(maxSize);

      // update state
      this.setState({
        rooms,
        sortedRooms: rooms,
        featuredRooms,
        loading: false,
        price: maxPrice,
        maxPrice,
        maxSize
      });
    } catch (error) {
      console.log(error);
    }
  };

  // update state when mounting
  componentDidMount() {
    // THIS.GETDATA later
    this.getData();

    // USE Contentful INSTEAD
    // // items here is import from data.js and are formated cleaner
    // let rooms = this.formatData(items);

    // // console.log("component did mount", rooms);
    // let featuredRooms = rooms.filter(room => room.featured === true);

    // // set maxPrice is the biggest price in data
    // let maxPrice = Math.max(...rooms.map(item => item.price));
    // // console.log(maxPrice);

    // // set maxSize is the biggest size in data
    // let maxSize = Math.max(...rooms.map(item => item.size));
    // // console.log(maxSize);

    // // update state
    // this.setState({
    //   rooms,
    //   sortedRooms: rooms,
    //   featuredRooms,
    //   loading: false,
    //   price: maxPrice,
    //   maxPrice,
    //   maxSize
    // });
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

  // getRoom
  getRoom = slug => {
    let tempRooms = [...this.state.rooms];
    const room = tempRooms.find(room => room.slug === slug);
    return room;
  };

  // handle change for select-option
  // handleChange = event => {
  //   const type = event.target.type;
  //   const name = event.target.name;
  //   const value = event.target.value;
  //   console.log(type, name, value);
  // };

  // handle change for checkbox and all
  handleChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState(
      {
        [name]: value
      },
      this.filterRooms
    );
  };

  // filter rooms
  filterRooms = () => {
    // console.log("hello filter");
    let {
      rooms,
      type,
      capacity,
      price,
      minSize,
      maxSize,
      breakfast,
      pets
    } = this.state;
    // all the rooms
    let tempRooms = [...rooms];
    // transform value
    capacity = parseInt(capacity);
    price = parseInt(price);

    // filter by type
    if (type !== "all") {
      tempRooms = tempRooms.filter(room => room.type === type);
    }

    // filter by capacity
    if (capacity !== 1) {
      tempRooms = tempRooms.filter(room => room.capacity >= capacity);
    }

    // filter by price
    tempRooms = tempRooms.filter(room => room.price <= price);

    // filter by size
    tempRooms = tempRooms.filter(
      room => room.size >= minSize && room.size <= maxSize
    );

    // filter by checkbox - breakfast
    if (breakfast) {
      tempRooms = tempRooms.filter(room => room.breakfast === true);
    }

    // filter by checkbox - pets
    if (pets) {
      tempRooms = tempRooms.filter(room => room.pets === true);
    }

    // change state
    this.setState({
      sortedRooms: tempRooms
    });
  };

  render() {
    return (
      <RoomContext.Provider
        value={{
          ...this.state,
          getRoom: this.getRoom,
          handleChange: this.handleChange
        }}
      >
        {this.props.children}
      </RoomContext.Provider>
    );
  }
}

const RoomConsumer = RoomContext.Consumer;

// Higher Order Component
export function withRoomConsumer(Component) {
  return function ConsumerWrapper(props) {
    return (
      <RoomConsumer>
        {value => <Component {...props} context={value} />}
      </RoomConsumer>
    );
  };
}

export { RoomProvider, RoomConsumer, RoomContext };
