import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import BottomStackNavigator from "./src/navigation/BottomTabsNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <BottomStackNavigator />
      <StatusBar style="light" />
    </NavigationContainer>
  );
}
