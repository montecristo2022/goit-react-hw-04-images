import PropTypes from 'prop-types';

export default function ImageGalleryItem({
  openModal,
  largeImageURL,
  url,
  tag,
}) {
  return (
    <img
      onClick={() => {
        openModal(largeImageURL, tag);
      }}
      src={url}
      alt={tag}
    />
  );
}

ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};

