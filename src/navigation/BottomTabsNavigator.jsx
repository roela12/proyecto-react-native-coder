import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CartStackNavigator from "./CartStackNavigator";
import ShopStackNavigator from "./ShopStackNavigator";
import ProfileStackNavigator from "./ProfileStackNavigator";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors } from "../theme/colors";

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Tienda"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Tienda"
        component={ShopStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="storefront-outline"
              size={24}
              color={focused ? colors.darkGray : colors.mediumGray}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Carrito"
        component={CartStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="cart-outline"
              size={24}
              color={focused ? colors.darkGray : colors.mediumGray}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="person-outline"
              size={24}
              color={focused ? colors.darkGray : colors.mediumGray}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
export default BottomTabNavigator;
