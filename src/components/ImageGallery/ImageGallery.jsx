import { Component } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from './ImageGalleryItem';
import css from './ImageGallery.module.css';

class ImageGallery extends Component {
  state = {
    showModalWindow: false,
  };

  render() {
    return (
      <ul className={css.gallery}>
        {this.props.images.map(image => (
          <ImageGalleryItem
            key={image.id}
            image={image}
            onClick={() => {
              this.props.onShowModal(image);
            }}
          />
        ))}
      </ul>
    );
  }
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object),
  onShowModal: PropTypes.func,
};

export default ImageGallery;
