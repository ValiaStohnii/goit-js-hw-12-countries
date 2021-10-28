import countryCardTpl from './templates/country-card.hbs';


fetch('https://restcountries.com/v2/name/ukraine')
    .then(response => { return response.json(); })
    .then(country => {
        console.log(country);
        const markup = countryCardTpl(country);
        console.log(markup);
    })
    .catch(error => { console.log(error);});