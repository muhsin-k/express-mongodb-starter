import React from "react";
import { connect } from "react-redux";
import "./EditContact.css";
import DefaultImage from "../../assets/default-image.png";
import {
  fetchFullContact,
  updateContact,
  getSingleContact
} from "../../actions/index";
class EditContact extends React.Component {
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

    this.handleUserInput = this.handleUserInput.bind(this);
    this.onSave = this.onSave.bind(this);
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
  onSave(e) {
    e.preventDefault();
    let reqObject = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.emailId,
      phoneNo: this.state.phoneNo,
      _id: this.props.match.params.id,
      description: this.state.description,
      organization: this.state.organization,
      title: this.state.title,
      profilePic: this.state.profilePic
    };

    this.props.updateContact(reqObject);
    setTimeout(() => {
      this.onCancel();
    }, 1000);
  }

  componentDidMount() {
    this.props.getSingleContact({
      _id: this.props.match.params.id
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      this.setState({
        emailId: nextProps.singleContact.email,
        firstName: nextProps.singleContact.firstName,
        lastName: nextProps.singleContact.lastName,
        phoneNo: nextProps.singleContact.phoneNo,
        description: nextProps.singleContact.description,
        organization: nextProps.singleContact.organization,
        title: nextProps.singleContact.title,
        profilePic: nextProps.singleContact.profilePic
      });
    }
  }

  renderSaveButton() {
    if (!this.props.isFetching) {
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
            <button className="btn waves-effect waves-light auth-button">
              Update
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
  renderProfilePic() {
    if (this.props.singleContact.profilePic) {
      return (
        <img
          src={this.props.singleContact.profilePic}
          width="100"
          height="100"
          alt="profilepic"
        />
      );
    }
    return <img src={DefaultImage} width="100" height="100" alt="profilepic" />;
  }
  render() {
    if (!this.props.isFetching) {
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
        <div className="add-contact">
          <form method="post" onSubmit={this.onSave}>
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
                {this.props.singleContact.organization && (
                  <div className="row additional">
                    <div className="col s6 ">Organization</div>
                    <div className="col s6">
                      {this.props.singleContact.organization}
                    </div>
                  </div>
                )}
                {this.props.singleContact.title && (
                  <div className="row additional">
                    <div className="col s6 ">Title</div>
                    <div className="col s6">
                      {this.props.singleContact.title}
                    </div>
                  </div>
                )}
                {this.props.singleContact.description && (
                  <div className="row additional">
                    <div className="col s6 ">Description</div>
                    <div className="col s6">
                      {this.props.singleContact.description}
                    </div>
                  </div>
                )}
                {this.renderSaveButton()}
              </div>

              <div />

              <div className="col s4">{this.renderProfilePic()}</div>
            </div>
          </form>
        </div>
      );
    }
  }
}
function bindAction(dispatch) {
  return {
    fetchFullContact: obj => dispatch(fetchFullContact(obj)),
    getSingleContact: obj => dispatch(getSingleContact(obj)),
    updateContact: obj => dispatch(updateContact(obj))
  };
}
function mapStateToProps(state) {
  return {
    singleContact: state.contacts.singleContact,
    fullContact: state.contacts.fullContact,
    isFullContactLoaded: state.contacts.isFullContactLoaded,
    isFetching: state.contacts.isFetching
  };
}

export default connect(mapStateToProps, bindAction)(EditContact);
