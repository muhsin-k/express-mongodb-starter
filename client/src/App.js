import React, { Component } from "react";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import AddContact from "./components/addcontact/AddContact";
import SearchContact from "./components/searchcontact/SearchContact";
import ViewContact from "./components/viewcontact/ViewContact";
import EditContact from "./components/editcontact/EditContact";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./styles/style.css";
class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Header title="Contact Management" />
          <div>
            <Route exact path="/" component={Home} />
            <Route path="/add" component={AddContact} />
            <Route path="/search" component={SearchContact} />
            <Route path="/view/:id" component={ViewContact} />
            <Route path="/edit/:id" component={EditContact} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
