import React, { Component } from "react";
import PropTypes from "prop-types";
import DefaultImage from "../../assets/default-image.png";
import "./Contact.css";
class Contact extends Component {
  deleteContact() {
    this.props.deleteContact(this.props);
  }
  editContact() {
    this.props.editContact(this.props);
  }
  viewContact() {
    this.props.viewContact(this.props);
  }
  renderProfilePic() {
    if (this.props.profilePic) {
      return (
        <img
          src={this.props.profilePic}
          width="100"
          height="100"
          alt="profilepic"
        />
      );
    }
    return <img src={DefaultImage} width="100" height="100" alt="profilepic" />;
  }
  renderActionButtons() {
    if (this.props.showActions) {
      return (
        <div className="row">
          <div className="col s4 button-container">
            <a
              className="waves-effect waves-light btn"
              onClick={this.viewContact.bind(this)}
            >
              <i className="material-icons left">info</i>
            </a>
          </div>

          <div className="col s4 button-container">
            <a
              className="waves-effect waves-light btn"
              onClick={this.editContact.bind(this)}
            >
              <i className="material-icons left">edit</i>
            </a>
          </div>
          <div className="col s4 button-container">
            <a
              className="waves-effect waves-light btn"
              // onClick={props.deleteContact(props)}
              onClick={this.deleteContact.bind(this)}
            >
              <i className="material-icons left">delete</i>
            </a>
          </div>
        </div>
      );
    } else {
      return <div />;
    }
  }
  render() {
    return (
      <div className="contact">
        <div className="row main-area ">
          <div className="col s4">{this.renderProfilePic()}</div>
          <div className="col s8">
            <div className="row">
              <p>
                {this.props.firstName} {this.props.secondName}
              </p>
              <p>{this.props.email} </p>
            </div>
            {this.renderActionButtons()}
          </div>
        </div>
      </div>
    );
  }
}
Contact.propTypes = {
  title: PropTypes.string,
  firstName: PropTypes.string,
  secondName: PropTypes.string
};

export default Contact;
