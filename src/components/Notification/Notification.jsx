import React from 'react';
import PropTypes from 'prop-types';
import { Notificat } from './Notification.styled';

const Notification = ({ text }) => {
  return <Notificat>{text}</Notificat>;
};

export default Notification;

Notification.propTypes = {
  text: PropTypes.string,
};