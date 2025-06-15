import React, { useState, useRef, useMemo, useCallback } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';

const routes = {
  "Delhi-Mumbai": {
    from: { city: "Delhi", latitude: 28.6139, longitude: 77.2090 },
    to: { city: "Mumbai", latitude: 19.0760, longitude: 72.8777 },
    distance: "1,450 km",
    time: "24 hrs"
  },
  "Delhi-Jaipur": {
    from: { city: "Delhi", latitude: 28.6139, longitude: 77.2090 },
    to: { city: "Jaipur", latitude: 26.9124, longitude: 75.7873 },
    distance: "270 km",
    time: "5 hrs"
  },
  "Delhi-Faridabad": {
    from: { city: "Delhi", latitude: 28.6139, longitude: 77.2090 },
    to: { city: "Faridabad", latitude: 28.4089, longitude: 77.3178 },
    distance: "23.4 km",
    time: "45 mins"
  },
  "Delhi-Dehradun": {
    from: { city: "Delhi", latitude: 28.6139, longitude: 77.2090 },
    to: { city: "Dehradun", latitude: 30.3165, longitude: 78.0322 },
    distance: "250 km",
    time: "6 hrs"
  }
  
};

const App = () => {
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [routeKey, setRouteKey] = useState('');

  const fromInputRef = useRef(null);
  const toInputRef = useRef(null);

  const findRoute = useCallback(() => {
    const matchKey = `${fromCity.trim()}-${toCity.trim()}`;
    const reverseKey = `${toCity.trim()}-${fromCity.trim()}`;

    if (routes[matchKey]) {
      setRouteKey(matchKey);
    } else if (routes[reverseKey]) {
      setRouteKey(reverseKey + "-reversed"); 
    } else {
      Alert.alert("No route found", "This route is not available in static data.");
      setRouteKey('');
    }
  }, [fromCity, toCity]);

  const selectedRoute = useMemo(() => {
    if (!routeKey) return null;

    if (routeKey.endsWith("-reversed")) {
      const actualKey = routeKey.replace("-reversed", "");
      const original = routes[actualKey];
      return {
        ...original,
        from: original.to,
        to: original.from,
      };
    }

    return routes[routeKey];
  }, [routeKey]);

  return (
    <View style={styles.container}>
      <View style={styles.inputBox}>
        <Text style={styles.heading}>Enter Route</Text>

        <TextInput
          ref={fromInputRef}
          style={styles.input}
          placeholder="From (e.g., Delhi)"
          placeholderTextColor="#888"
          onChangeText={setFromCity}
          returnKeyType="next"
          onSubmitEditing={() => toInputRef.current.focus()}
        />

        <TextInput
          ref={toInputRef}
          style={styles.input}
          placeholder="To (e.g., Mumbai)"
          placeholderTextColor="#888"
          onChangeText={setToCity}
        />

        <TouchableOpacity style={styles.button} onPress={findRoute}>
          <Text style={styles.buttonText}>Show Route</Text>
        </TouchableOpacity>
      </View>

      {selectedRoute && (
        <>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: selectedRoute.from.latitude,
              longitude: selectedRoute.from.longitude,
              latitudeDelta: 5,
              longitudeDelta: 5,
            }}
          >
            <Marker coordinate={selectedRoute.from} title={`From: ${selectedRoute.from.city}`} />
            <Marker coordinate={selectedRoute.to} title={`To: ${selectedRoute.to.city}`} />
            <Polyline
              coordinates={[selectedRoute.from, selectedRoute.to]}
              strokeWidth={4}
              strokeColor="blue"
            />
          </MapView>

          <View style={styles.infoBox}>
            <Text style={styles.infoText}>🚗 Distance: {selectedRoute.distance}</Text>
            <Text style={styles.infoText}>⏱️ Time: {selectedRoute.time}</Text>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  inputBox: {
    padding: 15,
    backgroundColor: "#f9f9f9",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc"
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333"
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginVertical: 8,
    padding: 10,
    color: "#000",
    backgroundColor: "#fff"
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 10
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16
  },
  map: {
    flex: 1
  },
  infoBox: {
    backgroundColor: "#f0f8ff",
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: "#ccc"
  },
  infoText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginVertical: 4
  }
});

export default App;


