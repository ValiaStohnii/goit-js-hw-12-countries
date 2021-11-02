import countryCardTpl from '../templates/country-card.hbs';
import countriesListTpl from '../templates/country-list.hbs';
import ApiService from './api-service.js';
import debounce from 'lodash.debounce';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';

const refs = {
    countryCards: document.querySelector('.country__cards'),
    input: document.querySelector('#name-input'),
    countryList:document.querySelector('.country__list'),
    cardsContainer: document.querySelector('.country__cards'),
    listContainer: document.querySelector('.country__list'),
}

const apiService = new ApiService();

refs.input.addEventListener('input', debounce(inputChange,500));


function inputChange(e) {
    e.preventDefault();
    apiService.input = e.target.value;
    
    apiService.fetchCountry()
        .then(data => {
        console.log(data)
        if (data.length === 1) {
            renderCountryCard(data);
            clearListConteiner();
        } else if (data.length <= 10) {
            renderCountryList(data);
            clearCardsConteiner();
        } else if (data.length >10) {
            error({
                text: "Too many matches found.Please enter a more specific query!"
            });
            clearCardsConteiner();
            clearListConteiner();
        } else if (data.message === 'Page Not Found') {
            error({
                text: "No country has been found. Please enter a more specific query!"
            });
            clearCardsConteiner();
            clearListConteiner();
        }
    })
    .catch(Error => Error({
        text: "You must enter query parameters!"
    }));
}


function renderCountryCard(countries) {
    const markup = countryCardTpl(countries);
    refs.countryCards.innerHTML= markup;
}

function renderCountryList(country) {
    const markup = countriesListTpl(country);
    refs.countryList.innerHTML= markup;
}


function clearCardsConteiner() {
    refs.cardsContainer.innerHTML = '';
}
function clearListConteiner() {
    refs.listContainer.innerHTML = '';
}
 
