import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import { PixabayAPI } from './js/api';
import { galleryImages } from './js/cart';

const pixabayAPI = new PixabayAPI();
const lightbox = new SimpleLightbox('.gallery a');

const searchForm = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMore = document.querySelector('.load-more');

let imagesData = [];

loadMore.classList.add('is-hidden');


async function fetchImg() {
    try {
      const searchQuery = searchForm.elements['searchQuery'].value.trim();
      pixabayAPI.query = searchQuery;
      pixabayAPI.currentPage = 1;
  
      if (searchQuery === '') {
        Notiflix.Notify.failure('Please, type something and try again');
        return;
      }
  
      const { data } = await pixabayAPI.fetchPhotos();
  
      if (!data.hits.length) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }
  
      imagesData = data.hits;
  
      gallery.innerHTML = galleryImages(imagesData);
      loadMore.classList.remove('is-hidden');
      lightbox.refresh();
      Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
    } catch (err) {
      Notiflix.Notify.failure(
        'Oops! Something went wrong. Please try again later.'
      );
    }
  }
  
  searchForm.addEventListener('submit', event => {
    event.preventDefault();
    const searchQuery = searchForm.elements['searchQuery'].value.trim();
  
    if (searchQuery === '') {
      Notiflix.Notify.failure('Please, type something and try again');
      clearGallery();
      imagesData = [];
      loadMore.classList.add('is-hidden');
      return;
    }
  
    fetchImg();
  });

  async function loadMorePhotos() {
    try {
      pixabayAPI.currentPage += 1;
  
      const { data } = await pixabayAPI.fetchPhotos();
      const loadPages = Math.ceil(data.totalHits / pixabayAPI.perPage);
      console.log(loadPages);
  
      imagesData = [...imagesData, ...data.hits];
  
      gallery.insertAdjacentHTML('beforeend', galleryImages(data.hits));
  
      lightbox.refresh();
  
      if (imagesData.length < data.totalHits) {
        loadMore.classList.remove('is-hidden');
      } else {
        loadMore.classList.add('is-hidden');
        Notiflix.Notify.info('Sorry, there are no more images');
      }
    } catch (err) {
      console.log(err.message);
    }
  }
  
  loadMore.addEventListener('click', () => {
    loadMorePhotos();
  });
  
  clearGallery();
  
