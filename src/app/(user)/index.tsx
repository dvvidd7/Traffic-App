import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Alert, View, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import 'react-native-get-random-values';
import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, Alert, View, Text, TouchableOpacity, Modal, FlatList } from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setDestination, selectDestination } from "@/slices/navSlice";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_PLACES_LEGACY } from "@env";
import MapViewDirections from 'react-native-maps-directions';

const INITIAL_REGION = {
  latitude: 44.1765368,
  longitude: 28.6517479,
  latitudeDelta: 1,
  longitudeDelta: 1,
};

type Hazard = {
  id: number;
  label: string;
  icon: string;
};

const hazards: Hazard[] = [
  { id: 1, label: "Accident", icon: "🚗💥" },
  { id: 2, label: "Traffic Jam", icon: "🚦" },
  { id: 3, label: "Roadblock", icon: "🚧" },
  { id: 4, label: "Weather Hazard", icon: "🌧️" },
];

export default function TabOneScreen() {
  const { dark } = useTheme();
  const [hasPermission, setHasPermission] = useState(false);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const mapRef = useRef<MapView>(null);
  const dispatch = useDispatch();
  const destination = useSelector(selectDestination);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Permission to access location was denied");
          setHasPermission(false);
          return;
        }
        setHasPermission(true);
        const location = await Location.getCurrentPositionAsync({});
        setUserLocation(location.coords);
      } catch (error) {
        console.error("Error getting location:", error);
      }
    })();
  }, []);
  useEffect(() => {
    if (destination) {
      handleAutocompletePress();
    }
  }, [destination]);

  useEffect(()=>{
    if(!destination) return;

    mapRef.current?.fitToSuppliedMarkers(['origin', 'destination'], {
      edgePadding: {top: 50, bottom: 50, left: 50, right: 50}
    })
  }, [destination])

  const handleMyLocationPress = async () => {
    try {
      const location = await Location.getCurrentPositionAsync({});
      setUserLocation(location.coords);
      if (mapRef.current) {
        mapRef.current.animateToRegion(
          {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          },
          1000
        );
      }
    } catch (error) {
      Alert.alert("Error", "Could not get current location.");
    }
  };

  const handleControlPanelButton = () => {
    setModalVisible(true);
  };

  const handleSelectHazard = (hazard: Hazard) => {
    Alert.alert("Hazard Reported", `You selected: ${hazard.label}`);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {hasPermission ? (
        <>
          <GooglePlacesAutocomplete
            placeholder="Where do you want to go?"
            fetchDetails={true}
            nearbyPlacesAPI="GooglePlacesSearch"
            onPress={(data, details = null) => {
              if (!details || !details.geometry) return;
              dispatch(
                setDestination({
                  location: details.geometry.location,
                  description: data.description,
                }))
              }}
              query={{
                key: 'AIzaSyDe5nUC7KKAhkysUfBB9ofQ2FKRM9rE_Qc',
                language: 'en',
              }}
              onFail={error => console.error(error)}
              styles={{
                container: styles.topSearch,
                textInput: [
                  styles.searchInput,
                  isFocused && styles.searchInputFocused,
                  dark && styles.searchInputDark
                ],
              }}
              textInputProps={{
                onFocus: () => setIsFocused(true),
                onBlur: () => setIsFocused(false),
                placeholderTextColor: dark ? 'white' : 'black',
              }}
              debounce={300}
            />
          {/* </View> */}
          <MapView
            ref={mapRef}
            style={styles.map}
            customMapStyle={dark ? mapDark : []}
            initialRegion={INITIAL_REGION}
            showsUserLocation={true}
            showsMyLocationButton={false} // Hide the default button
            onMapReady={() => console.log("Map is ready")}
            region={{
              latitude: userLocation?.latitude || INITIAL_REGION.latitude,
              longitude: userLocation?.longitude || INITIAL_REGION.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            {destination && userLocation?.latitude && userLocation?.longitude && (
              <MapViewDirections
                origin={{
                  latitude: userLocation.latitude,
                  longitude: userLocation.longitude
                }}
                destination={destination.description}
                apikey={GOOGLE_MAPS_PLACES_LEGACY}
                strokeWidth={5}
                strokeColor='black'
              />
            )}
            {destination?.location && userLocation && (
              <Marker 
                coordinate={{
                  latitude: destination.location.lat,
                  longitude: destination.location.lng,
                }}
                title='Destination'
                description={destination.description}
                identifier='destination'
              />
            )}
            {userLocation && destination && (
              <Marker 
              coordinate={{
                latitude: userLocation?.latitude,
                longitude: userLocation?.longitude,
              }}
              title='Origin'
              identifier='origin'
            />
            )}
          </MapView>
          <TouchableOpacity style={styles.myLocationButton} onPress={handleMyLocationPress}>
            <Feather name="navigation" size={20} color="white" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.controlPanelButton} onPress={handleControlPanelButton}>
            <Feather name="alert-triangle" size={20} color="black" />
          </TouchableOpacity>

          {/* Hazard Selection Modal */}
          <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Select a Hazard</Text>
                <FlatList
                  data={hazards}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity style={styles.hazardButton} onPress={() => handleSelectHazard(item)}>
                      <Text style={styles.hazardText}>
                        {item.icon} {item.label}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
                <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                  <Text style={styles.closeButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </>
      ) : (
        <Text style={styles.permissionText}>Location Permission Required. Please allow location access to view the map.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  topSearch: {
    position:"absolute",
    top: 30,
    width: "85%",
    zIndex: 5,
    marginTop: 60,
    alignSelf:"center"
  },
  searchInput: {
    borderWidth: 2,
    borderColor: "gray",
    height: 50,
    borderRadius: 25,
    paddingLeft: 25,
    backgroundColor: "white",
  },
  searchInputDark: {
    backgroundColor: "black",
    color: "white",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  permissionText: {
    textAlign: "center",
    padding: 20,
    fontSize: 16,
  },
  myLocationButton: {
    position: "absolute",
    bottom: 180,
    right: 35,
    backgroundColor: "#0384fc",
    borderRadius: 60,
    padding: 13,
  },
  controlPanelButton: {
    position: "absolute",
    bottom: 180,
    left: 35,
    backgroundColor: "#ffe900",
    borderRadius: 60,
    padding: 13,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", textAlign: "center", marginBottom: 10 },
  hazardButton: { padding: 15, marginVertical: 5, backgroundColor: "#ddd", borderRadius: 10, alignItems: "center" },
  hazardText: { fontSize: 16 },
  closeButton: { marginTop: 10, padding: 10, backgroundColor: "#ff4d4d", borderRadius: 10, alignItems: "center" },
  closeButtonText: { color: "white", fontWeight: "bold" },
});
