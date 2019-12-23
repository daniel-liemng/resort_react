import React, { Component } from "react";
import { FaCocktail, FaHiking, FaShuttleVan, FaBeer } from "react-icons/fa";

import Title from "./Title";

class Services extends Component {
  state = {
    services: [
      {
        icon: <FaCocktail />,
        title: "free cocktail",
        info:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, consequuntur."
      },
      {
        icon: <FaHiking />,
        title: "free hiking",
        info:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, consequuntur."
      },
      {
        icon: <FaShuttleVan />,
        title: "free shuttle van",
        info:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, consequuntur."
      },
      {
        icon: <FaBeer />,
        title: "free beer",
        info:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, consequuntur."
      }
    ]
  };
  render() {
    return (
      <section className="services">
        <Title title="services" />
        <div className="services-center">
          {this.state.services.map((service, index) => {
            return (
              <article key={index} className="service">
                <span>{service.icon}</span>
                <h6>{service.title}</h6>
                <p>{service.info}</p>
              </article>
            );
          })}
        </div>
      </section>
    );
  }
}

export default Services;
