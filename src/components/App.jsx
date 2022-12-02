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
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [largeImage, setLargeImage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [tags, setTags] = useState('');
  const [photo, setPhoto] = useState([]);
  const [searchTotal, setSearchTotal] = useState(null);

  const API_KEY = '31403834-67d7794be9df50ce2ee75ea48';
  const oldPictureName = () => setPictureName(previousName => previousName);

  const oldPage = () => setPage(previousName => previousName);

  useEffect(() => {
    if (oldPictureName !== pictureName) {
      setPhoto([]);
    }

    if (oldPictureName !== pictureName || oldPage !== page) {
      console.log('не равно');
      console.log(oldPage);
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
  }, [page, pictureName]);

  const openModal = (largeImageURL, tags) => {
    // toggleModal();
    // this.setState({
    //   largeImageURL,
    //   tags,
    // });
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
          // largeImage={largeImageURL}
          alt={tags}
        />
      )}
    </>
  );
}












// import React, { Component } from 'react';
// import PictureErrorView from './PictureErrorView/PictureErrorView';
// import ImageGallery from 'components/ImageGallery/ImageGallery';
// import Loader from 'components/Loader/Loader';
// import ButtonLoadMore from 'components/ButtnoLoadMore/ButtonLoadMore';
// import  Modal  from 'components/Modal/Modal';

// import Searchbar from './Searchbar/Searchbar';

// export default class App extends Component {
//   state = {
//     pictureName: '',
//     page: 1,
//     //  picture: null,
//     error: null,
//     status: 'idle',
//     largeImage: '',
//     showModal: false,
//     tags: '',
//     photo: [],
//     searchTotal: null,
//   };

//   API_KEY = '31403834-67d7794be9df50ce2ee75ea48';

//   componentDidUpdate(prevProps, prevState) {
//     const { pictureName, page } = this.state;
//     if (prevState.pictureName !== pictureName) {
//       this.setState({ photo: [] });
//     }

//     if (prevState.pictureName !== pictureName || prevState.page !== page) {
//       console.log('не равно');
//       this.setState({ status: 'pending' });

//       fetch(
//         `https://pixabay.com/api/?key=${this.API_KEY}&q=${pictureName}&image_type=photo&page=${page}&per_page=12`
//       )
//         .then(response => {
//           return response.json();
//         })
//         .then(data => {
//           if (data.total > 0) {
//             return data;
//           }
//           return Promise.reject(
//             new Error(`нет картинок по запросу ${pictureName}`)
//           );
//         })
//         .then(picture => {
//           const mappedImages = picture.hits.map(
//             ({ id, webformatURL, tags, largeImageURL }) => ({
//               id,
//               webformatURL,
//               tags,
//               largeImageURL,
//             })
//           );

//           this.setState({ picture, status: 'resolved' });

//           this.setState(prevState => ({
//             photo: [...prevState.photo, ...mappedImages],
//             searchTotal: picture.total,
//           }));
//         })
//         .catch(error => {
//           this.setState({ error, status: 'rejected' });
//         });
//     }
//   }

//   openModal = (largeImageURL, tags) => {
//     console.log(this.state.photo);
//     this.toggleModal();
//     this.setState({
//       largeImageURL,
//       tags,
//     });
//   };

//   toggleModal = () => {
//     this.setState(({ showModal }) => ({
//       showModal: !showModal,
//     }));
//   };

//   handleFormSubmit = pictureName => {
//     this.setState({ pictureName: pictureName, page: 1 });
//   };

//   changePage = event => {
//     event.preventDefault();
//     this.setState(prevState => {
//       return { page: prevState.page + 1 };
//     });
//     console.log(this.state.page);
//   };

//   render() {
//     const {
//       error,
//       status,
//       showModal,
//       largeImageURL,
//       tags,
//       photo,
//       searchTotal,
//       page,
//     } = this.state;
//     return (
//       <>
//         <Searchbar onSubmit={this.handleFormSubmit} />

//         {status === 'idle' ? (
//           <div>Введите имя картинки, которую хотите найти!</div>
//         ) : (
//           ''
//         )}

//         {status === 'rejected' ? (
//           <PictureErrorView message={error.message} />
//         ) : (
//           ''
//         )}

//         <ImageGallery hits={photo} onOpenModal={this.openModal} />

//         {status === 'pending' ? <Loader /> : ''}

//         {searchTotal / page > 12 &&
//         status === 'resolved' &&
//         photo.length > 0 ? (
//           <ButtonLoadMore onClick={this.changePage} />
//         ) : (
//           ''
//         )}

//         {showModal && (
//           <Modal
//             onModalClick={this.toggleModal}
//             largeImage={largeImageURL}
//             alt={tags}
//           />
//         )}
//       </>
//     );
//   }
// }
