import { NavigationContainer } from "@react-navigation/native";
import BottomStackNavigator from "./BottomTabsNavigator";
import AuthStackNavigator from "./AuthStackNavigator";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setProfilePicture } from "../features/user/userSlice";
import { useGetProfilePictureQuery } from "../services/profileApi";

export default function MainNavigator() {
  const user = useSelector((state) => state.userReducer.user);
  const localId = useSelector((state) => state.userReducer.localId);

  const dispatch = useDispatch();
  const {
    data: profilePicture,
    isLoading,
    error,
  } = useGetProfilePictureQuery(localId);

  //console.log(profilePicture)

  useEffect(() => {
    if (profilePicture) {
      dispatch(setProfilePicture(profilePicture.image));
    }
  }, [profilePicture]);

  return (
    <NavigationContainer>
      {user ? <BottomStackNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
}
