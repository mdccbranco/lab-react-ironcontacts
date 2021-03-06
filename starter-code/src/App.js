import React, { Component } from "react";
// import logo from "./logo.svg";
import "./App.css";
import contacts from "./contacts.json";
import User from "../src/components/User.js";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: this.getFiveContacts()
    };
    this.addRandomContact = this.addRandomContact.bind(this);
    this.getFiveContacts = this.getFiveContacts.bind(this);
  }
  getFiveContacts() {
    const result = [];
    for (let i = 0; i < 5; i += 1) {
      const { name, pictureUrl, popularity } = contacts[i];
      console.log({ name, pictureUrl, popularity });
      result.push({ name, pictureUrl, popularity });
    }
    return result;
  }

  addRandomContact() {
    let random = Math.floor(Math.random() * (contacts.length - 5) + 5);
    const listCopy = [...this.state.list];
    listCopy.push(contacts[random]);
    this.setState({
      list: listCopy
    });
    console.log(listCopy);
  }

  sortByName() {
    const listCopy = [...this.state.list];
    listCopy.sort((a, b) => a.name.localeCompare(b.name));
    this.setState({
      list: listCopy
    });
    // console.log(listCopy)
  }

  sortByPopularity() {
    const listCopy = [...this.state.list];
    listCopy.sort((a, b) => a.popularity - b.popularity);
    this.setState({
      list: listCopy
    });
    // console.log(listCopy)
  }

  delete(indice){
    const listCopy = [...this.state.list];
    listCopy.splice(indice,1);
    this.setState({
      list: listCopy
    });
  }

  render() {
    // console.log(this.state.contacts[0].popularity)
    return (
      <div className="App">
        <h1>IronContacts</h1>
        <button onClick={() => this.addRandomContact()}>
          Add Random Contact
        </button>
        <button onClick={() => this.sortByName()}>Sort By Name</button>
        <button onClick={() => this.sortByPopularity()}>
          Sort By Popularity
        </button>

        <table>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Action</th>
          </tr>
          {this.state.list.map((item, idx) => {
            return (
              <tr>
                <User
                  key={idx}
                  name={item.name}
                  pictureUrl={item.pictureUrl}
                  popularity={item.popularity}
                />
                <button onClick={() => this.delete(idx)}>
                  Delete
                </button>
              </tr>
            );
          })}
        </table>
      </div>
    );
  }
}

export default App;
