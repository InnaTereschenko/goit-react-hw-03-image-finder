import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as fetchImages from '../services/pixabay-api';
import React, { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar.jsx';
import { ImageGallery } from './ImageGallery/ImageGallery.jsx';
import { Loader } from './Loader/Loader.jsx';
import { Button } from './Button/Button.jsx';


export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    isLoading: false,
    totalHits: 0,
    
  };

  showModal = () => {
    this.setState(({ showModal }) => ({ showModal: !this.showModal })
    )
  };

  async componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    // перевірка на пусту строку та введення нового запиту, а також що поточна сторінка змінилась
    if (
      (prevState.query !== query && query !== '') ||
      prevState.page !== page
    ) {
      try {
        this.setState({ isLoading: true }); //*поки пішов запит показується лоадер

        const { totalHits, hits } = await fetchImages({ query, page });

        // розпиляємо об'єкт з отриманими раніше результатами + об'єкт з новими результатами
        this.setState(prevState => ({
          images: [...prevState.images, ...this.getNormalizedImages(hits)],
          isLoadMoreBtnVisible: page < Math.ceil(totalHits / 12),
        }));
      } catch (err) {
        toast.error('Sorry, something goes wrong');
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }
  // витягуємо для збереження в стейт тільки ті поля, які нам потрібні
  getNormalizedImages(array) {
    return array.map(({ id, webformatURL, largeImageURL, tags }) => ({
      id,
      webformatURL,
      largeImageURL,
      tags,
    }));
  }

  handleFormSubmit = query => {
    this.setState({ query });
  };

  render() {
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: '16px',
          paddingBottom: '24px',
        }}
      >
        {this.state.isLoading && <Loader />}
        
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery images={this.state.images}></ImageGallery>
        <Button />
        <ToastContainer autoClose={1000} position="top-center" theme="light" />
      </div>
    );
  }
}
