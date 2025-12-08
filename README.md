# TRMNL Weather Office Wrapper

A specialized Next.js API wrapper designed to fetch, format, and serve weather data from [Open-Meteo](https://open-meteo.com/) for [TRMNL](https://usetrmnl.com/) e-ink displays.

This project acts as a middleware that simplifies the complex Open-Meteo API response into a clean, display-ready JSON format, specifically tailored for the limited screen real estate and specific icon sets used by TRMNL devices.

## 🚀 Features

- **Open-Meteo Integration**: Fetches accurate forecast data without requiring an API key.
- **Data Transformation**: Maps raw weather codes to [Weather Icons](https://erikflowers.github.io/weather-icons/) class names.
- **Smart Formatting**:
  - Converts wind direction degrees to cardinal directions (N, NE, E, etc.).
  - Calculates UV scales.
  - Formats dates and times for display.
- **TRMNL Ready**: Includes a markup template (`markups/trmnl.html`) optimized for the device.

## 🛠️ Prerequisites

- **Node.js**: v18 or higher recommended.
- **Package Manager**: npm, yarn, or pnpm.

## 📦 Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/firozansari/meteo-wrapper-api.git
    cd meteo-wrapper-api
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

## 🏃‍♂️ Running the Application

### Development Mode
Start the development server with hot-reloading:
```bash
npm run dev
```
The API will be available at `http://localhost:3000/api/weather`.

### Production Build
Build and start the production server:
```bash
npm run build
npm start
```

## 🔌 API Documentation

### Get Weather Data

**Endpoint:** `GET /api/weather`

Fetches current weather and a 6-day forecast for a specific location.

#### Query Parameters

| Parameter   | Type     | Required | Description                                      |
| :---------- | :------- | :------- | :----------------------------------------------- |
| `timezone`  | `string` | Yes      | IANA time zone identifier (e.g., `America/New_York`). |
| `latitude`  | `float`  | Yes      | Latitude of the location.                        |
| `longitude` | `float`  | Yes      | Longitude of the location.                       |

#### Example Request

```http
GET /api/weather?timezone=America/New_York&latitude=40.7667&longitude=-73.9750
```

#### Example Response

```json
{
  "current": {
    "temperature": 72.5,
    "feel_like": 70.1,
    "weather_code": 1,
    "weather_icon": "day-cloudy",
    "humidity": 45,
    "wind_speed": 12.5,
    "wind_direction": "NW",
    "uv_index": 5,
    "uv_scale": "Moderate",
    "today_temperature_min": 65.0,
    "today_temperature_max": 75.0,
    "is_daytime": true
  },
  "forecast": [
    {
      "date": "2023-10-27",
      "day": "Friday",
      "weather_code": 3,
      "weather_icon": "day-cloudy",
      "temperature_min": 60.5,
      "temperature_max": 70.2,
      "wind_speed": 10.0,
      "wind_direction": "W",
      "precipitation_probability": 20,
      "uv_index": 4,
      "uv_scale": "Moderate"
    }
    // ... 5 more days
  ]
}
```

## 📂 Project Structure

```
.
├── markups/
│   └── trmnl.html          # HTML template for TRMNL display
├── src/
│   ├── pages/
│   │   └── api/
│   │       └── weather.ts  # Main API endpoint handler
│   ├── services/
│   │   └── weather.service.ts # Open-Meteo API fetch logic
│   ├── utils/
│   │   └── weather.utils.ts   # Data mapping and formatting helpers
│   └── types/
│       └── weather.types.ts   # TypeScript interfaces
├── public/
└── ...
```

## 📟 TRMNL Integration

The `markups/trmnl.html` file contains the HTML structure intended for the TRMNL device. It uses the `weather-icons` CSS library.

To use this with your TRMNL device:
1.  Host this API on a public server (e.g., Vercel, Netlify, or a VPS).
2.  Configure your TRMNL plugin to fetch data from your deployed `/api/weather` endpoint.
3.  Use the content of `markups/trmnl.html` as your view template in the TRMNL dashboard, ensuring the variable names match the JSON response structure (e.g., `{{current.temperature}}`).

## 🔧 Advanced Configuration

### Changing Units
Currently, units are hardcoded to Imperial (Fahrenheit, mph, inch) in `src/services/weather.service.ts`. To change this to Metric:
1.  Open `src/services/weather.service.ts`.
2.  Modify the query parameters in the `url` string:
    -   `temperature_unit=celsius`
    -   `windspeed_unit=kmh`
    -   `precipitation_unit=mm`

### Customizing Icons
Weather icon mapping logic is located in `src/utils/weather.utils.ts`. The `getWeatherIcon` function maps WMO weather codes to specific class names from the `weather-icons` library. You can modify the `weatherConditions` object or the switch statement to use different icons.

## 📄 License

MIT License

Copyright (c) 2025 Firoz Ansari

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
