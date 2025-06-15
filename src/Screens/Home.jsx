// import React, { useState, useRef, useEffect } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, Platform } from 'react-native';
// import MapView, { Marker, AnimatedRegion } from 'react-native-maps';
// import { GOOGLE_MAP_KEY } from '../constants/googleMapKey';
// import imagePath from '../constants/imagePath';
// import MapViewDirections from 'react-native-maps-directions';
// import Loader from '../components/Loader';
// import { locationPermission, getCurrentLocation } from '../helper/helperFunction';

// const screen = Dimensions.get('window');
// const ASPECT_RATIO = screen.width / screen.height;
// const LATITUDE_DELTA = 0.04;
// const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

// const Home = ({ navigation }) => {
//     const mapRef = useRef()
//     const markerRef = useRef()

//     const [state, setState] = useState({
//         curLoc: {
//             latitude: 30.7046,
//             longitude: 77.1025,
//         },
//         destinationCords: {},
//         isLoading: false,
//         coordinate: new AnimatedRegion({
//             latitude: 30.7046,
//             longitude: 77.1025,
//             latitudeDelta: LATITUDE_DELTA,
//             longitudeDelta: LONGITUDE_DELTA
//         }),
//         time: 0,
//         distance: 0,
//         heading: 0

//     })

//     const { curLoc, time, distance, destinationCords, isLoading, coordinate,heading } = state
//     const updateState = (data) => setState((state) => ({ ...state, ...data }));


//     useEffect(() => {
//         getLiveLocation()
//     }, [])

//     const getLiveLocation = async () => {
//         const locPermissionDenied = await locationPermission()
//         if (locPermissionDenied) {
//             const { latitude, longitude, heading } = await getCurrentLocation()
//             console.log("get live location after 4 second",heading)
//             animate(latitude, longitude);
//             updateState({
//                 heading: heading,
//                 curLoc: { latitude, longitude },
//                 coordinate: new AnimatedRegion({
//                     latitude: latitude,
//                     longitude: longitude,
//                     latitudeDelta: LATITUDE_DELTA,
//                     longitudeDelta: LONGITUDE_DELTA
//                 })
//             })
//         }
//     }

//     useEffect(() => {
//         const interval = setInterval(() => {
//             getLiveLocation()
//         }, 6000);
//         return () => clearInterval(interval)
//     }, [])

//     const onPressLocation = () => {
//         navigation.navigate('chooseLocation', { getCordinates: fetchValue })
//     }
//     const fetchValue = (data) => {
//         console.log("this is data", data)
//         updateState({
//             destinationCords: {
//                 latitude: data.destinationCords.latitude,
//                 longitude: data.destinationCords.longitude,
//             }
//         })
//     }

//     const animate = (latitude, longitude) => {
//         const newCoordinate = { latitude, longitude };
//         if (Platform.OS == 'android') {
//             if (markerRef.current) {
//                 markerRef.current.animateMarkerToCoordinate(newCoordinate, 7000);
//             }
//         } else {
//             coordinate.timing(newCoordinate).start();
//         }
//     }

//     const onCenter = () => {
//         mapRef.current.animateToRegion({
//             latitude: curLoc.latitude,
//             longitude: curLoc.longitude,
//             latitudeDelta: LATITUDE_DELTA,
//             longitudeDelta: LONGITUDE_DELTA
//         })
//     }

//     const fetchTime = (d, t) => {
//         updateState({
//             distance: d,
//             time: t
//         })
//     }

//     return (
//         <View style={styles.container}>

//             {distance !== 0 && time !== 0 && (<View style={{ alignItems: 'center', marginVertical: 16 }}>
//                 <Text>Time left: {time.toFixed(0)} </Text>
//                 <Text>Distance left: {distance.toFixed(0)}</Text>
//             </View>)}
//             <View style={{ flex: 1 }}>
//                 <MapView
//                     ref={mapRef}
//                     style={StyleSheet.absoluteFill}
//                     initialRegion={{
//                         ...curLoc,
//                         latitudeDelta: LATITUDE_DELTA,
//                         longitudeDelta: LONGITUDE_DELTA,
//                     }}
//                 >

//                     <Marker.Animated
//                         ref={markerRef}
//                         coordinate={coordinate}
//                     >
//                         <Image
//                             source={imagePath.icBike}
//                             style={{
//                                 width: 40,
//                                 height: 40,
//                                 transform: [{rotate: `${heading}deg`}]
//                             }}
//                             resizeMode="contain"
//                         />
//                     </Marker.Animated>

//                     {Object.keys(destinationCords).length > 0 && (<Marker
//                         coordinate={destinationCords}
//                         image={imagePath.icGreenMarker}
//                     />)}

//                     {Object.keys(destinationCords).length > 0 && (<MapViewDirections
//                         origin={curLoc}
//                         destination={destinationCords}
//                         apikey={GOOGLE_MAP_KEY}
//                         strokeWidth={6}
//                         strokeColor="red"
//                         optimizeWaypoints={true}
//                         onStart={(params) => {
//                             console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
//                         }}
//                         onReady={result => {
//                             console.log(`Distance: ${result.distance} km`)
//                             console.log(`Duration: ${result.duration} min.`)
//                             fetchTime(result.distance, result.duration),
//                                 mapRef.current.fitToCoordinates(result.coordinates, {
//                                     edgePadding: {
//                                         // right: 30,
//                                         // bottom: 300,
//                                         // left: 30,
//                                         // top: 100,
//                                     },
//                                 });
//                         }}
//                         onError={(errorMessage) => {
//                             // console.log('GOT AN ERROR');
//                         }}
//                     />)}
//                 </MapView>
//                 <TouchableOpacity
//                     style={{
//                         position: 'absolute',
//                         bottom: 0,
//                         right: 0
//                     }}
//                     onPress={onCenter}
//                 >
//                     <Image source={imagePath.greenIndicator} />
//                 </TouchableOpacity>
//             </View>
//             <View style={styles.bottomCard}>
//                 <Text>Where are you going..?</Text>
//                 <TouchableOpacity
//                     onPress={onPressLocation}
//                     style={styles.inpuStyle}
//                 >
//                     <Text>Choose your location</Text>
//                 </TouchableOpacity>
//             </View>
//             <Loader isLoading={isLoading} />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
//     bottomCard: {
//         backgroundColor: 'white',
//         width: '100%',
//         padding: 30,
//         borderTopEndRadius: 24,
//         borderTopStartRadius: 24
//     },
//     inpuStyle: {
//         backgroundColor: 'white',
//         borderRadius: 4,
//         borderWidth: 1,
//         alignItems: 'center',
//         height: 48,
//         justifyContent: 'center',
//         marginTop: 16
//     }
// });

// export default Home;
// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import MapView, { Marker, Polyline } from 'react-native-maps';

// const Home = () => {
//   const fromCoords = { latitude: 28.6139, longitude: 77.2090 }; // Delhi
//   const toCoords = { latitude: 28.4089, longitude: 77.3178 };   // Faridabad

//   return (
//     <View style={styles.container}>
//       <MapView
//         style={styles.map}
//         initialRegion={{
//           latitude: 28.5,
//           longitude: 77.25,
//           latitudeDelta: 0.4,
//           longitudeDelta: 0.4,
//         }}
//       >
//         <Marker coordinate={fromCoords} title="Origin" />
//         <Marker coordinate={toCoords} title="Destination" />
//         <Polyline
//           coordinates={[fromCoords, toCoords]}
//           strokeWidth={4}
//           strokeColor="blue"
//         />
//       </MapView>
//       <Text style={styles.info}>Distance: 23.4 km</Text>
//       <Text style={styles.info}>Time: 45 mins</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   map: { flex: 1 },
//   info: { textAlign: 'center', marginVertical: 5, fontSize: 16 }
// });

// export default Home;
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

const Home = () => {
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [routeKey, setRouteKey] = useState('');

  const fromInputRef = useRef(null);
  const toInputRef = useRef(null);

  // 🔁 useCallback to avoid re-creating function on every render
  const findRoute = useCallback(() => {
    const matchKey = `${fromCity.trim()}-${toCity.trim()}`;
    const reverseKey = `${toCity.trim()}-${fromCity.trim()}`;

    if (routes[matchKey]) {
      setRouteKey(matchKey);
    } else if (routes[reverseKey]) {
      setRouteKey(reverseKey + "-reversed"); // mark it reversed
    } else {
      Alert.alert("No route found", "This route is not available in static data.");
      setRouteKey('');
    }
  }, [fromCity, toCity]);

  // 📌 useMemo to avoid recalculating selectedRoute unless routeKey changes
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

export default Home;
