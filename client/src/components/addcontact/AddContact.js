import React from "react";
import { connect } from "react-redux";
import "./AddContact.css";
import { fetchFullContact, addContact } from "../../actions/index";

class AddContact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      emailId: "",
      phoneNo: "",
      description: "",
      organization: "",
      title: "",
      profilePic: ""
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.handleUserInput = this.handleUserInput.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }
  handleUserInput(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  }
  onCancel() {
    this.props.history.push("");
  }
  onSave() {
    let reqObject = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.emailId,
      phoneNo: this.state.phoneNo
    };
    if (this.props.fullContact) {
      reqObject.description = this.props.fullContact.bio;
      reqObject.organization = this.props.fullContact.organization;
      reqObject.title = this.props.fullContact.title;
      reqObject.profilePic = this.props.fullContact.avatar;
    }
    this.props.addContact(reqObject);
    setTimeout(() => {
      this.onCancel();
    }, 400);
  }
  onSubmit(e) {
    e.preventDefault();
    this.props.fetchFullContact({
      email: this.state.emailId
    });
  }

  renderSubmitButton() {
    if (this.props.isFetching) {
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
        <div className="row add-contact-div">
          <button
            className="btn waves-effect waves-light auth-button"
            name="action"
          >
            Submit
          </button>
        </div>
      );
    }
  }
  renderSaveButton() {
    if (this.props.isFetching) {
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
        <div className="row add-contact-div">
          <div className="col s6">
            <button
              className="btn waves-effect waves-light auth-button"
              type="submit"
              name="action"
              onClick={this.onSave}
            >
              Save
            </button>
          </div>
          <div className="col s6">
            <button
              className="btn waves-effect waves-light auth-button"
              type="submit"
              name="action"
              onClick={this.onCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      );
    }
  }
  renderFullContact() {
    if (this.props.fullContact) {
      if (
        this.props.fullContact.title ||
        this.props.fullContact.organization ||
        this.props.fullContact.bio
      ) {
        return (
          <div>
            <div className="row heading">Details from FULLCONTACT</div>
            {this.props.fullContact.organization && (
              <div className="row additional">
                <div className="col s6 ">Organization</div>
                <div className="col s6">
                  {this.props.fullContact.organization}
                </div>
              </div>
            )}
            {this.props.fullContact.title && (
              <div className="row additional">
                <div className="col s6 ">Title</div>
                <div className="col s6">{this.props.fullContact.title}</div>
              </div>
            )}
            {this.props.fullContact.bio && (
              <div className="row additional">
                <div className="col s6 ">Description</div>
                <div className="col s6">{this.props.fullContact.bio}</div>
              </div>
            )}
          </div>
        );
      } else if (this.props.fullContact.avatar) {
        return <div />;
      } else {
        return <div className="row heading">No details from fullContact</div>;
      }
    } else {
      return <div className="row heading"> No details from fullContact</div>;
    }
  }
  renderProfilePic() {
    if (this.props.fullContact.avatar) {
      return (
        <img
          src={this.props.fullContact.avatar}
          width="200"
          height="200"
          alt="profile-pic"
        />
      );
    } else {
      return <div />;
    }
  }
  render() {
    return (
      <div className="add-contact">
        <form method="post" onSubmit={this.onSubmit}>
          <div className="row">
            <div className="col s8">
              <div className="row">
                <div className="input-field col s12">
                  <input
                    id="firstName"
                    type="text"
                    className="validate"
                    placeholder="First Name"
                    name="firstName"
                    value={this.state.firstName}
                    onChange={this.handleUserInput.bind(this)}
                    required={true}
                  />
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input
                    id="lastName"
                    type="text"
                    className="validate"
                    placeholder="Last Name"
                    name="lastName"
                    value={this.state.lastName}
                    onChange={this.handleUserInput.bind(this)}
                    required={true}
                  />
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input
                    id="phoneNo"
                    type="number"
                    className="validate"
                    placeholder="Phone Number"
                    name="phoneNo"
                    value={this.state.phoneNo}
                    onChange={this.handleUserInput.bind(this)}
                    required={true}
                  />
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input
                    id="emailId"
                    type="email"
                    className="validate"
                    placeholder="Email"
                    name="emailId"
                    required={true}
                    value={this.state.emailId}
                    onChange={this.handleUserInput.bind(this)}
                  />
                </div>
              </div>
              {this.renderSubmitButton()}
              {this.props.isFullContactLoaded && this.renderFullContact()}
              {this.props.isFullContactLoaded && this.renderSaveButton()}
            </div>

            <div className="col s4" />
            {this.props.isFullContactLoaded &&
              this.props.fullContact &&
              this.renderProfilePic()}
          </div>
        </form>
      </div>
    );
  }
}
function bindAction(dispatch) {
  return {
    fetchFullContact: obj => dispatch(fetchFullContact(obj)),
    addContact: obj => dispatch(addContact(obj))
  };
}
function mapStateToProps(state) {
  return {
    isFetching: state.contacts.isFetching,
    fullContact: state.contacts.fullContact,
    isFullContactLoaded: state.contacts.isFullContactLoaded
  };
}

export default connect(mapStateToProps, bindAction)(AddContact);
