import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

export default function ImageGallery({ hits, onOpenModal }) {

  return (
    <>
      <ul>
        {hits.map(({ id, webformatURL, largeImageURL, tags }) => {
          return (
            <li key={id}>
              <ImageGalleryItem
                url={webformatURL}
                largeImageURL={largeImageURL}
                tag={tags}
                openModal={onOpenModal}
              />
            </li>
          );
        })}
      </ul>
    </>
  );
}

ImageGallery.propTypes = {
  hits: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ),
};

