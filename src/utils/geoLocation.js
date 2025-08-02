import newToast from "../components/toast";
import { getAddressFromCoords } from "./leaflet";

function getGeoLocation() {
	navigator.geolocation.getCurrentPosition(
		async (position) => {
			const lat = position.coords.latitude;
			const lon = position.coords.longitude;

			await getAddressFromCoords(lat, lon);
		},
		(handleErrorGeo) => {
			newToast(`${handleErrorGeo.message}`, "bg-error");
		},
		{
			enableHighAccuracy: true,
			maximumAge: 0,
		},
	);
}

export default getGeoLocation;
