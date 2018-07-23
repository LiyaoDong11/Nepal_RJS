// @flow
import React, {Component} from 'react';
import LoginDetailsWrapper from '../../Components/LoginDetails/';
import {connect} from 'react-redux';
import {LoginDetailsActions, addEmail, addPassword, removeError} from './action';
import {bindActionCreators} from 'redux';
import ShowError from '../../Components/Error/ShowError';
import Modal from '../../Components/UI/Modal';

type Props = {
  onChange: Function,
  LoginDetailsActions:Function,
  LoginDetailsStates: Object,
  addEmail: Function,
  addPassword: Function,
}

// type State ={
//   email: string,
//   password: number,
// }


class LoginDetailsContainer extends Component<Props>{

  cancelErrorMessageHandler = () => {
    this.props.removeError();
  }
  render(){
    const {email, password, token, error} = this.props.LoginDetailsStates
    return(
      <div>
        <LoginDetailsWrapper
          email={email}
          password={password}
          token={token}
          onChangeEmail={this.props.addEmail}
          onChangePassword={this.props.addPassword}
          onClickButton={this.props.LoginDetailsActions}
        />
        {(error.hasError) && (
          <Modal modalFor="showError">
            <ShowError
            error={error.message}
            cancel = {this.cancelErrorMessageHandler}
            />
          </Modal>
        )}
      </div>
    );
  }
}

function mapStateToProps(state){
   return {
     LoginDetailsStates: state.LoginDetailsStates,
   }
}

function matchDispatchToProps(dispatch){
  return bindActionCreators(
    {
      LoginDetailsActions: LoginDetailsActions,
      addEmail: addEmail,
      addPassword: addPassword,
      removeError,
    }, dispatch
  );
}

export default connect(mapStateToProps, matchDispatchToProps)(LoginDetailsContainer);

//无论是function或者是props，在传递（从上到下往component里面传递）中，都感觉像是传递变量，无所谓区别
