import { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/Modal/Modal';
import { GalleryItem } from './ImageGalleryItem.styled';

export default function ImageGalleryItem({ webformatURL, tags, largeURL }) {

  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(showModal => !showModal);
  };

  return (
      <GalleryItem>
        <img src={webformatURL} alt={tags} onClick={toggleModal} />
        {showModal && (
          <Modal onClose={toggleModal}>
            <img src={largeURL} alt={tags} />
          </Modal>
        )}
      </GalleryItem>
    );
}

ImageGalleryItem.propTypes = {
  url: PropTypes.string,
  tags: PropTypes.string.isRequired,
  largeUrl: PropTypes.string,
  toggleModal: PropTypes.func,
  webformatURL: PropTypes.string.isRequired,
};


// export class ImageGalleryItem extends Component {
//   state = {
//     showModal: false,
//   };

//   toggleModal = () => {
//     this.setState(({ showModal }) => ({ showModal: !showModal }));
//   };

//   render() {
//     const { webformatURL, tags, largeURL } = this.props;
//     const { toggleModal } = this;

//     return (
//       <GalleryItem>
//         <img src={webformatURL} alt={tags} onClick={toggleModal} />
//         {this.state.showModal && (
//           <Modal onClose={toggleModal}>
//             <img src={largeURL} alt={tags} />
//           </Modal>
//         )}
//       </GalleryItem>
//     );
//   }
// }

