// import * as basicLightbox from 'basiclightbox';
import { createPortal } from 'react-dom';
import { Component } from 'react';
import css from './Modal.module.css';

export class Modal extends Component {
  modalRoot = document.querySelector('#modal-root');
  // const instance = basicLightbox.create(`
  //     <img src="assets/images/image.png" width="800" height="600">
  // `)

  // instance.show()

  render() {
    const { largeImageURL, tags } = this.props;
    return createPortal(
      <div className={css.overlay}>
        <div className={css.modal}>
          <img src={largeImageURL} alt={tags} />
        </div>
      </div>, this.modalRoot
    );
  }
}
