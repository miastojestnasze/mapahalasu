// API configuration
const API_URL = 'https://vps-76e4aba0.vps.ovh.net/samples';

function buildApiUrl(params = {}) {
    const url = new URL(API_URL);
    url.searchParams.append('offset', params.offset || '0');
    url.searchParams.append('limit', params.limit || '30000000');
    return url.toString();
}

// Configuration of sensor locations and names
const sensorNames = {
    'mjn-u-cz1': {
        'adres': 'Ursus, ul. Orląt Lwowskich', 
        'latitude': 52.19140609168865,
        'longitude': 20.865002342426457
    },
    'mjn-cz-noise-2': {
        'adres': 'Mokotów, ul. Puławska', 
        'latitude': 52.18535469628882,                                  
        'longitude': 21.02372229587361
    },
    'mjn-cz-noise-3': {
        'adres': 'Śródmieście, ul. Emilii Plater',
        'latitude': 52.232191391261274,
        'longitude': 21.00288934332785
    },
    'mjn-cz-noise-4': {
        'adres': 'Wola, ul. Goleszowska',
        'latitude': 52.224962408624435,
        'longitude': 20.938818834103355
    },
    'mjn-cz-noise-5': { 
        'adres': 'Mokotów, ul. Cybernetyki',
        'latitude': 52.17656404367752,                                 
        'longitude': 20.99247968611798
    },
    'mjn-cz-noise-7': {
        'adres': 'Wola, Aleja Prymasa Tysiąclecia',
        'latitude': 52.23177015793386,
        'longitude': 20.955453755574585
    },
    'mjn-cz-noise-9': {
        'adres': 'Ochota, ul. Kaliska',
        'latitude': 52.217533714571736,
        'longitude': 20.981149891932496
    },
    'mjn-cz-noise-10': {
        'adres': 'Żoliborz, ul. Gwiaździsta',
        'latitude': 52.27293965600434,
        'longitude': 20.99414155658846
    }
};
