import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CartStackNavigator from "./CartStackNavigator";
import ShopStackNavigator from "./ShopStackNavigator";

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Tienda"
      screenOptions={{
        headerShown: false,
        //tabBarShowLabel: false,
      }}
    >
      <Tab.Screen name="Tienda" component={ShopStackNavigator} />
      <Tab.Screen name="Carrito" component={CartStackNavigator} />
    </Tab.Navigator>
  );
}
export default BottomTabNavigator;
