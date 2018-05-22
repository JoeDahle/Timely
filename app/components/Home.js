// @flow
import React, { Component } from "react";
import { Link } from "react-router-dom";
import styles from "./Home.css";
import Modal from "react-modal";
import CircularProgressbar from "react-circular-progressbar";
import GradientSVG from "./Grad";
// import "react-circular-progressbar/dist/styles.css";

type Props = {};

const customStyles = {
  content: {
    position: "relative",
    top: "50%",
    left: "50%",
    width: "200px",
    height: "200px",
    borderRadius: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#93edac"
  }
};

// Modal.setAppElement(".container");

export default class Home extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);
    this.state = {
      elapsedMin: 0,
      workPeriod: 30,
      minLeft: 30,
      modalIsOpen: false,
      percentage: 100
    };
    this.tick = this.tick.bind(this);
    this.handleAlert = this.handleAlert.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.getPercentage = this.getPercentage.bind(this);
  }

  componentDidMount() {
    this.timer = setInterval(this.tick, 60000);
    this.setState({
      minLeft: this.state.workPeriod
    });
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  handleAlert() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState(
      {
        modalIsOpen: false,
        minLeft: this.state.workPeriod,
        elapsedMin: 0
      },
      () => {
        this.getPercentage();
      }
    );
  }

  getPercentage() {
    this.setState({
      percentage: Math.floor(this.state.minLeft * 100 / this.state.workPeriod)
    });
    return true;
  }

  tick() {
    this.setState(
      {
        elapsedMin: this.state.elapsedMin + 1,
        minLeft: this.state.minLeft - 1
      },
      () => {
        this.getPercentage();
        if (this.state.minLeft === 0) {
          this.handleAlert();
        }
      }
    );
  }

  render() {
    return (
      <div className="container__home">
        <div className={styles.container} data-tid="container">
          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Timely Reminder"
            ariaHideApp={false}
          >
            <h2 className="modal__text">
              <button className="modal__button" onClick={this.closeModal}>
                Get back at it
              </button>
            </h2>
          </Modal>
        </div>
        <div className="container__timely">
          <div className="container__progress">
            <div className="progress__text">
              <h1>{this.state.minLeft}</h1>
              <p>Min Left</p>
            </div>

            <CircularProgressbar
              percentage={this.state.percentage}
              textForPercentage={null}
            />
            <GradientSVG
              startColor={"#48BBC4"}
              endColor={"#C44871"}
              idCSS="idCSS"
              rotation={"-10"}
            />
          </div>
        </div>
      </div>
    );
  }
}
