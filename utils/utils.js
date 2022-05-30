import countries from "../assets/countries.json";

/**
 * Get a country object from countries.json using country name.
 * @param {String} testCountry Name of country to find.
 * @returns null or country object from countries.json.
 */
function getCountryByCountry(testCountry) {
  return countries.find(
    (country) =>
      country.Name == testCountry ||
      country.CCA2 == testCountry ||
      country.CCA3 == testCountry ||
      shortenCountryName(country.Name) == testCountry
  );
}

function shortenCountryName(countryName) {
  return countryName
    .split(" ")
    .map((word) => word[0])
    .join("");
}

/**
 * Get a country object from countries.json using nationality.
 * @param {String} nationality Nationality of country to find.
 * @returns null or country object from countries.json.
 */
function getCountryByNationality(nationality) {
  return countries.find((country) => country.Nationality == nationality);
}

async function fetchWikiImgUrl(wikiUrl) {
  try {
    const response = await fetch(wikiUrl);
    const text = await response.text();

    // Return first image on wiki
    return text.match(/https:\/\/upload.wikimedia.org\/\S+\.(?:jpg|gif|png)/gi);
  } catch (err) {
    console.log("Failed to fetch page: ", err);
  }
}

export { getCountryByCountry, getCountryByNationality, fetchWikiImgUrl };
