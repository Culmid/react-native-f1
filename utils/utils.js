import countries from "../assets/countries.json";

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

function getCountryByNationality(nationality) {
  return countries.find((country) => country.Nationality == nationality);
}

export { getCountryByCountry, getCountryByNationality };
