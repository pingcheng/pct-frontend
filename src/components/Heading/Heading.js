import React, { Component } from "react";
import PropTypes from "prop-types";

/**
 * Heading component.
 */
export class Heading extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
      PropTypes.object,
    ]),
    align: PropTypes.string,
    level: PropTypes.number,
    className: PropTypes.string,
  };

  static defaultProps = {
    subTitle: null,
    align: "left",
    level: 1,
    className: "",
  };

  render() {
    let subTitle = "";

    if (this.props.subTitle) {
      subTitle = (
        <div className="text-sm text-gray-500">{this.props.subTitle}</div>
      );
    }

    return (
      <div>
        <h1
          className={`mb-8 ${this.props.className}`}
          style={{
            textAlign: this.props.align,
          }}
        >
          <div>{this.props.title}</div>
          {subTitle}
        </h1>
      </div>
    );
  }
}
