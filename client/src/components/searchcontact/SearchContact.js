import React from "react";
import Contact from "../contact/Contact";
import { connect } from "react-redux";

import "./SearchContact.css";
import { searchContacts } from "../../actions/index";

class SearchContact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      showEmptyMessage: false
    };
    this.searchContacts = this.searchContacts.bind(this);
    this.handleUserInput = this.handleUserInput.bind(this);
    this.editContact = this.editContact.bind(this);
    this.deleteContact = this.deleteContact.bind(this);
  }

  searchContacts() {
    this.setState({
      showEmptyMessage: true
    });
    this.props.searchContacts({
      searchQuery: this.state.searchText
    });
  }
  handleUserInput(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
    this.setState({
      showEmptyMessage: false
    });
  }
  editContact() {}
  deleteContact(key) {
    this.setState({
      showConfirmModal: true,
      selectedId: key.id
    });
  }

  renderItems() {
    if (this.props.contacts.contacts && this.props.contacts.contacts.length) {
      return (
        <div>
          {this.props.contacts.contacts.map((item, i) => (
            <div className="row home" key={i}>
              <div className="col s3 home-contact" />
              <div className="col s6 home-contact">
                <Contact
                  firstName={item.firstName}
                  secondName={item.lastName}
                  email={item.email}
                  id={item._id}
                  profilePic={item.profilePic}
                  showActions={false}
                  editContact={this.editContact.bind(this)}
                  deleteContact={this.deleteContact.bind(this)}
                />
              </div>
              <div className="col s3 home-contact" />
            </div>
          ))}
        </div>
      );
    } else {
      return (
        <div className="empty-text">
          {this.state.showEmptyMessage && "Empty search results"}
        </div>
      );
    }
  }
  render() {
    if (this.props.contacts.isFetching) {
      return (
        <div className="home">
          <div className="preloader-wrapper small active">
            <div className="spinner-layer spinner-green-only">
              <div className="circle-clipper left">
                <div className="circle" />
              </div>
              <div className="gap-patch">
                <div className="circle" />
              </div>
              <div className="circle-clipper right">
                <div className="circle" />
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="search-contact">
          <div className="row ">
            <div className="col s3 " />
            <div className="input-field col s6">
              <input
                id="searchText"
                type="text"
                className="validate"
                placeholder="Type something to narrow your search results..."
                name="searchText"
                value={this.state.searchText}
                onChange={this.handleUserInput.bind(this)}
              />
            </div>
            <div className="col s2 button-container">
              <a
                className="waves-effect waves-light btn"
                onClick={this.searchContacts.bind(this)}
              >
                <i className="material-icons left">search</i>
              </a>
            </div>
          </div>
          {this.renderItems()}
        </div>
      );
    }
  }
}
function bindAction(dispatch) {
  return {
    searchContacts: obj => dispatch(searchContacts(obj))
  };
}
function mapStateToProps(state) {
  return { contacts: state.contacts };
}

export default connect(mapStateToProps, bindAction)(SearchContact);
