import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CartStackNavigator from "./CartStackNavigator";
import ShopStackNavigator from "./ShopStackNavigator";
import ProfileStackNavigator from "./ProfileStackNavigator";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors } from "../theme/colors";
import { View, Text } from "react-native";
import { useSelector } from "react-redux";

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  const cartItems = useSelector((state) => state.cartReducer.cartItems);
  const cartQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

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
            <View style={{ position: 'relative', width: 24, height: 24, alignItems: 'center', justifyContent: 'center' }}>
              <Ionicons
                name="cart-outline"
                size={24}
                color={focused ? colors.darkGray : colors.mediumGray}
              />
              {cartQuantity > 0 && (
                <View
                  style={{
                    position: 'absolute',
                    top: -5,
                    right: -10,
                    backgroundColor: 'red',
                    borderRadius: 10,
                    width: 20,
                    height: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>{cartQuantity}</Text>
                </View>
              )}
            </View>
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
