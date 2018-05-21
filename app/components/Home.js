// @flow
import React, { Component } from "react";
import { Link } from "react-router-dom";
import styles from "./Home.css";
import Modal from "react-modal";

type Props = {};

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#1e1e1e"
  }
};

// Modal.setAppElement(".container");

export default class Home extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);
    this.state = {
      elapsedMin: 0,
      workPeriod: 1,
      shouldAlert: true,
      modalIsOpen: false
    };
    this.tick = this.tick.bind(this);
    this.handleAlert = this.handleAlert.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    this.timer = setInterval(this.tick, 60000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  handleAlert() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({
      modalIsOpen: false,
      workPeriod: 30
    });
  }

  tick() {
    this.setState({
      elapsedMin: this.state.elapsedMin + 1,
      workPeriod: this.state.workPeriod - 1
    });
    if (this.state.workPeriod === 0) {
      this.handleAlert();
    }
  }

  render() {
    return (
      <div>
        <div className={styles.container} data-tid="container">
          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Example Modal"
            ariaHideApp={false}
          >
            <h2 onClick={this.closeModal}>Get back at it</h2>
          </Modal>
          <p>Take a breather in: {this.state.workPeriod} minutes</p>
        </div>
      </div>
    );
  }
}
