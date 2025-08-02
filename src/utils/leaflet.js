import "leaflet/dist/leaflet.css";
import L from "leaflet";
import newToast from "../components/toast";
import { createWeatherData } from "../components/createWeatherData";
import loading from "../components/loading";

/* ************************************************************************ */

const API_KEY = import.meta.env.VITE_APP_WEATHER_API_KEY;
const DEFAULT_POSITION = [32.4279, 53.688];
const DEFAULT_ZOOM = 5;
const MAP_TILE_LAYER = `https://tile.openstreetmap.org/{z}/{x}/{y}.png`;
const WEATHER_DATA_URL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline`;

/* ************************************************************************ */
const heroContainer = document.querySelector("#hero-container");

const now = new Date();
const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
const toDate = tomorrow.toISOString().split("T")[0];

/* ************************************************************************ */

const map = L.map("map").setView(DEFAULT_POSITION, DEFAULT_ZOOM);

L.tileLayer(`${MAP_TILE_LAYER}`, {
	subdomains: "abcd",
	maxZoom: 19,
}).addTo(map);

let marker = L.marker(DEFAULT_POSITION).addTo(map);

map.on("click", async function (e) {
	const lat = e.latlng.lat;
	const lon = e.latlng.lng;

	marker.setLatLng([lat, lon]);

	try {
		await getAddressFromCoords(lat, lon);
	} catch (error) {
		newToast(`${error.message}`, "bg-error");
	}
});

/* ************************************************************************ */

async function fetchWeatherData(location) {
	try {
		const response = await fetch(`${WEATHER_DATA_URL}/${location}/${toDate}/${toDate}?key=${API_KEY}`);

		if (!response.ok) {
			newToast("Failed to get data", "bg-error");
			return;
		}

		const weatherData = await response.json();

		if (weatherData) {
			return weatherData;
		} else {
			newToast("Failed to load data", "bg-error");
		}
	} catch (error) {
		newToast(`${error.message}`, "bg-error");
	}
}

/* ************************************************************************ */

async function getAddressFromCoords(lat, lon) {
	const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;

	loading(heroContainer, true);

	try {
		const response = await fetch(url, {
			headers: {
				"User-Agent": "leaflet-app/1.0",
			},
		});

		if (!response.ok) {
			newToast("Unable to geocode location", "bg-error");
			return;
		}

		const data = await response.json();
		const locationName = data.address.city;
		const weatherData = await fetchWeatherData(locationName);
		createWeatherData(weatherData);
	} catch (error) {
		newToast("Failed to get address", "bg-error");
	} finally {
		loading(heroContainer, false);
	}
}

/* ************************************************************************ */

export { map, marker, heroContainer, fetchWeatherData, getAddressFromCoords };
