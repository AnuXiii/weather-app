import newToast from "./toast";
import L from "leaflet";
import { createWeatherData } from "./createWeatherData";
import { fetchWeatherData, heroContainer, map, marker } from "../utils/leaflet";
import loading from "./loading";

const form = document.forms[0];
const cityNameInput = form.city_name;

form.addEventListener("submit", handleCitySearchSubmit);

async function handleCitySearchSubmit() {
	if (!cityNameInput.value.trim()) {
		newToast("Please fill out the input", "bg-error");
		return;
	}

	loading(heroContainer, true);

	try {
		const weatherData = await fetchWeatherData(cityNameInput.value);

		map.setView([weatherData.latitude, weatherData.longitude], 5);

		if (marker) {
			marker.setLatLng([weatherData.latitude, weatherData.longitude]);
		} else {
			L.marker([weatherData.latitude, weatherData.longitude]).addTo(map);
		}

		createWeatherData(weatherData);
	} catch (error) {
		newToast("Location not found", "bg-error");
	} finally {
		cityNameInput.value = "";
		loading(heroContainer, false);
	}
}
