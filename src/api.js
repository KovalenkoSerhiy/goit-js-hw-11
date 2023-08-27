import Notiflix from 'notiflix';
import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '39087055-596d0af234f813cb9ca376519';

export async function fetchPhotos(inputData, pageNumber) {
  const options = new URLSearchParams({
    key: `${API_KEY}`,
    q: `${inputData}`,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: pageNumber,
    per_page: 40,
  });

  try {
    return await axios.get(`${BASE_URL}?${options}`);
  } catch (error) {
    Notiflix.Report.warning('Error');
  }
}
