import { Component } from 'react';
import css from './ImageGalleryItem.module.css';
import { Modal } from '../Modal/Modal.jsx';

export class ImageGalleryItem extends Component {
  state = {
    webformatURL: '',
    largeImageURL: '',
    tag: '',
    isModalOpen: false,
  };

  handleModalOpen = () => {
     this.setState(prevState => ({ isModalOpen: !prevState.isModalOpen }));
  };

  render() {
    const { isModalOpen } = this.state;
    
    return (
      <li className={css.galleryItem}>
        <img
          src={this.props.webformatURL}
          alt={this.props.tag}
          onClick={this.handleModalOpen}
          
        />
        {isModalOpen && <Modal/>}
      </li>
      
    );

  }
}
