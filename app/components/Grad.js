import React, { Component } from "react";
import styles from "./Grad.css";

class GradientSVG extends Component {
  render() {
    let { startColor, endColor, idCSS, rotation } = this.props;

    let gradientTransform = `rotate(${rotation})`;

    return (
      <svg style={{ height: 0 }}>
        <defs>
          <linearGradient id={idCSS} gradientTransform={gradientTransform}>
            <stop offset="0%" stopColor={endColor} />
            <stop offset="100%" stopColor={startColor} />
          </linearGradient>
        </defs>
      </svg>
    );
  }
}

export default GradientSVG;
