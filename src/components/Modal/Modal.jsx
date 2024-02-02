import PropTypes from 'prop-types';
import css from './Modal.module.css';

const Modal = ({ image, onClose }) => {
  return (
    <div className={css.overlay} onClick={onClose}>
      <div className={css.modal}>
        <img src={image.largeImageURL} alt={image.tags} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  image: PropTypes.object,
  onClose: PropTypes.func,
};

export default Modal;
