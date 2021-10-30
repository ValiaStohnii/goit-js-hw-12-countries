export default class ApiService{  
    constructor() {
        this.searchInput = '';
    }

    fetchCountry() {
    return fetch(`https://restcountries.com/v2/name/${this.searchInput}`)
        .then(response => { return response.json() })
        // .then(country => { return country } );
    }
    
    get input() {
        return this.searchInput;
    }

    set input(newInput) {
        this.searchInput = newInput;
    }
}