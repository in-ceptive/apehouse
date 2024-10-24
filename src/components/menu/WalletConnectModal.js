import React from 'react';
import { Modal } from 'react-bootstrap';
const WalletConnectModal = ({ show, handleClose, children }) => {
  return (
    <Modal show={show} onHide={handleClose} backdrop keyboard={false} size='sm'
      centered >


      {children}

    </Modal >
  );
};

export default WalletConnectModal;
