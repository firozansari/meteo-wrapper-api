import { WeatherData } from '../types/weather.types';

export async function fetchWeatherData(timezone: string, latitude: number, longitude: number): Promise<WeatherData> {
    const currentDate = new Date();
    const startDate = currentDate.toISOString().split('T')[0];
    const endDate = new Date(currentDate.setDate(currentDate.getDate() + 6)).toISOString().split('T')[0];

    const url = `https://api.open-meteo.com/v1/forecast?` +
        `timezone=${encodeURIComponent(timezone)}&` + 
        `latitude=${latitude}&` +
        `longitude=${longitude}&` +
        `timeformat=iso8601&` +
        `current=temperature,apparent_temperature,windspeed,winddirection,weathercode,relativehumidity_2m,windspeed_10m,uv_index,is_day&` +
        `daily=temperature_2m_max,temperature_2m_min,weathercode,windspeed_10m_max,winddirection_10m_dominant,precipitation_probability_max,uv_index_max&` +
        `temperature_unit=fahrenheit&` +
        `windspeed_unit=mph&` +
        `precipitation_unit=inch&` +
        `start_date=${startDate}&` +
        `end_date=${endDate}`;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Error fetching weather data: ${response.statusText}`);
    }

    const data = await response.json() as WeatherData;
    return data;
}