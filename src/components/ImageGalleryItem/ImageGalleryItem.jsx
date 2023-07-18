import React, { Component } from 'react';
import css from './ImageGalleryItem.module.css';
import { Modal } from '../Modal/Modal.jsx';

export class ImageGalleryItem extends Component {
  state = {
    webformatURL: '',
    largeImageURL: '',
    tags: '',
    isShowModal: false,
    
  };

  
  toggleModal = () => {
    this.setState(({ isShowModal }) => ({ isShowModal: !isShowModal }));
  };
  render() {
    const { isShowModal } = this.state;
    const { images } = this.props; 
    return (
      <li className={css.galleryItem}>
        <img
          src={images.webformatURL}
          alt={images.tags}
          onClick={this.toggleModal}
        />
        {isShowModal && (
          <Modal
            largeImageURL={images.largeImageURL}
            tags={images.tags}
            onClose={this.toggleModal}
          />         
        )}
      </li>
    );
  }
}
