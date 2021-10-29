import countryCardTpl from './templates/country-card.hbs';

const refs = {
    countryCards: document.querySelector('.country__cards'),
    input: document.querySelector('#name-input'),
}

refs.input.addEventListener('input', inputChange);

// var onKeyupInputDebounced = _.debounce(inputChange, 500);
// $('input').on('keyup', onKeyupEmailInputDebounced);

function inputChange(e) {
    e.preventDefault();

    const input = e.currentTarget;
    console.log(searchInput);
    const searchInput = input.elements.query.value;

    fetchCountry(`searchInput`)
        .then(renderCountryCard)
        .catch(error => console.log(error))
        .finally(()=>input.reset());
}

function fetchCountry(country) {
    return fetch(`https://restcountries.com/v2/name/${country}`)
        .then(response => { return response.json() });
}

function renderCountryCard(countries) {
    const markup = countries.map(countryCardTpl).join('');
    refs.countryCards.innerHTML = markup;
}


