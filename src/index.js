// import axios from 'axios';

// axios.defaults.headers.common['x-api-key'] =
//   'live_S5pSWTGYjkEcNWjCUXxge61iZsKgBPcKKXivR6TYBMVvWZIRPPbdM3uzPuyudxT3';

import { fetchBreeds, fetchCatByBreed } from './js/cat-api';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const refs = {
  selector: document.querySelector('.breed-select'),
  catInfo: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
};
let breedsArray = [];

// catInfo.innerHTML = createMarkup();
fetchBreeds()
  .then(breeds => {
    breedsArray = [...breeds];
    createBreedsOptions(breeds);
    showEl(refs.selector);
  })
  .catch(err => {
    showEl(refs.error);
  })
  .finally(() => hideEl(refs.loader));

function createBreedsOptions(array) {
  const markup = array
    .map(({ id, name }) => `  <option value="${id}">${name}</option>`)
    .join(' ');
  refs.selector.innerHTML = markup;
}

refs.selector.addEventListener('change', onSelectorChange);

function onSelectorChange(e) {
  showEl(refs.loader);
  hideEl(refs.catInfo);
  hideEl(refs.error);

  const breedId = e.currentTarget.value;
  const { name, description, temperament } = breedsArray.find(
    breed => breed.id === breedId
  );

  fetchCatByBreed(breedId)
    .then(breed => {
      console.log(breed);
      if (!breed.length) {
        throw new Error();
      }

      showEl(refs.catInfo);

      renderCat(breed[0].url, name, description, temperament);
    })
    .catch(err => {
      showEl(refs.error);
    })
    .finally(() => hideEl(refs.loader));
}

function renderCat(url, name, description, temperament) {
  const markup = `<div class="box-img">
      <img src="${url}" alt="${name}" width="400"/></div>
    <div class="box">
    <h1>${name}</h1>
    <p>${description}</p>
    <p><b>Temperament:</b>
  ${temperament}</p></div>`;
  refs.catInfo.innerHTML = markup;
}

function showEl(el) {
  el.classList.remove('is-hidden');
}
function hideEl(el) {
  el.classList.add('is-hidden');
}
