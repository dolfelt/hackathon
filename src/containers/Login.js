import React from 'react';
import {connect} from 'react-redux';
import {firebaseConnect, helpers} from 'react-redux-firebase';
import {Button} from 'reactstrap';

const {dataToJS} = helpers;

export const Login = ({firebase, permission}) => {
  const beginSignin = () => {
    firebase.login({ provider: 'google', type: 'popup' }).then((auth) => {
      firebase.set(`/users/${auth.uid}`, {
        name: auth.displayName,
        email: auth.email,
        avatar: auth.photoURL,
      });
    })
  };
  return (
    <div style={{textAlign: 'center', marginTop: 100}}>
      <Button
        onClick={beginSignin}
        color="info"
      >
        <i className="fa fa-google" /> Login with Google
      </Button>
    </div>
  )
}

export default connect(
  ({firebase}) => ({
    permission: dataToJS(firebase, '/permission'),
  })
)(
  firebaseConnect([
    '/permission',
  ])(Login)
);
