// API configuration
const API_URL = 'https://noise.kredytoweobliczenia.pl/samples';
const DAILY_URL = 'https://noise.kredytoweobliczenia.pl/daily';
const API_DEFAULT_LIMIT = 50000; // ~miesiąc danych dla 8 czujników

function buildApiUrl(params = {}) {
    const url = new URL(API_URL);
    url.searchParams.append('offset', params.offset || '0');
    url.searchParams.append('limit', params.limit || API_DEFAULT_LIMIT);
    return url.toString();
}

function buildDailyUrl(params = {}) {
    const url = new URL(DAILY_URL);
    if (params.sensor) {
        url.searchParams.append('sensor', params.sensor);
    }
    return url.toString();
}

// Configuration of sensor locations and names
const sensorNames = {
    'mjn-u-cz1': {
        'adres': 'Ursus, ul. Orląt Lwowskich',
        'latitude': 52.19140609168865,
        'longitude': 20.865002342426457,
        'type': 'Milesight WS302',
        'measurementWindow': 60
    },
    'mjn-cz-noise-2': {
        'adres': 'Mokotów, ul. Puławska',
        'latitude': 52.18535469628882,
        'longitude': 21.02372229587361,
        'type': 'Milesight WS302',
        'measurementWindow': 60
    },
    'mjn-cz-noise-3': {
        'adres': 'Śródmieście, ul. Emilii Plater',
        'latitude': 52.232191391261274,
        'longitude': 21.00288934332785,
        'type': 'Milesight WS302',
        'measurementWindow': 60
    },
    'mjn-cz-noise-4': {
        'adres': 'Wola, ul. Goleszowska',
        'latitude': 52.224962408624435,
        'longitude': 20.938818834103355,
        'type': 'Milesight WS302',
        'measurementWindow': 60
    },
    'mjn-cz-noise-5': {
        'adres': 'Mokotów, ul. Cybernetyki',
        'latitude': 52.17656404367752,
        'longitude': 20.99247968611798,
        'type': 'Milesight WS302',
        'measurementWindow': 60
    },
    'mjn-cz-noise-7': {
        'adres': 'Wola, Aleja Prymasa Tysiąclecia',
        'latitude': 52.23177015793386,
        'longitude': 20.955453755574585,
        'type': 'Milesight WS302',
        'measurementWindow': 60
    },
    'mjn-cz-noise-9': {
        'adres': 'Ochota, ul. Kaliska',
        'latitude': 52.217533714571736,
        'longitude': 20.981149891932496,
        'type': 'Milesight WS302',
        'measurementWindow': 60
    },
    'mjn-cz-noise-10': {
        'adres': 'Żoliborz, ul. Gwiaździsta',
        'latitude': 52.27293965600434,
        'longitude': 20.99414155658846,
        'type': 'Milesight WS302',
        'measurementWindow': 60
    },
    'svantek-1': {
        'adres': 'Wola, Al. Prymasa Tysiąclecia (Svantek)',
        'latitude': 52.23160900551707,
        'longitude': 20.955410030944826,
        'type': 'Svantek',
        'measurementWindow': 300
    }
};

// Map points: reports and cases (non-sensor markers)
const mapPoints = [
    {
        type: 'case',
        title: 'Al. Prymasa Tysiąclecia — przekroczenie norm',
        latitude: 52.2280,
        longitude: 20.9545,
        description: 'Pomiary wykazały LAeq 66-68 dB dzień, 62-66 dB noc. Pismo do ZDM o ograniczenie prędkości i monitoring.',
        link: 'halas/dzialania.html'
    },
    {
        type: 'case',
        title: 'Trasa S8 Wola/Bemowo — brak ekranów',
        latitude: 52.2385,
        longitude: 20.9280,
        description: 'Analiza porealizacyjna wykazała potrzebę budowy nowych ekranów akustycznych. GDDKiA czeka na decyzję Marszałka.',
        link: 'halas/dzialania.html'
    },
    {
        type: 'report',
        title: 'Mokotów, ul. Puławska — zgłoszenie mieszkańców',
        latitude: 52.1890,
        longitude: 21.0230,
        description: 'Zgłoszenie dot. nadmiernego hałasu drogowego w godzinach nocnych. Mieszkańcy postulują ograniczenie prędkości.',
        link: 'halas/dzialania.html'
    },
    {
        type: 'report',
        title: 'Ochota, ul. Kaliska — zgłoszenie mieszkańców',
        latitude: 52.2195,
        longitude: 20.9790,
        description: 'Zgłoszenie dot. hałasu z ruchu tranzytowego przez osiedle mieszkaniowe.',
        link: 'halas/dzialania.html'
    }
];
