/*
    Google Map API
    Info: https://developers.google.com/maps/documentation/javascript
*/

import $ from "jquery";
import countryLngJson from "./country-by-languages.json";
const KEY = "";
const URL = "https://maps.googleapis.com/maps/api/geocode/json?key="+ KEY;


// Get geocode info by lat and lng
export function geocodeing(latLng, func) {
    let lat = latLng.lat;
    let lng = latLng.lng;
    let url = URL + '&latlng=' + lat + ',' + lng;
    $.post(url, function(data) {
        let country = findCountry(data);
        let languages = findLanguagesForCountry(country);
        func(country, languages);
    }, "json");

}

// Get country name and code from G Map json data
function findCountry(data) {
    let array = data.results;
    let country;
    let countryCode;
    array.forEach((item) => {
        let address = item.address_components[0];
        if (address.types[0] = "country") {
            country = address.long_name;
            countryCode = address.short_name;
        }
    });
    // Add country name to infoWindow
    $("#infow").append(country);

    return country;
}

// Get languages spoken by country from Json file
function findLanguagesForCountry(countryName) {
    const data = countryLngJson;
    let languages;
    data.forEach((item) => {
        if (item.country == countryName) {
            languages = item.languages;
        }
    });
    return languages;
}