import React, { Component } from 'react';
import fire from './fire';
import firebase from 'firebase';

class App extends Component {
  login = () => {
    const provider = firebase.auth.GoogleAuthProvider();
    fire.auth().signInWithPopup(provider);
  }
  
  logout = () => {
    fire.auth().signOut();
  }

  logUserToConsole = () => {
    const user = fire.auth().currentUser;
    if (user) {
        console.log(user.displayName, user.email);
    } else {
        console.log("There are no logged in users.")
    }
  }

  render() {
    return (
      <div className="col-lg-8 offset-lg-2 mt-3">
        <button className="btn btn-primary" onClick={this.login}>Login</button>
        <button className="btn btn-default" onClick={this.logout}>Logout</button>
        <button className="btn btn-link" onClick={this.logUserToConsole}>Log to console</button>
      </div>
    );
  }
}

export default App;
