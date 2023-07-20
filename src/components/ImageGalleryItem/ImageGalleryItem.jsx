import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/Modal/Modal';
import { GalleryItem } from './ImageGalleryItem.styled';

export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const { webformatURL, tags, largeURL } = this.props;
    const { toggleModal } = this;

    return (
      <GalleryItem>
        <img src={webformatURL} alt={tags} onClick={toggleModal} />
        {this.state.showModal && (
          <Modal onClose={toggleModal}>
            <img src={largeURL} alt={tags} />
          </Modal>
        )}
      </GalleryItem>
    );
  }
}

ImageGalleryItem.propTypes = {
  url: PropTypes.string,
  tags: PropTypes.string.isRequired,
  largeUrl: PropTypes.string,
  toggleModal: PropTypes.func,
  webformatURL: PropTypes.string.isRequired,
};
