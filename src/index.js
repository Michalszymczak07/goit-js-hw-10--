import  './css/styles.css';
import { fetchCountries } from './fetchCountries';
var debounce = require('lodash.debounce');
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;
const searchInput = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
let input = searchInput.value;
let countries;
let countryName;



function respond (items) {
  if (items.length === 1) {
    const markup = items
      .map(item => {
        return `<li>
                <p><img src="${
                  item.flags.svg
                }" alt="Flaga"> ${item.name.official} </p>
                <p> <b>Capital: </b> ${item.capital} </p>
                <p> <b>Population: </b>${item.population} </p>
                <p> <b>Languages: </b>${Object.values(item.languages)} </p>
            </li>`;
      })
      .join('');
    countryInfo.innerHTML = markup;
    countryList.innerHTML = '';
  } else if (items.length >= 2 && items.length <= 10) {
    const markup = items
      .map(item => {
        return `<li> <p> <img class="svg__img-small" src="${item.flags.svg}" alt="Flaga"> ${item.name.official} </p></li>`;
      })
      .join(' ');
    countryList.innerHTML = markup;
    countryInfo.innerHTML = '';
  } else if (items.length > 10)
    Notify.info('Too many matches found. Please enter a more specific name.');
};
function checkInputs(searchForInput) {
  if (searchForInput.trim() === '') {
    countryInfo.innerHTML = '';
    countryList.innerHTML = '';
    return true;
  }
  return false;
}


searchInput.addEventListener(
  'input',
  debounce(() => {
    let names = searchInput.value.trim();
    if (checkInputs(names)) return;
    fetchCountries(names).then(items => respond(items));
  }, DEBOUNCE_DELAY),
);


