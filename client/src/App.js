import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Home from './scenes/Home';
import { setLists } from './redux/actions';

class App extends Component {
  componentDidMount() {
    this.props.setLists();
  }
  render() {
    return (
      <>
        <Header/>
        <Home/>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setLists: () => dispatch(setLists())
  }
}

export default connect(null,mapDispatchToProps)(App);
