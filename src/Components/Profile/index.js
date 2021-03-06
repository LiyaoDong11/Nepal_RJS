import React , {Component} from 'react';
import Header from './Header';
import MyDetails from './MyDetails';
import AccountDetails from './AccountDetails';
import Footer from './Footer';
import './Profile.css';

import './Profile.css';
import {Button,ImagePicker, Modal, ActivityIndicator} from 'antd-mobile';

const data = [];
function closest(el, selector) {
  const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
  while (el) {
    if (matchesSelector.call(el, selector)) {
      return el;
    }
    el = el.parentElement;
  }
  return null;
}
// The first level of the profile page, separates into 4 sections:
// Header: background image, and ImagePicker,
// MyDetails: name, birthday, height,weight
// AccountDetails: change password, change Email
// Footer: View terms, logout

class Profile extends Component{
  constructor(props) {
    super(props)
    this.state={
      files: data,
      // modal: false,
      animating: false,
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.name !== prevProps.name) {
      this.updateFinish();
    }

  }

  updateFinish() {
    this.setState({ animating: false });
  }

  updataBegin() {
    this.setState({ animating: true });
  }

  showModal = key => (e) => {
    e.preventDefault(); // 修复 Android 上点击穿透
    this.setState({
      [key]: true,
    });
  }
  onClose = key => () => {
    this.setState({
      [key]: false,
    });
  }
  onWrapTouchStart = (e) => {
    // fix touch to scroll background page on iOS
    if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
      return;
    }
    const pNode = closest(e.target, '.am-modal-content');
    if (!pNode) {
      e.preventDefault();
    }
  }
  onChange = (files, type, index) => {
    console.log(files);
    this.setState({
      files,
    });
  };

  onCloseWithUpload = (file) => {
    this.props.uploadPicture(file);
    this.onClose('modal')();
    this.updataBegin();
  }

  render(){
    return (
      <div className="profile-container">
      <div className= "profile-image-containers">
          <Header name={this.props.name} url={this.props.fields.photo} updateFinish={()=>this.updateFinish()}/>
      </div>
        <div className="profile-list-view-container">

        <Modal
          visible={this.state.modal}
          transparent
          maskClosable={false}
          onClose={this.onClose('modal')}
          title="Title"
          footer={[{ text: 'Ok', onPress: () => { this.state.files.length===0 ? this.onClose('modal')() : this.onCloseWithUpload(this.state.files[0].file) } }]}
          wrapProps={{ onTouchStart: this.onWrapTouchStart }}
        >
          <div>
          <ImagePicker
            length="1"
            files={this.state.files}
            onChange={this.onChange}
            onImageClick={(index, fs) => console.log(index, fs)}
            selectable={this.state.files.length < 1}
              />
          </div>
        </Modal>
        <MyDetails
            name={this.props.name}
            heightArray={this.props.heightArray}
            weightArray={this.props.weightArray}
            nameHandler={this.props.nameHandler}
            selectBirthDate={this.props.selectBirthDate}
            selectHeight={this.props.selectHeight}
            selectWeight={this.props.selectWeight}
            fields={this.props.fields}
            uploadPicture={this.props.uploadPicture}
            updateFinish={() => this.updateFinish()}
            updateName={this.props.updateName}
            updateBOD={this.props.updateBOD}
            updateWeight={this.props.updateWeight}
            updateHeight={this.props.updateHeight}
        />
       <Button  className="change-avatar-button" onClick={this.showModal('modal')}>Change Avatar</Button>
      <ActivityIndicator
        toast
        text="updating..."
        animating={this.state.animating}
      />


          <AccountDetails
            updataPassword={this.props.updataPassword}
            selectEmail={this.props.selectEmail}
            fields={this.props.fields}
            passError={this.props.passError}
            files={this.state.files}
            updateFinish={() => this.updateFinish()}
            updataBegin={()=>this.updataBegin()}
      />
      <Footer onLogoutHandler={this.props.onLogoutHandler}/>
      </div>
      </div>
    );
  }
}

export default Profile;
