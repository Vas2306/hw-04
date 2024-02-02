import { Component } from 'react';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import SearchBar from './Searchbar/Searchbar';
import css from './App.module.css';
import ImageGallery from './ImageGallery/ImageGallery';
import fetchImagesWithQuery from './Services/api';
import Modal from './Modal/Modal';
class App extends Component {
  state = {
    images: [],
    canLoadMore: false,
    isLoading: false,
    modalImage: null,
    error: null,
    term: '',
    page: 1,
  };

  handleFormSubmit = async term => {
    this.setState({ canLoadMore: false, isLoading: true, page: 1, term });
    try {
      const data = await fetchImagesWithQuery(term);
      const images = data.hits;
      const maxImages = data.totalHits;
      this.setState({
        images,
        canLoadMore:
          images.length > 0 && images.length < maxImages ? true : false,
      });
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  };
  loadMoreImages = async () => {
    const nextPage = this.state.page + 1;
    this.setState({ canLoadMore: false, isLoading: true, page: nextPage });
    try {
      const data = await fetchImagesWithQuery(this.state.term, nextPage);
      console.log(data.hits);
      const newImages = [...this.state.images, ...data.hits];
      const maxImages = data.totalHits;
      this.setState({
        images: newImages,
        canLoadMore: newImages.length < maxImages ? true : false,
      });
    } catch (error) {
      this.setState({ error });
    } finally {
      console.log('finished searching');
      this.setState({ isLoading: false });
    }
  };

  showModal = modalImage => {
    this.setState({ modalImage });
  };

  closeModal = () => {
    this.setState({ modalImage: null });
  };

  handleKeyDown = e => {
    if (e.key === 'Escape') {
      this.closeModal();
    }
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown, false);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown, false);
  }
  render() {
    return (
      <div className={css.app}>
        <SearchBar onSubmit={this.handleFormSubmit} />
        <ImageGallery images={this.state.images} onShowModal={this.showModal} />
        <Loader isVisible={this.state.isLoading} />
        {this.state.canLoadMore && <Button onClick={this.loadMoreImages} />}
        {this.state.modalImage && (
          <Modal image={this.state.modalImage} onClose={this.closeModal} />
        )}
      </div>
    );
  }
}

export default App;

