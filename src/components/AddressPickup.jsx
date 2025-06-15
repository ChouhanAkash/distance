import React from 'react';
import { StyleSheet, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAP_KEY } from '../constants/googleMapKey';

const AddressPickup = ({ placheholderText, fetchAddress }) => {
  const getPlaceDetailsFromId = async (placeId) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${GOOGLE_MAP_KEY}`
      );
      const json = await response.json();
      if (json.status === "NOT_FOUND") {
        console.error("The provided Place ID is no longer valid.");
        return null;
      }
      console.log("🌐 Fallback response from API:", json.result);
      return json.result || null;
    } catch (error) {
      console.error("Error during fallback fetch:", error);
      return null;
    }
  };

  const onPressAddress = async (data, details = null) => {
    if (!data) {
      console.warn("data is missing in onPressAddress");
      return;
    }

    console.log("📍 Selected Place:", data.description);

    if (!details && data?.place_id) {
      console.warn("⚠️ 'details' was missing. Fetching manually...");
      details = await getPlaceDetailsFromId(data.place_id);
    }

    if (!details || !details.address_components || !details.geometry) {
      console.error("❌ Even after fallback, details are missing.");
      return;
    }

    try {
      let zipCode = '';
      const components = details.address_components;

      const cityComponent = components.find(comp =>
        comp.types.includes("locality") || comp.types.includes("sublocality")
      );

      const postalComponent = components.find(comp =>
        comp.types.includes("postal_code")
      );

      if (postalComponent) {
        zipCode = postalComponent.long_name;
      }

      const cityText = cityComponent?.long_name?.length > 17
        ? cityComponent?.short_name
        : cityComponent?.long_name;

      const lat = details.geometry.location.lat;
      const lng = details.geometry.location.lng;

      console.log("✅ Parsed Output:", { lat, lng, zipCode, cityText });

      fetchAddress(lat, lng, zipCode, cityText);

    } catch (err) {
      console.error("❌ Error processing location details:", err);
    }
  };

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder={placheholderText}
        fetchDetails={true}
        onPress={(data, details = null) => onPressAddress(data, details)}
        debounce={300}
        query={{
          key: GOOGLE_MAP_KEY,
          language: 'en',
        }}
        styles={{
          textInputContainer: styles.containerStyle,
          textInput: styles.textInputStyle,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerStyle: {
    backgroundColor: 'white',
  },
  textInputStyle: {
    height: 48,
    color: 'black',
    fontSize: 16,
    backgroundColor: '#f3f3f3',
  },
});

export default AddressPickup;

