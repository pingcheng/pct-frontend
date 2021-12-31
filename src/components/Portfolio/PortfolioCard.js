import React, { Component } from "react";
import PropTypes from "prop-types";

export class PortfolioCard extends Component {

    static propTypes = {
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
    };

    render() {
        return (
            <div
                className="portfolio-card"
                style={{
                    backgroundImage: `url(${this.props.image})`
                }}
            >
                <div className="absolute bottom-0 p-2 text-gray-200" style={{
                    zIndex: 10
                }}>
                    <div className="text-sm font-bold">{this.props.name}</div>
                    <div className="text-xs">{this.props.description}</div>
                </div>
            </div>
        );
    }
}