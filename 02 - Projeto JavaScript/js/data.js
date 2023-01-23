class Place {

    constructor(
        id,
        city,
        country,
        visited,
        imageSmall,
        imageBig
    ) {

        this.id = id;
        this.city = city;
        this.country = country;
        this.visited = visited;
        this.imageSmall = imageSmall;
        this.imageBig = imageBig;
    }
}


let cities = [
    {
        id: 0,
        city: 'Amsterdam',
        country: "The Netherlands",
        visited: true,
        imageSmall: 'AmsterdamSmall.jpg',
        imageBig: 'AmsterdamBig.jpg',
    },
    {
        id: 1,
        city: 'New York',
        country: "USA",
        visited: true,
        imageSmall: 'New YorkSmall.jpg',
        imageBig: 'New YorkBig.jpg',
    },
    {
        id: 2,
        city: 'Paris',
        country: "France",
        visited: true,
        imageSmall: 'ParisSmall.jpg',
        imageBig: 'ParisBig.jpg',
    },
    {
        id: 3,
        city: 'London',
        country: "England",
        visited: true,
        imageSmall: 'LondonSmall.jpg',
        imageBig: 'LondonBig.jpg',
    },
    {
        id: 4,
        city: 'Lyon',
        country: "France",
        visited: true,
        imageSmall: 'LyonSmall.jpg',
        imageBig: 'LyonBig.jpg',
    },
    {
        id: 5,
        city: 'Madrid',
        country: "Spain",
        visited: true,
        imageSmall: 'MadridSmall.jpg',
        imageBig: 'MadridBig.jpg',
    },
    {
        id: 6,
        city: 'Porto',
        country: "Portugal",
        visited: true,
        imageSmall: 'PortoSmall.jpg',
        imageBig: 'PortoBig.jpg',
    },
    {
        id: 7,
        city: 'São Miguel - Açores',
        country: "Portugal",
        visited: true,
        imageSmall: 'São MiguelSmall.jpg',
        imageBig: 'São MiguelBig.jpg',
    },
    {
        id: 8,
        city: 'Barcelona',
        country: "Spain",
        visited: false,
        imageSmall: 'BarcelonaSmal.jpg',
        imageBig: 'BarcelonaBig.jpg',
    },
    {
        id: 9,
        city: 'Machu Picchu',
        country: "Peru",
        visited: false,
        imageSmall: 'Machu PicchuSmall.jpg',
        imageBig: 'Machu PicchuBig.jpg',
    },
];