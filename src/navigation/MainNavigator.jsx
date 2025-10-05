import { NavigationContainer } from "@react-navigation/native";
import BottomStackNavigator from "./BottomTabsNavigator";
import AuthStackNavigator from "./AuthStackNavigator";
import { useSelector, useDispatch } from "react-redux";

export default function MainNavigator() {
  //const user = useSelector((state) => state.userReducer.user);
  const user = null;
  const dispatch = useDispatch();
  return (
    <NavigationContainer>
      {user ? <BottomStackNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
}
