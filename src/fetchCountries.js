import countryCardTpl from './templates/country-card.hbs';
import countriesListTpl from './templates/country-list.hbs';
import   debounce   from   'lodash.debounce' ;

const refs = {
    countryCards: document.querySelector('.country__cards'),
    input: document.querySelector('#name-input'),
    countryList:document.querySelector('.countries-list__card'),
}

refs.input.addEventListener('input', debounce(inputChange,500));


function inputChange(e) {
    e.preventDefault();

    const searchInput = refs.input.value;
    // const searchInput = e.currentTarget.elements.query.value;
    console.log(searchInput);

    if (2 < fetchCountry > 10) {
        fetchCountry(searchInput)
            .then(renderCountryList)
            .catch(error => console.log(error))
    } else {
        fetchCountry(searchInput)
            .then(renderCountryCard)
            .catch(error => console.log(error))
    }
    // .finally(()=>refs.input.reset());
}


function fetchCountry(country) {
    return fetch(`https://restcountries.com/v2/name/${country}`)
        .then(response => { return response.json() });
}

function renderCountryCard(countries) {
    const markup = countries.map(countryCardTpl).join('');
    refs.countryCards.innerHTML = markup;
}

function renderCountryList(country) {
    const markup = country.map(countriesListTpl).join('');
    refs.countryList.innerHTML = markup;
}


