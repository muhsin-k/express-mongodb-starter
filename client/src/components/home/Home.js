import React from "react";
import { connect } from "react-redux";
import Contact from "../contact/Contact";
import ReactModal from "react-modal";
import "./home.css";
import { fetchContacts, deleteContact } from "../../actions/index";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};
ReactModal.setAppElement("#root");
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showConfirmModal: false,
      selectedId: null
    };
    this.editContact = this.editContact.bind(this);
    this.viewContact = this.viewContact.bind(this);
    this.deleteContact = this.deleteContact.bind(this);
    this.searchContact = this.searchContact.bind(this);
    this.addContact = this.addContact.bind(this);
    this.openConfirmModal = this.openConfirmModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.onSubmitConfirmModal = this.onSubmitConfirmModal.bind(this);
  }
  openConfirmModal(key) {
    this.setState({
      showConfirmModal: true
    });
  }
  onSubmitConfirmModal(key) {
    this.setState({ showConfirmModal: false });
    if (this.state.selectedId) {
      this.props.deleteContact({
        _id: this.state.selectedId
      });
    }
  }
  handleCloseModal() {
    this.setState({
      showConfirmModal: false
    });
  }

  deleteContact(key) {
    this.setState({
      showConfirmModal: true,
      selectedId: key.id
    });
  }
  viewContact(key) {
    this.props.history.push("view/" + key.id);
  }
  editContact(key) {
    this.props.history.push("edit/" + key.id);
  }
  addContact() {
    this.props.history.push("add");
  }
  searchContact() {
    this.props.history.push("search");
  }
  renderAddButton() {
    return (
      <div className="fixed-action-btn">
        <div className="btn-floating btn-large red" onClick={this.addContact}>
          <i className="material-icons">add</i>
        </div>
      </div>
    );
  }
  componentDidMount() {
    this.props.fetchContacts();
  }
  render() {
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
      if (this.props.allContacts && this.props.allContacts.length) {
        return (
          <div className="row home">
            <div className="row ">
              <button
                className="btn waves-effect waves-light"
                type="submit"
                name="action"
                onClick={this.searchContact}
              >
                Search
                <i className="material-icons right">search</i>
              </button>
            </div>
            {this.props.allContacts.map((item, i) => (
              <div className="row" key={i}>
                <div className="col s2" />
                <div className="col s8 home-contact">
                  <Contact
                    firstName={item.firstName}
                    secondName={item.lastName}
                    email={item.email}
                    id={item._id}
                    profilePic={item.profilePic}
                    viewContact={this.viewContact.bind(this)}
                    editContact={this.editContact.bind(this)}
                    deleteContact={this.deleteContact.bind(this)}
                    showActions={true}
                  />
                </div>
                <div className="col s2" />
              </div>
            ))}
            {this.renderAddButton()}
            <ReactModal
              isOpen={this.state.showConfirmModal}
              contentLabel="onRequestClose Example"
              onRequestClose={this.handleCloseModal}
              shouldCloseOnOverlayClick={false}
              style={customStyles}
            >
              <div className="row text-center">
                <h6>Are you sure?</h6>
              </div>
              <div className="row">
                <div className="col s6">
                  {" "}
                  <button
                    className="btn waves-effect waves-light todo-add-cancel"
                    type="submit"
                    name="action"
                    onClick={this.handleCloseModal}
                  >
                    Cancel
                  </button>
                </div>
                <div className="col s6">
                  <button
                    className="btn waves-effect waves-light todo-add-submit"
                    type="submit"
                    name="action"
                    onClick={this.onSubmitConfirmModal}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </ReactModal>
          </div>
        );
      } else {
        return (
          <div className="row home">
            <div className="empty-text">Your contact list is empty</div>

            {this.renderAddButton()}
          </div>
        );
      }
    }
  }
}
function bindAction(dispatch) {
  return {
    fetchContacts: () => dispatch(fetchContacts()),
    deleteContact: obj => dispatch(deleteContact(obj))
  };
}
function mapStateToProps(state) {
  return {
    isFetching: state.contacts.isFetching,
    allContacts: state.contacts.contacts
  };
}

export default connect(mapStateToProps, bindAction)(Home);
