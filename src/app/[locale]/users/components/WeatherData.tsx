// utils/WeatherData.tsx
import React from 'react';
import { useTranslations } from 'next-intl';

interface WeatherDataProps {
  weatherCode: number;
}

const WeatherData: React.FC<WeatherDataProps> = ({ weatherCode }) => {
  const t = useTranslations('Weather');

  const weatherName = t(weatherCode.toString()) || t('UnknownWeather');

  return <span>{weatherName}</span>;
};

export default WeatherData;
