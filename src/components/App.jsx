import React, { useEffect, useState } from 'react';
import PictureErrorView from './PictureErrorView/PictureErrorView';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Loader from 'components/Loader/Loader';
import ButtonLoadMore from 'components/ButtnoLoadMore/ButtonLoadMore';
import Modal from 'components/Modal/Modal';

import Searchbar from './Searchbar/Searchbar';

export default function App() {
  const [pictureName, setPictureName] = useState('');
  const [page, setPage] = useState(1);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('idle');
  const [largeImageURL, setlargeImageURL] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [tags, setTags] = useState('');
  const [photo, setPhoto] = useState([]);
  const [searchTotal, setSearchTotal] = useState(null);
  const [oldName, setOldName] = useState('');

  const API_KEY = '31403834-67d7794be9df50ce2ee75ea48';

  useEffect(() => {
    // const oldPictureName = () => setPictureName(previousName => {
    //  return previousName
    // });
    // const oldPage = () => setPage(previousName => previousName);

    if (oldName !== pictureName) {
      setOldName(pictureName);
      setPhoto([]);
    }

    // oldPictureName !== pictureName || oldPage !== page &&
    if (pictureName !== '') {
      setStatus('pending');

      fetch(
        `https://pixabay.com/api/?key=${API_KEY}&q=${pictureName}&image_type=photo&page=${page}&per_page=12`
      )
        .then(response => {
          return response.json();
        })
        .then(data => {
          if (data.total > 0) {
            return data;
          }
          return Promise.reject(
            new Error(`нет картинок по запросу ${pictureName}`)
          );
        })
        .then(picture => {
          const mappedImages = picture.hits.map(
            ({ id, webformatURL, tags, largeImageURL }) => ({
              id,
              webformatURL,
              tags,
              largeImageURL,
            })
          );
          setSearchTotal(picture.total);
          setPhoto(prevState => [...prevState, ...mappedImages]);

          setStatus('resolved');
        })
        .catch(error => {
          setError(error);
          setStatus('rejected');
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pictureName]);

  const openModal = (largeImageURL, tags) => {
    toggleModal();
    setlargeImageURL(largeImageURL)
    setTags(tags);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleFormSubmit = pictureN => {
    setPictureName(pictureN);
    setPage(1);
  };

  const changePage = event => {
    event.preventDefault();
    setPage(prevPage => prevPage + 1);
    console.log(photo);
  };

  return (
    <>
      <Searchbar onSubmit={handleFormSubmit} />

      {status === 'idle' ? (
        <div>Введите имя картинки, которую хотите найти!</div>
      ) : (
        ''
      )}

      {status === 'rejected' ? (
        <PictureErrorView message={error.message} />
      ) : (
        ''
      )}

      <ImageGallery hits={photo} onOpenModal={openModal} />

      {status === 'pending' ? <Loader /> : ''}

      {searchTotal / page > 12 ? <ButtonLoadMore onClick={changePage} /> : ''}

      {showModal && (
        <Modal
          onModalClick={toggleModal}
            largeImage={largeImageURL}
          alt={tags}
        />
      )}
    </>
  );
}
