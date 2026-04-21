// src/components/home/WeatherCard.tsx

import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Theme } from "../../theme/theme";

export default function WeatherCard() {
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState<any>(null);

  useEffect(() => {
    fetchWeather();
  }, []);

  const fetchWeather = async () => {
    try {
      const res = await fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=18.52&longitude=73.85&current_weather=true"
      );

      const data = await res.json();
      setWeather(data.current_weather);
    } catch (error) {
      console.log("Weather Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (code: number) => {
    if (code === 0) return "sunny";
    if (code <= 3) return "partly-sunny";
    if (code <= 48) return "cloudy";
    if (code <= 67) return "rainy";
    if (code <= 77) return "snow";
    if (code <= 99) return "thunderstorm";
    return "cloud";
  };

  const getWeatherText = (code: number) => {
    if (code === 0) return "Clear Sky";
    if (code <= 3) return "Partly Cloudy";
    if (code <= 48) return "Foggy";
    if (code <= 67) return "Rain";
    if (code <= 77) return "Snow";
    if (code <= 99) return "Storm";
    return "Weather";
  };

  return (
    <View style={styles.card}>
      {loading ? (
        <ActivityIndicator color="#fff" size="large" />
      ) : (
        <>
          {/* Left */}
          <View style={{ flex: 1 }}>
            <Text style={styles.city}>Pune Weather</Text>

            <Text style={styles.temp}>
              {Math.round(weather?.temperature)}°C
            </Text>

            <Text style={styles.status}>
              {getWeatherText(weather?.weathercode)}
            </Text>

            <Text style={styles.info}>
              Wind {weather?.windspeed} km/h
            </Text>
          </View>

          {/* Right */}
          <View style={styles.iconWrap}>
            <Ionicons
              name={getWeatherIcon(weather?.weathercode)}
              size={58}
              color="#fff"
            />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 16,
    backgroundColor: Theme.colors.primary,
    borderRadius: 24,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 5,
  },

  city: {
    color: "#E0E7FF",
    fontSize: 14,
    fontWeight: "600",
  },

  temp: {
    color: "#fff",
    fontSize: 38,
    fontWeight: "800",
    marginTop: 6,
  },

  status: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
    marginTop: 4,
  },

  info: {
    color: "#C7D2FE",
    marginTop: 6,
    fontSize: 13,
  },

  iconWrap: {
    width: 78,
    height: 78,
    borderRadius: 40,
    backgroundColor: "rgba(255,255,255,0.15)",
    justifyContent: "center",
    alignItems: "center",
  },
});