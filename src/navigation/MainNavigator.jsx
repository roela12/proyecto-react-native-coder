import { NavigationContainer } from "@react-navigation/native";
import BottomStackNavigator from "./BottomTabsNavigator";
import AuthStackNavigator from "./AuthStackNavigator";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setProfilePicture } from "../features/user/userSlice";
import { useGetProfilePictureQuery } from "../services/profileApi";
import { initSessionsTable, getSession } from "../db";
import { setUserEmail, setLocalId } from "../features/user/userSlice";
import { ActivityIndicator, View } from "react-native";

export default function MainNavigator() {
  const [checkingSession, setCheckingSession] = useState(true);
  const user = useSelector((state) => state.userReducer.user);
  const localId = useSelector((state) => state.userReducer.localId);

  const dispatch = useDispatch();
  const {
    data: profilePicture,
    isLoading,
    error,
  } = useGetProfilePictureQuery(localId);

  useEffect(() => {
    const bootstrap = async () => {
      await initSessionsTable();
      const session = await getSession(localId);
      if (session) {
        dispatch(setUserEmail(session.email));
        dispatch(setLocalId(session.localId));
      }
      setCheckingSession(false);
    };

    bootstrap();
  }, []);

  useEffect(() => {
    if (profilePicture) {
      dispatch(setProfilePicture(profilePicture.image));
    }
  }, [profilePicture]);

  if (checkingSession) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <BottomStackNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
}
