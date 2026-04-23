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
  const [loading, setLoading] =
    useState(true);

  const [weather, setWeather] =
    useState<any>(null);

  useEffect(() => {
    fetchWeather();
  }, []);

  const fetchWeather = async () => {
    try {
      const res = await fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=18.5204&longitude=73.8567&current_weather=true"
      );

      const data = await res.json();

      setWeather(
        data.current_weather
      );
    } catch (error) {
      console.log(
        "Weather Error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (
    code: number
  ) => {
    if (code === 0)
      return "sunny";
    if (code <= 3)
      return "partly-sunny";
    if (code <= 48)
      return "cloudy";
    if (code <= 67)
      return "rainy";
    if (code <= 77)
      return "snow";
    if (code <= 99)
      return "thunderstorm";

    return "cloud";
  };

  const getWeatherText = (
    code: number
  ) => {
    if (code === 0)
      return "Clear Sky";
    if (code <= 3)
      return "Partly Cloudy";
    if (code <= 48)
      return "Foggy";
    if (code <= 67)
      return "Rain";
    if (code <= 77)
      return "Snow";
    if (code <= 99)
      return "Storm";

    return "Weather";
  };

  const getSafetyTip = (
    code: number
  ) => {
    if (code <= 3)
      return "Good day for rooftop work";
    if (code <= 67)
      return "Use anti-slip shoes";
    if (code <= 99)
      return "Avoid outdoor maintenance";

    return "Check safety gear";
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.heading}>
        Weather Insight
      </Text>

      <View style={styles.card}>
        {/* BG Circles */}
        <View
          style={styles.circle1}
        />
        <View
          style={styles.circle2}
        />

        {loading ? (
          <View
            style={
              styles.loaderBox
            }
          >
            <ActivityIndicator
              size="large"
              color="#fff"
            />

            <Text
              style={
                styles.loadingText
              }
            >
              Loading weather...
            </Text>
          </View>
        ) : (
          <>
            {/* Left */}
            <View
              style={{
                flex: 1,
              }}
            >
              <Text
                style={
                  styles.city
                }
              >
                Pune,
                Maharashtra
              </Text>

              <Text
                style={
                  styles.temp
                }
              >
                {Math.round(
                  weather?.temperature
                )}
                °C
              </Text>

              <Text
                style={
                  styles.status
                }
              >
                {getWeatherText(
                  weather?.weathercode
                )}
              </Text>

              <View
                style={
                  styles.metaRow
                }
              >
                <View
                  style={
                    styles.metaChip
                  }
                >
                  <Ionicons
                    name="speedometer-outline"
                    size={14}
                    color="#fff"
                  />
                  <Text
                    style={
                      styles.metaText
                    }
                  >
                    {
                      weather?.windspeed
                    }{" "}
                    km/h
                  </Text>
                </View>

                <View
                  style={
                    styles.metaChip
                  }
                >
                  <Ionicons
                    name="sunny-outline"
                    size={14}
                    color="#fff"
                  />
                  <Text
                    style={
                      styles.metaText
                    }
                  >
                    Live
                  </Text>
                </View>
              </View>
            </View>

            {/* Right */}
            <View
              style={
                styles.rightSide
              }
            >
              <View
                style={
                  styles.iconWrap
                }
              >
                <Ionicons
                  name={getWeatherIcon(
                    weather?.weathercode
                  )}
                  size={54}
                  color="#fff"
                />
              </View>

              <Text
                style={
                  styles.tip
                }
              >
                {getSafetyTip(
                  weather?.weathercode
                )}
              </Text>
            </View>
          </>
        )}
      </View>
    </View>
  );
}

const styles =
  StyleSheet.create({
    wrapper: {
      marginTop: 18,
    },

    heading: {
      fontSize: 18,
      fontWeight: "800",
      color: "#0F172A",
      marginBottom: 12,
    },

    card: {
      backgroundColor:
        Theme.colors.primary,
      borderRadius: 26,
      padding: 20,
      minHeight: 190,
      flexDirection: "row",
      alignItems: "center",
      overflow: "hidden",

      shadowColor: "#000",
      shadowOpacity: 0.08,
      shadowRadius: 10,
      elevation: 5,
    },

    circle1: {
      position: "absolute",
      top: -40,
      right: -30,
      width: 140,
      height: 140,
      borderRadius: 80,
      backgroundColor:
        "rgba(255,255,255,0.08)",
    },

    circle2: {
      position: "absolute",
      bottom: -50,
      left: -20,
      width: 120,
      height: 120,
      borderRadius: 80,
      backgroundColor:
        "rgba(255,255,255,0.06)",
    },

    loaderBox: {
      flex: 1,
      justifyContent:
        "center",
      alignItems: "center",
    },

    loadingText: {
      color: "#fff",
      marginTop: 12,
      fontWeight: "600",
    },

    city: {
      color: "#E0E7FF",
      fontSize: 14,
      fontWeight: "600",
    },

    temp: {
      color: "#fff",
      fontSize: 42,
      fontWeight: "900",
      marginTop: 8,
    },

    status: {
      color: "#fff",
      fontSize: 15,
      fontWeight: "700",
      marginTop: 4,
    },

    metaRow: {
      flexDirection: "row",
      gap: 10,
      marginTop: 14,
      flexWrap: "wrap",
    },

    metaChip: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor:
        "rgba(255,255,255,0.14)",
      paddingHorizontal: 10,
      paddingVertical: 7,
      borderRadius: 14,
    },

    metaText: {
      color: "#fff",
      marginLeft: 6,
      fontSize: 12,
      fontWeight: "600",
    },

    rightSide: {
      marginLeft: 14,
      alignItems: "center",
      width: 110,
    },

    iconWrap: {
      width: 84,
      height: 84,
      borderRadius: 42,
      backgroundColor:
        "rgba(255,255,255,0.15)",
      justifyContent:
        "center",
      alignItems: "center",
    },

    tip: {
      marginTop: 10,
      color: "#DBEAFE",
      fontSize: 11,
      textAlign: "center",
      fontWeight: "600",
      lineHeight: 16,
    },
  });