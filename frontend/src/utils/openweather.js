import {
  NA, Thunderstorm, Lightning,
  Sprinkle, Rain, RainMix, Showers, StormShowers, Smoke,
  Snow, Sleet, DayHaze, Dust, Fog, CloudyGusts, Tornado, Cloud, DaySunny, DaySunnyOvercast, Cloudy
} from "./weatherIcons";

const WEATHER_COND_CODE = {
  200: {
    type: "Thunderstorm",
    description: "Thunderstorm with light rain",
    icon: Thunderstorm,
  },
  201: {
    type: "Thunderstorm",
    description: "Thunderstorm with rain",
    icon: Thunderstorm,
  },
  202: {
    type: "Thunderstorm",
    description: "Thunderstorm with heavy rain",
    icon: Thunderstorm,
  },
  210: {
    type: "Thunderstorm",
    description: "Light thunderstorm",
    icon: Lightning,
  },
  211: {
    type: "Thunderstorm",
    description: "Thunderstorm",
    icon: Lightning,
  },
  212: {
    type: "Thunderstorm",
    description: "Heavy thunderstorm",
    icon: Lightning,
  },
  221: {
    type: "Thunderstorm",
    description: "Ragged thunderstorm",
    icon: Lightning,
  },
  230: {
    type: "Thunderstorm",
    description: "Thunderstorm with light drizzle",
    icon: Thunderstorm,
  },
  231: {
    type: "Thunderstorm",
    description: "Thunderstorm with drizzle",
    icon: Thunderstorm,
  },
  232: {
    type: "Thunderstorm",
    description: "Thunderstorm with heavy drizzle",
    icon: Thunderstorm,
  },

  300: {
    type: "Drizzle",
    description: "Light intensity drizzle",
    icon: Sprinkle,
  },
  301: {
    type: "Drizzle",
    description: "Drizzle",
    icon: Sprinkle,
  },
  302: {
    type: "Drizzle",
    description: "Heavy intensity drizzle",
    icon: Rain,
  },
  310: {
    type: "Drizzle",
    description: "Light intensity drizzle rain",
    icon: RainMix,
  },
  311: {
    type: "Drizzle",
    description: "Drizzle rain",
    icon: Rain,
  },
  312: {
    type: "Drizzle",
    description: "Heavy intensity drizzle rain",
    icon: Rain,
  },
  313: {
    type: "Drizzle",
    description: "Shower rain and drizzle",
    icon: Showers,
  },
  314: {
    type: "Drizzle",
    description: "Heavy shower rain and drizzle",
    icon: Rain,
  },
  321: {
    type: "Drizzle",
    description: "Shower drizzle",
    icon: Sprinkle,
  },

  500: {
    type: "Rain",
    description: "Light rain",
    icon: Sprinkle,
  },
  501: {
    type: "Rain",
    description: "Moderate rain",
    icon: Rain,
  },
  502: {
    type: "Rain",
    description: "Heavy intensity rain",
    icon: Rain,
  },
  503: {
    type: "Rain",
    description: "Very heavy rain",
    icon: Rain,
  },
  504: {
    type: "Rain",
    description: "Extreme rain",
    icon: Rain,
  },
  511: {
    type: "Rain",
    description: "Freezing rain",
    icon: RainMix,
  },
  520: {
    type: "Rain",
    description: "Light intensity shower rain",
    icon: Showers,
  },
  521: {
    type: "Rain",
    description: "Shower rain",
    icon: Showers,
  },
  522: {
    type: "Rain",
    description: "Heavy intensity shower rain",
    icon: Showers,
  },
  531: {
    type: "Rain",
    description: "Ragged shower rain",
    icon: StormShowers,
  },

  600: {
    type: "Snow",
    description: "Light snow",
    icon: Snow,
  },
  601: {
    type: "Snow",
    description: "Snow",
    icon: Snow,
  },
  602: {
    type: "Snow",
    description: "Heavy snow",
    icon: Sleet,
  },
  611: {
    type: "Snow",
    description: "Sleet",
    icon: RainMix,
  },
  612: {
    type: "Snow",
    description: "Light shower sleet",
    icon: RainMix,
  },
  613: {
    type: "Snow",
    description: "Shower sleet",
    icon: Sleet,
  },
  615: {
    type: "Snow",
    description: "Light rain and snow",
    icon: RainMix,
  },
  616: {
    type: "Snow",
    description: "Rain and snow",
    icon: RainMix,
  },
  620: {
    type: "Snow",
    description: "Light shower snow",
    icon: RainMix,
  },
  621: {
    type: "Snow",
    description: "Shower snow",
    icon: Snow,
  },
  622: {
    type: "Snow",
    description: "Heavy shower snow",
    icon: Snow,
  },

  701: {
    type: "Mist",
    description: "Mist",
    icon: Showers,
  },
  711: {
    type: "Smoke",
    description: "Smoke",
    icon: Smoke,
  },
  721: {
    type: "Haze",
    description: "Haze",
    icon: DayHaze,
  },
  731: {
    type: "Dust",
    description: "Sand/ Dust whirls",
    icon: Dust,
  },
  741: {
    type: "Fog",
    description: "Fog",
    icon: Fog,
  },
  751: {
    type: "Sand",
    description: "Sand",
    icon: Dust,
  },
  761: {
    type: "Dust",
    description: "Dust",
    icon: Dust,
  },
  762: {
    type: "Ash",
    description: "Volcanic ash",
    icon: Dust,
  },
  771: {
    type: "Squall",
    description: "Squalls",
    icon: CloudyGusts,
  },
  781: {
    type: "Tornado",
    description: "Tornado",
    icon: Tornado,
  },

  800: {
    type: "Clouds",
    description: "Clear sky",
    icon: DaySunny,
  },
  801: {
    type: "Clouds",
    description: "Few clouds: 11-25%",
    icon: DaySunnyOvercast,
  },
  802: {
    type: "Clouds",
    description: "Scattered clouds: 25-50%",
    icon: Cloud,
  },
  803: {
    type: "Clouds",
    description: "Broken clouds: 51-84%",
    icon: Cloudy,
  },
  804: {
    type: "Clouds",
    description: "Vercast clouds: 85-100%",
    icon: Cloudy,
  }
}

const getWeatherConditionByCode = (conditionCode) => {
  const weatherCond = WEATHER_COND_CODE[conditionCode];
  if (weatherCond != null) {
    return weatherCond;
  }
  return {type: "Unknow", description: "Unknow weather condition", icon: NA}
}

const getWeatherConditionIcon = (conditionCode, size) => {
  return getWeatherConditionByCode(conditionCode).icon;
}

export {
  getWeatherConditionByCode,
  getWeatherConditionIcon,
};