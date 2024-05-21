// Import the list of countries from the "world-countries" package
import countries from "world-countries";

// Format the countries data to include only the necessary fields
const countriesFormatted = countries.map((country) => ({
// ISO 3166-1 alpha-2 country code
    value: country.cca2,
// Common name of the country
    label: country.name.common,   
// Emoji flag of the country
    flag: country.flag,       
       // Latitude and longitude of the country   
    latLang: country.latlng, 
 // Region the country belongs to
    region: country.region,        
}));

// Create a custom hook to use the countries data
export const useCountries = () => {
    // Function to get all formatted countries
    const getAllCountries = () => countriesFormatted;

    // Function to get a country by its ISO 3166-1 alpha-2 code
    const getCountryByValue = (value: string) => {
        return countriesFormatted.find((country) => country.value === value);
    };

    // Return the functions for getting countries
    return {
        getAllCountries,
        getCountryByValue,
    };
};
