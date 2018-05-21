// @flow
import React, { Component } from 'react';
import Home from '../components/Home';

type Props = {};

export default class HomePage extends Component<Props> {
  props: Props;

  getNow() {
    return Date.now();
  }

  render() {

    return (
      <Home start={this.getNow()}/>
    );
  }
}
