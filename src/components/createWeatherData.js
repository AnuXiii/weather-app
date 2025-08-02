import { hideElement, showElement } from "../utils/animations";
import newToast from "./toast";

const result = document.getElementById("result");

function fahrenheitToCelsius(F) {
	return (((F - 32) * 5) / 9).toFixed(0);
}

async function createWeatherData(weatherData) {
	result.innerHTML = "";
	hideElement(result, "fade-in", "fade-out");

	try {
		const { address, latitude, longitude } = weatherData;
		const { cloudcover, conditions, datetime, humidity, windspeed, temp, description } = weatherData.days[0];

		const header = headerGenerator(
			{ address, latitude, longitude },
			{ cloudcover, conditions, datetime, humidity, windspeed, temp, description },
		);

		const forecasts = forecastGenerator(weatherData.days[0].hours);

		result.innerHTML = `${header} ${forecasts}`;

		newToast("Data generated", "bg-success");
	} catch (error) {
		result.innerHTML = `
			<p class="text-error text-2xl font-semibold text-center">Failed to load/get data from server</p>
		`;
	} finally {
		result.scrollIntoView();
		showElement(result, "fade-in", "fade-out");
	}
}

function headerGenerator(
	{ address, latitude, longitude },
	{ cloudcover, conditions, datetime, humidity, windspeed, temp, description },
) {
	return /*html*/ `
        	<div class="rounded-lg border border-solid border-border bg-surface p-6 mb-10">
					<header class="flex items-center flex-col sm:flex-row gap-4 mb-10">
						<div>
							<h1 class="flex items-center gap-2 text-2xl">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
									class="lucide lucide-map-pinned-icon lucide-map-pinned">
									<path
										d="M18 8c0 3.613-3.869 7.429-5.393 8.795a1 1 0 0 1-1.214 0C9.87 15.429 6 11.613 6 8a6 6 0 0 1 12 0" />
									<circle
										cx="12"
										cy="8"
										r="2" />
									<path
										d="M8.714 14h-3.71a1 1 0 0 0-.948.683l-2.004 6A1 1 0 0 0 3 22h18a1 1 0 0 0 .948-1.316l-2-6a1 1 0 0 0-.949-.684h-3.712" />
								</svg>
								<span>${address === "undefined" ? "Unknown Address" : address}</span>
							</h1>
						</div>
						<div class="bg-primary w-full sm:w-5 h-0.5"></div>
						<div
							title="location information"
							class="flex items-center gap-2">
							<p class="text-gray-200">lati: <span class="font-semibold">${latitude.toFixed(4)}</span></p>
							<p class="text-gray-200">longi: <span class="font-semibold">${longitude.toFixed(3)}</span></p>
						</div>
					</header>
					<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center gap-4">
						<div
							class="flex flex-col justify-center gap-4 items-center text-gray-300 bg-neutral-900 p-4 border border-solid border-border/50 rounded-lg">
							<p class="font-semibold text-gray-200">Cloud cover</p>
							<h3 class="text-2xl">${cloudcover}</h3>
						</div>

						<div
							class="flex flex-col justify-center gap-4 items-center text-gray-300 bg-neutral-900 p-4 border border-solid border-border/50 rounded-lg">
							<p class="font-semibold text-gray-200">Conditions</p>
							<h3 class="text-2xl">${conditions}</h3>
						</div>

						<div
							class="flex flex-col justify-center gap-4 items-center text-gray-300 bg-neutral-900 p-4 border border-solid border-border/50 rounded-lg">
							<p class="font-semibold text-gray-200">Date</p>
							<h3 class="text-2xl">${datetime.slice(5)}</h3>
						</div>

						<div
							class="flex flex-col justify-center gap-4 items-center text-gray-300 bg-neutral-900 p-4 border border-solid border-border/50 rounded-lg">
							<p class="font-semibold text-gray-200">Humidity</p>
							<h3 class="text-2xl">${humidity}%</h3>
						</div>

						<div
							class="flex flex-col justify-center gap-4 items-center text-gray-300 bg-neutral-900 p-4 border border-solid border-border/50 rounded-lg">
							<p class="font-semibold text-gray-200">Windspeed</p>
							<h3 class="text-2xl">${windspeed} KM/H</h3>
						</div>

						<div
							class="flex flex-col justify-center gap-4 items-center text-gray-300 bg-neutral-900 p-4 border border-solid border-border/50 rounded-lg">
							<p class="font-semibold text-gray-200">Temperature</p>
							<h3 class="text-2xl">${fahrenheitToCelsius(temp)}C°</h3>
						</div>

						<div
							class="flex flex-col justify-center gap-4 items-center text-gray-300 bg-neutral-900 p-4 border border-solid border-border/50 rounded-lg sm:col-span-2 h-full">
							<p class="font-semibold text-gray-200">Description</p>
							<p class="text-base text-center">${description}</p>
						</div>
					</div>
				</div>
    `;
}

function forecastGenerator(hours) {
	if (hours.length) {
		const html = hours
			.map(({ datetime, temp, conditions } = hours, index) => {
				return /*html*/ `
					<div class="opacity-0 fade-in flex flex-0 flex-col gap-4 items-center bg-neutral-900 py-4 px-8 border border-solid border-border/50 rounded-lg text-gray-300 text-center h-40" style="animation-delay:${
						index * 50
					}ms">
						<p>${datetime.slice(0, 5)}</p>
						<p class="text-white font-semibold text-2xl">${fahrenheitToCelsius(temp)}°C</p>
						<p class="mt-auto">${conditions}</p>
					</div>
				`;
			})
			.join("");

		return /*html*/ `
				<div class="rounded-lg border border-solid border-border bg-surface p-6 mb-10 select-none">
							<div class="mb-10">
								<h1 class="flex items-center gap-2 font-semibold text-2xl">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="lucide lucide-clipboard-clock-icon lucide-clipboard-clock">
										<path d="M16 14v2.2l1.6 1" />
										<path d="M16 4h2a2 2 0 0 1 2 2v.832" />
										<path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h2" />
										<circle
											cx="16"
											cy="16"
											r="6" />
										<rect
											x="8"
											y="2"
											width="8"
											height="4"
											rx="1" />
									</svg>
									<span> 24 Hour Forecast </span>
								</h1>
							</div>
							<div class="slider w-full">
								<div class="slides flex gap-4 overflow-x-auto pb-6">
									${html}
								</div>
							</div>
				</div>
			`;
	} else {
		return `<p class="text-center text-gray-400">No hourly data available</p>;`;
	}
}

export { createWeatherData };
