import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CategoriesScreen, ProductsScreen, ProductScreen } from "../screens";
import Header from "../components/Header";

const MyStack = createNativeStackNavigator();

const ShopStackNavigator = () => {
  return (
    <MyStack.Navigator
      initialRouteName="Categorías"
      screenOptions={{
        header: ({ route }) => <Header subtitle={route.name} />,
      }}
    >
      <MyStack.Screen name="Categorías" component={CategoriesScreen} />
      <MyStack.Screen name="Productos" component={ProductsScreen} />
      <MyStack.Screen name="Producto" component={ProductScreen} />
    </MyStack.Navigator>
  );
};

export default ShopStackNavigator;
