import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CartScreen } from "../screens";
import Header from "../components/Header";

const MyStack = createNativeStackNavigator();

const CartStackNavigator = () => {
  return (
    <MyStack.Navigator
      initialRouteName="Carrito"
      screenOptions={{
        header: ({ route }) => <Header subtitle={route.name} />,
      }}
    >
      <MyStack.Screen name="Carrito" component={CartScreen} />
    </MyStack.Navigator>
  );
};

export default CartStackNavigator;
