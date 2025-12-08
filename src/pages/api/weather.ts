// pages/api/weather.ts

import { NextApiRequest, NextApiResponse } from "next";
import { mapWeatherData } from '../../utils/weather.utils';
import { fetchWeatherData } from '../../services/weather.service';


// Define a specific GUID value
const VALID_TOKEN = '123e4567-e89b-12d3-a456-426614174001';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {  
  // Get latitude and longitude from query parameters
  const timezone = req.query.timezone as string;
  const latitude = parseFloat(req.query.latitude as string);
  const longitude = parseFloat(req.query.longitude as string);

  if (!timezone) {
    res.status(400).json({ error: 'Timezone is required' });
    return;
  }  

  if (isNaN(latitude) || isNaN(longitude)) {
    res.status(400).json({ error: 'Invalid latitude or longitude' });
    return;
  }

  try {
    const weatherData = await fetchWeatherData(timezone, latitude, longitude);
    const mappedWeatherData = mapWeatherData(timezone, weatherData);

    res.status(200).json(mappedWeatherData);
  } catch (error) {
    console.error('Error:', error);
    
    const typedError = error as Error;
    res.status(500).json({ error: typedError.message });
  }
}
