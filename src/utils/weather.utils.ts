import { WeatherData, MappedCurrentWeather, MappedForecastWeather, MappedWeatherData } from '../types/weather.types';

export function getWeatherIcon(weatherCode: number, isDayTime: boolean): string {
    const weatherConditions: { [key: number]: string } = {
        0: "clear",
        1: "mainly-clear",
        2: "partly-cloudy",
        3: "overcast",
        45: "fog",
        48: "depositing-rime-fog",
        51: "drizzle-light-intensity",
        53: "drizzle-moderate-intensity",
        55: "drizzle-dense-intensity",
        56: "freezing-drizzle-light-intensity",
        57: "freezing-drizzle-dense-intensity",
        61: "rain-slight-intensity",
        63: "rain-moderate-intensity",
        65: "rain-heavy-intensity",
        66: "freezing-rain-light-heavy-intensity",
        67: "freezing-rain-heavy-intensity",
        71: "snow-fall-slight-intensity",
        73: "snow-fall-moderate-intensity",
        75: "snow-fall-heavy-intensity",
        77: "snow-grains",
        80: "rain-showers-slight",
        81: "rain-showers-moderate",
        82: "rain-showers-violent",
        85: "snow-showers-slight",
        86: "snow-showers-heavy",
        95: "thunderstorm",
        96: "thunderstorm-slight-hail",
        99: "thunderstorm-heavy-hail"
    };

    if (!Object.keys(weatherConditions).includes(`${weatherCode}`)) return "wi-na";

    switch (weatherConditions[`${weatherCode}`]) {
        case "clear":
            return isDayTime ? "day-sunny" : "night-clear";
        case "mainly-clear":
        case "partly-cloudy":
            return isDayTime ? "day-cloudy" : "night-alt-cloudy";
        case "overcast":
            return isDayTime ? "day-sunny-overcast" : "night-alt-partly-cloudy";
        case "fog":
        case "depositing-rime-fog":
            return isDayTime ? "day-fog" : "night-fog";
        case "drizzle-light-intensity":
        case "rain-slight-intensity":
        case "rain-showers-slight":
            return isDayTime ? "day-sprinkle" : "night-sprinkle";
        case "drizzle-moderate-intensity":
        case "rain-moderate-intensity":
        case "rain-showers-moderate":
            return isDayTime ? "day-showers" : "night-showers";
        case "drizzle-dense-intensity":
        case "rain-heavy-intensity":
        case "rain-showers-violent":
            return isDayTime ? "day-thunderstorm" : "night-thunderstorm";
        case "freezing-rain-light-intensity":
            return isDayTime ? "day-rain-mix" : "night-rain-mix";
        case "freezing-drizzle-light-intensity":
        case "freezing-drizzle-dense-intensity":
            return "snowflake-cold";
        case "snow-grains":
            return isDayTime ? "day-sleet" : "night-sleet";
        case "snow-fall-slight-intensity":
        case "snow-fall-moderate-intensity":
            return isDayTime ? "day-snow-wind" : "night-snow-wind";
        case "snow-fall-heavy-intensity":
        case "freezing-rain-heavy-intensity":
            return isDayTime ? "day-snow-thunderstorm" : "night-snow-thunderstorm";
        case "snow-showers-slight":
        case "snow-showers-heavy":
            return isDayTime ? "day-rain-mix" : "night-rain-mix";
        case "thunderstorm":
            return isDayTime ? "day-thunderstorm" : "night-thunderstorm";
        case "thunderstorm-slight-hail":
            return isDayTime ? "day-sleet" : "night-sleet";
        case "thunderstorm-heavy-hail":
            return isDayTime ? "day-sleet-storm" : "night-sleet-storm";
        default:
            return "na";
    }
}

export function getWindDirection(windFromDirection: number): string {
    if (windFromDirection > 11.25 && windFromDirection <= 33.75) {
        return "NNE";
    } else if (windFromDirection > 33.75 && windFromDirection <= 56.25) {
        return "NE";
    } else if (windFromDirection > 56.25 && windFromDirection <= 78.75) {
        return "ENE";
    } else if (windFromDirection > 78.75 && windFromDirection <= 101.25) {
        return "E";
    } else if (windFromDirection > 101.25 && windFromDirection <= 123.75) {
        return "ESE";
    } else if (windFromDirection > 123.75 && windFromDirection <= 146.25) {
        return "SE";
    } else if (windFromDirection > 146.25 && windFromDirection <= 168.75) {
        return "SSE";
    } else if (windFromDirection > 168.75 && windFromDirection <= 191.25) {
        return "S";
    } else if (windFromDirection > 191.25 && windFromDirection <= 213.75) {
        return "SSW";
    } else if (windFromDirection > 213.75 && windFromDirection <= 236.25) {
        return "SW";
    } else if (windFromDirection > 236.25 && windFromDirection <= 258.75) {
        return "WSW";
    } else if (windFromDirection > 258.75 && windFromDirection <= 281.25) {
        return "W";
    } else if (windFromDirection > 281.25 && windFromDirection <= 303.75) {
        return "WNW";
    } else if (windFromDirection > 303.75 && windFromDirection <= 326.25) {
        return "NW";
    } else if (windFromDirection > 326.25 && windFromDirection <= 348.75) {
        return "NNW";
    } else {
        return "N";
    }
}

export function getUVScale(uvIndex: number): string {
    if (uvIndex <= 2) {
        return "Low";
    } else if (uvIndex <= 5) {
        return "Medium";
    } else if (uvIndex <= 7) {
        return "High";
    } else if (uvIndex <= 10) {
        return "Very High";
    } else {
        return "Extreme";
    }
}

export function getDayLabel(index: number, timezone: string): string {
    const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const today = new Date(new Date().toLocaleString("en-US", { timeZone: timezone }));
    const dayIndex = (today.getDay() + index) % 7;
    const dayOfMonth = new Date(today.setDate(today.getDate() + index)).getDate().toString().padStart(2, '0');
    return daysOfWeek[dayIndex] + " " + dayOfMonth;
}

export function mapWeatherData(timezone: string, source: WeatherData): MappedWeatherData {
    const current: MappedCurrentWeather = {
        temperature: Math.round(source.current.temperature),
        weather_code: source.current.weathercode,
        weather_icon: "wi-" + getWeatherIcon(source.current.weathercode, source.current.is_day == 1 ? true : false),
        feel_like: Math.round(source.current.apparent_temperature),
        humidity: source.current.relativehumidity_2m,
        wind_speed: Math.round(source.current.windspeed_10m),
        wind_direction: getWindDirection(source.current.winddirection),
        uv_index: parseFloat(source.current.uv_index.toFixed(0)),
        uv_scale: getUVScale(source.current.uv_index),
        today_temperature_min: Math.round(source.daily.temperature_2m_min[0]),
        today_temperature_max: Math.round(source.daily.temperature_2m_max[0]),
        is_daytime: source.current.is_day == 1 ? true : false
    };

    const daily: MappedForecastWeather[] = source.daily.time.map((date: string, index: number) => ({
        date: date,
        day: getDayLabel(index, timezone),
        weather_code: source.daily.weathercode[index],
        weather_icon: "wi-" + getWeatherIcon(source.daily.weathercode[index], true),
        temperature_min: Math.round(source.daily.temperature_2m_min[index]),
        temperature_max: Math.round(source.daily.temperature_2m_max[index]),
        wind_speed: Math.round(source.daily.windspeed_10m_max[index]),
        wind_direction: getWindDirection(source.daily.winddirection_10m_dominant[index]),
        precipitation_probability: Math.round(source.daily.precipitation_probability_max[index]),
        uv_index: parseFloat(source.daily.uv_index_max[index].toFixed(0)),
        uv_scale: getUVScale(source.daily.uv_index_max[index])
    }));

    return {
        current: current,
        forecast: daily.slice(1)
    };
}