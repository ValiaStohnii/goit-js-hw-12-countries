import countryCardTpl from './templates/country-card.hbs';

const refs = {
    countryCards: document.querySelector('.country__cards'),
    input: document.querySelector('#name-input'),
}

fetchCountry()
    .then(renderCountryCard)
    .catch(error => { console.log(error) });

function fetchCountry() {
    return fetch('https://restcountries.com/v2/name/ukraine')
        .then(response => { return response.json() });
}

function renderCountryCard(countries) {
    const markup = countries.map(countryCardTpl).join('');
    refs.countryCards.innerHTML = markup;
}

