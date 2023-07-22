import { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import getImages from 'services/images-api';
import { Notify } from 'notiflix';
import { Container } from './App.styled';
import Button from './Button/Button';
import Notification from './Notification/Notification';

export default function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!query) return;

    fetchImages();
  }, [query, page]);

  const handleFormSubmit = querySearch => {
    setQuery(querySearch);
    setPage(1);
    setLoading(true);
    setImages(null);
    setShowButton(false);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const fetchImages = () => {
    setLoading(true);

    getImages(query, page)
      .then(response => {
        if (!response.data.total) {
          Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.',
            { position: 'center-center' }
          );
          return;
        }
        const totalPages = Math.ceil(response.data.totalHits / 12);
        setImages(prevImages =>
          prevImages
            ? [...prevImages, ...response.data.hits]
            : response.data.hits
        );
        setShowButton(page < totalPages);
      })
      .catch(error => console.log(error))
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Container>
      <Searchbar onSubmit={handleFormSubmit} />
      {images && <ImageGallery images={images} />}
      {loading && <Loader />}
      {images && !showButton && <Notification text="All images loaded" />}
      {showButton && <Button onClick={handleLoadMore} />}
    </Container>
  );
}

// export class App extends Components {
//   state = {
//     query: '',
//     images: null,
//     loading: false,
//     showButton: false,
//     page: 1,
//   };

//   componentDidUpdate(_, prevState) {
//     if (
//       prevState.query !== this.state.query ||
//       prevState.page !== this.state.page
//     ) {
//       this.fetchImages();
//     }
//   }

//   fetchImages = () => {
//     const { query, page } = this.state;
//     this.setState({ loading: true });
//     getImages(query, page)
//       .then(response => {
//         if (!response.data.total) {
//           Notify.failure(
//             'Sorry, there are no images matching your search query. Please try again.',
//             { position: 'center-center' }
//           );
//           return;
//         }
//         const totalPages = Math.ceil(response.data.totalHits / 12);
//         this.setState(prevState => ({
//           images: prevState.images
//             ? [...prevState.images, ...response.data.hits]
//             : response.data.hits,
//           showButton: page < totalPages,
//         }));
//       })
//       .catch(error => console.log(error))
//       .finally(() => {
//         this.setState({ loading: false });
//       });
//   };

//   handleFormSubmit = query => {
//     this.setState({
//       query,
//       page: 1,
//       loading: true,
//       images: null,
//       showButton: false,
//     });
//   };

//   handleLoadMore = () => {
//     this.setState(prevState => ({ page: prevState.page + 1 }));
//   };

//   render() {
//     const { loading, images, showButton } = this.state;
//     return (
//       <Container>
//         <Searchbar onSubmit={this.handleFormSubmit} />
//         {images && <ImageGallery images={images} />}
//         {loading && <Loader />}
//         {images && !showButton && <Notification text="All images loaded" />}
//         {showButton && <Button onClick={this.handleLoadMore} />}
//       </Container>
//     );
//   }
// }
