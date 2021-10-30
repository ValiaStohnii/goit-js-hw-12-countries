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
    countryList:document.querySelector('.countries-list__card'),
    
}

const apiService = new ApiService();

refs.input.addEventListener('input', debounce(inputChange,500));


function inputChange(e) {
    e.preventDefault();

    apiService.input = refs.input.value;

    apiService.fetchCountry()
        .then(country => {
            if (country.length <= 2) {
                renderCountryCard(country);
            } else if (2 < country.length <= 10) {
                renderCountryList(country);
            }
            if (country.length > 10) {
                errorContry();
                
            }
        })
        .catch(error=>console.log(error));
    
}


function renderCountryCard(countries) {
    const markup = countryCardTpl(countries);
    refs.countryCards.innerHTML = markup;
}

function renderCountryList(country) {
    const markup = countriesListTpl(country);
    refs.countryList.innerHTML = markup;
}


function errorContry() {
    const myError = error({
    text: "Too many matches found.Please enter a more specific query!"});
}

