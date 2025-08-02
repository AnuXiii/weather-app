import { map } from "./utils/leaflet";
import "./components/handleSearchSubmit";
import getGeoLocation from "./utils/geoLocation";

window.addEventListener("load", () => {
	getGeoLocation();
});

setTimeout(() => {
	map.invalidateSize();
}, 1000);
