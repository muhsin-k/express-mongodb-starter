import React from "react";
import { connect } from "react-redux";

import "./ViewContact.css";
import { getSingleContact } from "../../actions/index";

class ViewContact extends React.Component {
  constructor(props) {
    super(props);
    this.backToHome = this.backToHome.bind(this);
  }

  componentDidMount() {
    this.props.getSingleContact({
      _id: this.props.match.params.id
    });
  }
  backToHome() {
    this.props.history.push("");
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
        <div>
          <div className="row view-contact">
            <div className="col s8">
              {this.props.singleContact.firstName && (
                <div className="row additional">
                  <div className="col s2" />
                  <div className="col s4 ">First Name</div>
                  <div className="col s4">
                    {this.props.singleContact.firstName}
                  </div>
                  <div className="col s2" />
                </div>
              )}
              {this.props.singleContact.lastName && (
                <div className="row additional">
                  <div className="col s2" />
                  <div className="col s4 ">Last Name</div>
                  <div className="col s4">
                    {this.props.singleContact.lastName}
                  </div>
                  <div className="col s2" />
                </div>
              )}
              {this.props.singleContact.phoneNo && (
                <div className="row additional">
                  <div className="col s2" />
                  <div className="col s4 ">Phone Number</div>
                  <div className="col s4">
                    {this.props.singleContact.phoneNo}
                  </div>
                  <div className="col s2" />
                </div>
              )}
              {this.props.singleContact.email && (
                <div className="row additional">
                  <div className="col s2" />
                  <div className="col s4 ">Email</div>
                  <div className="col s4">{this.props.singleContact.email}</div>
                  <div className="col s2" />
                </div>
              )}
              {this.props.singleContact.organization && (
                <div className="row additional">
                  <div className="col s2" />
                  <div className="col s4 ">Organization</div>
                  <div className="col s4">
                    {this.props.singleContact.organization}
                  </div>
                  <div className="col s2" />
                </div>
              )}
              {this.props.singleContact.title && (
                <div className="row additional">
                  <div className="col s2" />
                  <div className="col s4 ">Title</div>
                  <div className="col s4">{this.props.singleContact.title}</div>
                  <div className="col s2" />
                </div>
              )}
              {this.props.singleContact.description && (
                <div className="row additional">
                  <div className="col s2" />
                  <div className="col s4 ">Description</div>
                  <div className="col s4">
                    {this.props.singleContact.description}
                  </div>
                  <div className="col s2" />
                </div>
              )}
            </div>
            <div className="col s4">
              {this.props.singleContact.profilePic && (
                <img
                  src={this.props.singleContact.profilePic}
                  width="200"
                  height="200"
                  alt="profile-pic"
                />
              )}
            </div>
          </div>
          <div className="row back-button">
            <button
              className="btn waves-effect waves-light auth-button"
              type="submit"
              name="action"
              onClick={this.backToHome}
            >
              Back to home
            </button>
          </div>
        </div>
      );
    }
  }
}
function bindAction(dispatch) {
  return {
    getSingleContact: obj => dispatch(getSingleContact(obj))
  };
}
function mapStateToProps(state) {
  return {
    singleContact: state.contacts.singleContact,
    isFetching: state.contacts.isFetching
  };
}

export default connect(mapStateToProps, bindAction)(ViewContact);
