import countryCardTpl from './templates/country-card.hbs';


fetch('https://restcountries.com/v2/name/ukraine')
    .then(response => { return response.json(); })
    .then(countries => {
        console.log(countries);
        const markup = countries.map(countryCardTpl).join('');
        console.log(markup);
    })
    .catch(error => {console.log(error);});