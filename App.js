import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import BottomStackNavigator from "./src/navigation/BottomTabsNavigator";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded, error] = useFonts({
    "Sansation-Regular": require("./assets/fonts/Sansation-Regular.ttf"),
    "Sansation-Bold": require("./assets/fonts/Sansation-Bold.ttf"),
    "Sansation-Italic": require("./assets/fonts/Sansation-Italic.ttf"),
    "Sansation-Light": require("./assets/fonts/Sansation-Light.ttf"),
    "Audiowide-Regular": require("./assets/fonts/Audiowide-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }
  return (
    <NavigationContainer>
      <BottomStackNavigator />
      <StatusBar style="light" />
    </NavigationContainer>
  );
}
