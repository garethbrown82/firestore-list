import React, { Component } from 'react';
import { fire, firestoreDb } from './fire';
import firebase from 'firebase';
import { AddItem } from './AddItem';
  

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: ['a', 'b', 'c']
    }
  }
  
  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        initialiseOnsnapshotListener(user.uid);
        console.log("onAuthStateChanged: ", user);
      } else {
        console.log("onAuthStateChanged user logged out");
      }
    });
    
    const initialiseOnsnapshotListener = (userId) => {
      const itemsCollection = firestoreDb.collection('users').doc(userId).collection('items');
      itemsCollection.orderBy('timeAdded').onSnapshot((querySnapshot) => {
        this.clearList();
        querySnapshot.forEach((doc) => {
          console.log("Here is the doc object: ", doc);
          const item = doc.data().item;
          this.setState({
            items: this.state.items.concat(item)
          });
        });
      });
    }
  }

  clearList = () => {
    this.setState({
      items: []
    });
  }
  
  login = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    console.log(provider);
    fire.auth().signInWithPopup(provider).then((data) => {
      // Add a check here that only sets the user if they are not already there
      // Do this once I know how to retrieve data
      firestoreDb.collection('users').doc(data.user.uid).set({
        userId: data.user.uid,
        userName: data.user.displayName,
        email: data.user.email,
      })
    })
  }
  
  logout = () => {
    fire.auth().signOut();
  }

  logUserToConsole = () => {
    const currentUser = fire.auth().currentUser;
    if (currentUser) {
      const userDetails = {
        name: currentUser.displayName,
        email: currentUser.email,
        userId: currentUser.uid
      }
      console.log("user details: ", userDetails);
    } else {
      console.log("There are no logged in users.")
    }
  }

  databaseDetails = () => {
    const currentUser = fire.auth().currentUser;
    firestoreDb.collection('users').doc(currentUser.uid).get().then((snapShot) => {
      console.log(snapShot.data());
    })
  }

  addItemToFirebase = (item) => {
    const currentUser = fire.auth().currentUser;
    if (currentUser) {
      const date = new Date();
      firestoreDb.collection('users').doc(currentUser.uid).collection('items').add({
        timeAdded: date.getTime(),
        item: item
      }).then((docRef) => {
        console.log(`Add ${docRef.id} to firebase. docRef: `, docRef);
      }).catch((error) => {
        console.error("Error adding document: ", error)
      });
    } else {
      console.log("There are no users");
    }
  }

  render() {
    return (
      <div className="col-lg-8 offset-lg-2 mt-3">
        <button className="btn btn-primary mr-3" onClick={this.login}>Login</button>
        <button className="btn btn-default mr-3" onClick={this.logout}>Logout</button>
        <button className="btn btn-link" onClick={this.logUserToConsole}>Log to console</button>
        <button className="btn btn-link" onClick={this.databaseDetails}>Database details</button>
        <AddItem addItem={this.addItemToFirebase} />
        <ul>
          {this.state.items.map((item, index) => <li key={index}>{item}</li>)}
        </ul>
      </div>
    );
  }
}

export default App;
