import React from 'react';
import PropTypes from 'prop-types';
import { logout } from '../api/api';
import { Navigate } from 'react-router-dom';


export default function Logout(props) {
  if (props.currentUser) {
    logout()
    return null
  }
  else {
    return <Navigate to='/Login' replace></Navigate>
  }
}
