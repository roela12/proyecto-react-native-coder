import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  ActivityIndicator,
} from "react-native";
import { colors } from "../../theme/colors";
import CameraIcon from "../../components/CameraIcon";
import * as ImagePicker from "expo-image-picker";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { setProfilePicture } from "../../features/user/userSlice";
import { usePutProfilePictureMutation } from "../../services/profileApi";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { clearUser } from "../../features/user/userSlice";
import { clearSession } from "../../db";

const ProfileScreen = () => {
  const user = useSelector((state) => state.userReducer.user);
  const profilePicture = useSelector(
    (state) => state.userReducer.profilePicture
  );
  const localId = useSelector((state) => state.userReducer.localId);

  const [location, setLocation] = useState(null);
  const [locationLoaded, setLocationLoaded] = useState(false);

  const [triggerPutProfilePicture, result] = usePutProfilePictureMutation();

  const dispatch = useDispatch();

  const pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.6,
      base64: true,
    });

    if (!result.canceled) {
      const imgBase64 = `data:image/jpeg;base64,${result.assets[0].base64}`;
      dispatch(setProfilePicture(imgBase64));
      triggerPutProfilePicture({ localId: localId, image: imgBase64 });
    }
  };

  useEffect(() => {
    const getCurrentLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setLocationLoaded(true);
          return;
        }
        let location = await Location.getCurrentPositionAsync({});
        if (location) {
          setLocation(location);
        }
      } catch (error) {
        console.error("Error al obtener la ubicación:", error);
      } finally {
        setLocationLoaded(true);
      }
    };

    getCurrentLocation();
  }, []);

  const handleClearSession = async () => {
    try {
      await clearSession();
    } catch {
      console.error("Hubo un error al limpiar la sesión");
    }
    dispatch(clearUser());
  };
  return (
    <View style={styles.profileContainer}>
      <View style={styles.imageProfileContainer}>
        {profilePicture ? (
          <Image
            source={{ uri: profilePicture }}
            resizeMode="cover"
            style={styles.profileImage}
          />
        ) : (
          <Text style={styles.textProfilePlaceHolder}>
            {user.charAt(0).toUpperCase()}
          </Text>
        )}
        <Pressable
          onPress={pickImage}
          style={({ pressed }) => [
            { opacity: pressed ? 0.9 : 1 },
            styles.cameraIcon,
          ]}
        >
          <CameraIcon />
        </Pressable>
      </View>
      <Text style={styles.profileData}>Email: {user} </Text>
      <Pressable
        style={({ pressed }) => [styles.btn, pressed && styles.btnPressed]}
        onPress={handleClearSession}
      >
        <Text style={styles.btnText}>Cerrar sesión</Text>
      </Pressable>
      <View style={styles.titleContainer}>
        <Text style={styles.mapTitle}>Mi ubicación actual:</Text>
      </View>
      <View style={styles.mapContainer}>
        {location ? (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              title={"my location"}
            />
          </MapView>
        ) : locationLoaded ? (
          <Text style={styles.profileData}>
            Hubo un problema al obtener la ubicación
          </Text>
        ) : (
          <ActivityIndicator />
        )}
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  profileContainer: {
    padding: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  imageProfileContainer: {
    width: 128,
    height: 128,
    borderRadius: 128,
    backgroundColor: colors.red,
    justifyContent: "center",
    alignItems: "center",
  },
  textProfilePlaceHolder: {
    color: colors.white,
    fontSize: 48,
    fontFamily: "Audiowide-Regular",
  },
  profileData: {
    paddingVertical: 16,
    fontSize: 16,
    fontFamily: "Sansation-Regular",
  },
  cameraIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  profileImage: {
    width: 128,
    height: 128,
    borderRadius: 128,
  },
  mapContainer: {
    width: "100%",
    height: 240,
    overflow: "hidden",
    elevation: 5,
    marginBottom: 16,
  },
  map: {
    height: 240,
  },
  titleContainer: {
    margin: 16,
  },
  mapTitle: {
    fontFamily: "Sansation-Bold",
    fontSize: 18,
    textAlign: "center",
  },
  btn: {
    padding: 2,
    paddingHorizontal: 12,
    backgroundColor: colors.primary,
    borderRadius: 16,
  },
  btnPressed: {
    backgroundColor: colors.lightGray,
  },
  btnText: {
    color: colors.white,
    fontSize: 18,
    fontFamily: "Sansation-Bold",
    padding: 12,
  },
});
