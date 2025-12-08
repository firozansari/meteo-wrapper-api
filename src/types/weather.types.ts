export interface CurrentWeather {
    temperature: number;
    apparent_temperature: number;
    weathercode: number;
    relativehumidity_2m: number;
    windspeed_10m: number;
    winddirection: number;
    uv_index: number;
    is_day: number;
}

export interface DailyWeather {
    time: string[];
    weathercode: number[];
    temperature_2m_min: number[];
    temperature_2m_max: number[];
    windspeed_10m_max: number[];
    winddirection_10m_dominant: number[];
    precipitation_probability_max: number[];
    uv_index_max: number[];
}

export interface WeatherData {
    current: CurrentWeather;
    daily: DailyWeather;
}

export interface MappedCurrentWeather {
    temperature: number;
    feel_like: number;
    weather_code: number;
    weather_icon: string;
    humidity: number;
    wind_speed: number;
    wind_direction: string;
    uv_index: number;
    uv_scale: string;
    today_temperature_min: number;
    today_temperature_max: number;
    is_daytime: boolean;
}

export interface MappedForecastWeather {
    date: string;
    day: string;
    weather_code: number;
    weather_icon: string;
    temperature_min: number;
    temperature_max: number;
    wind_speed: number;
    wind_direction: string;
    precipitation_probability: number;
    uv_index: number;
    uv_scale: string;
}

export interface MappedWeatherData {
    current: MappedCurrentWeather;
    forecast: MappedForecastWeather[];
}
