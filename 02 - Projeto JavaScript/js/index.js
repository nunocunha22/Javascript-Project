
document.addEventListener('DOMContentLoaded', init, false);

function init() {

    // API Geolocation
    function lerCoordenadas() {
        console.log('a ler coordenadas.');
        if (Modernizr.geolocation) {
            navigator.geolocation.getCurrentPosition(sucesso, erro);
        }
    }

    function sucesso(position) {
        console.log('a definir mapa....');
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;

        console.log(`Coordenadas: ${latitude} ${longitude}`);

        map = new google.maps.Map(document.getElementById('map'), {
            center: {
                lat: latitude,
                lng: longitude
            },
            zoom: 16
        });

    }

    function erro(error) {

        switch (error.code) {
            case error.PERMISSION_DENIED:
                alert('o utilizador nao autorizou a leitura de dados');
                break;
            case error.POSITION_UNAVAILABLE:
                alert('não foi possivel ler dados');
                break;
            case error.TIMEOUT:
                alert('expirou o tempo');
                break;
            default:
                alert('erro desconhecido');
        }

        lerCoordenadas();
    }

    // Declaracao das minhas variaveis globais
    let grid = document.querySelector('section.grid');
    let filters = document.querySelector('section.filters');
    let visitedFilter = document.querySelector('#visitedFilter');
    let notVisitedFilter = document.querySelector('#notVisitedFilter');
    let popup = document.querySelector('#popup');

    /// variaveis do formulario
    let cityForm = document.querySelector('section.addEditCity form');
    let city = document.getElementById('city');
    let country = document.getElementById('country');
    let visited = document.getElementById('visited');
    let imageSmall = document.getElementById('imageSmall');
    let imageBig = document.getElementById('imageBig');

    //botoes de update e acrescentar city
    let submitBtn = document.getElementById('submitBtn');
    let updateBtn = document.getElementById('updateBtn');
    let cityEdit;

    /// Bloco de eventos da applicação
    filters.addEventListener('change', filterEvents, false);
    filters.addEventListener('input', filterEvents, false);
    grid.addEventListener('click', gridEvents, false);
    popup.addEventListener('click', hidePopup, false);
    cityForm.addEventListener('submit', addCity, false);
    updateBtn.addEventListener('click', updateCity, false);

    ///LOGICA do meu algoritmo
    showCities(cities);


    /// Bloco de Metodos da aplicação

    function addCity(e) {

        let id = new Date().getTime();

        let place = new Place(
            id,
            city.value,
            country.value,
            visited.checked,
            imageSmall.value,
            imageBig.value
        );

        cities.push(place);
        showCities(cities);


        cityForm.reset();

        e.preventDefault();
    }

    function filterEvents(e) {


        if (e.target.id === 'visitedFilter') {
            filterCitiesVisited(e.target.checked);
            notVisitedFilter.checked = false;
        }

        if (e.target.id === 'notVisitedFilter') {
            filterCitiesNotVisited(e.target.checked);
            visitedFilter.checked = false;
        }

        if (e.target.id === 'searchInput') {
            let searchText = e.target;
            filterByCityName(searchText.value);
        }

        if (e.target.id === 'searchInputCountry') {
            let searchText = e.target;
            filterByCountryName(searchText.value);
        }

    }

    function gridEvents(e) {


        if (e.target.className === 'deleteBtn') {
            let id = e.target.dataset.id;
            deleteCity(id);
        }

        if (e.target.nodeName === 'IMG') {
            let imageBigSrc = e.target.dataset.imggr;
            showPopup(imageBigSrc);
        }

        if (e.target.className === 'editBtn') {

            let id = e.target.dataset.id;
            let city = e.target.parentElement.parentElement;
            city.classList.add('update');
            updatedCity(id);
        }
    }


    /// Bloco das funcionalidades da aplicação
    function updateCity(e) {

        let updatedCities = cities.map(place => {
            if (place.id === placeEdit.id) {
                return {
                    ...place,
                    city: city.value,
                    country: country.value,
                    visited: visited.checked,
                    imageSmall: imageSmall.value,
                    imageBig: imageBig.value,
                }
            } else {
                return place;
            }
        });

        cities = updatedCities;
        showCities(cities);
        cityForm.reset();
        e.preventDefault();
    }


    function updatedCity(id) {

        placeEdit = cities.find(c => c.id == id);
        city.value = placeEdit.city;
        country.value = placeEdit.country;
        visited.checked = placeEdit.visited;
        imageSmall.value = placeEdit.imageSmall;
        imageBig.value = placeEdit.imageBig;

        submitBtn.className = 'hide';
        updateBtn.className = 'show';

    }


    function filterByCityName(text) {
        let citiesSearchByName = cities.filter(city => city.city.search(text) > -1);

        showCities(citiesSearchByName);
    }

    function filterByCountryName(text) {
        let countrySearchByName = cities.filter(city => city.country.search(text) > -1);

        showCities(countrySearchByName);
    }

    function hidePopup() {
        popup.classList.toggle('open');
    }

    function showPopup(imgSrc) {
        popup.classList.toggle('open');
        popup.firstElementChild.src = `fotos/${imgSrc}`;
    }

    function deleteCity(id) {
        let newCities = cities.filter(city => city.id != id);
        cities = newCities;
        showCities(cities);
    }

    function filterCitiesVisited(checked) {

        if (checked) {
            let citiesAlreadyVisited = cities.filter(city => city.visited === true);
            showCities(citiesAlreadyVisited);
        } else {
            showCities(cities);
        }
    }

    function filterCitiesNotVisited(checked) {
        if (checked) {
            let citiesNotVisited = cities.filter(city => city.visited === false);
            showCities(citiesNotVisited);
        } else {
            showCities(cities);
        }

    }

    function showCities(arrayCities) {

        grid.innerHTML = '';

        arrayCities.map((place) => {
            grid.innerHTML += `
                <article >
                    <h2>${place.city}</h2>
                    <h1>${place.country}</h1>
                    <img  src='fotos/${place.imageSmall}' data-imggr='${place.imageBig}' />
                    <p> Visited: ${place.visited ? '✅' : '❌'}</p> 
                    <section>
                        <button class='deleteBtn' data-id=${place.id} >Delete</button>
                        <button class='editBtn' data-id=${place.id}>Edit</button>
                    </section>
                </article>
            `;

        });
    }
}
