import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
} from "react-native";
import { colors } from "../../theme/colors";
import FlatCard from "../../components/FlatCard";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSelector, useDispatch } from "react-redux";
import { removeItems } from "../../features/cart/cartSlice";

const CartScreen = () => {
  const cartItems = useSelector((state) => state.cartReducer.cartItems);
  const total = useSelector((state) => state.cartReducer.total);

  const dispatch = useDispatch();
  const FooterComponent = () => (
    <View style={styles.footerContainer}>
      <Text style={styles.footerTotal}>Total: $ {total} </Text>
      <Pressable
        style={({ pressed }) => [
          { opacity: pressed ? 0.9 : 1 },
          styles.confirmButton,
        ]}
      >
        <Text style={styles.confirmButtonText}>Confirmar</Text>
      </Pressable>
    </View>
  );

  const renderCartItem = ({ item }) => (
    <FlatCard style={styles.cartContainer}>
      <View>
        <Image
          source={{ uri: item.mainImage }}
          style={styles.cartImage}
          resizeMode="cover"
        />
      </View>
      <View style={styles.cartDescription}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.shortDescription}</Text>
        <Text style={styles.text}>Precio unitario: $ {item.price}</Text>
        <Text stlyle={styles.text}>Cantidad: {item.quantity}</Text>
        <Text style={styles.total}>Total: $ {item.quantity * item.price}</Text>
        <Pressable onPress={() => dispatch(removeItems(item.id))}>
          <Ionicons
            name="trash-outline"
            size={24}
            color="#FC7A5E"
            style={styles.trashIcon}
          />
        </Pressable>
      </View>
    </FlatCard>
  );

  return (
    <>
      {cartItems.length > 0 ? (
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id}
          renderItem={renderCartItem}
          ListHeaderComponent={
            <Text style={styles.cartScreenTitle}>Tu carrito:</Text>
          }
          ListFooterComponent={<FooterComponent />}
        />
      ) : (
        <View style={styles.noProductsContainer}>
          <Text style={styles.noProductsText}>
            Aún no hay productos en el carrito
          </Text>
        </View>
      )}
    </>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  cartContainer: {
    flexDirection: "row",
    padding: 20,
    justifyContent: "flex-start",
    margin: 16,
    alignItems: "center",
    gap: 10,
  },
  cartImage: {
    width: 80,
    height: 80,
  },
  cartDescription: {
    width: "80%",
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontFamily: "Sansation-Bold",
  },
  description: {
    marginBottom: 16,
    fontFamily: "Sansation-Regular",
  },
  total: {
    marginTop: 16,
    fontSize: 18,
    fontFamily: "Sansation-Bold",
  },
  trashIcon: {
    alignSelf: "flex-end",
    marginRight: 16,
  },
  footerContainer: {
    padding: 32,
    gap: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  footerTotal: {
    fontSize: 18,
    fontFamily: "Sansation-Bold",
  },
  confirmButton: {
    padding: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: colors.primary,
    borderRadius: 16,
    margin: 24,
  },
  confirmButtonText: {
    color: colors.white,
    fontSize: 18,
    fontFamily: "Sansation-Bold",
  },
  cartScreenTitle: {
    fontSize: 18,
    fontFamily: "Sansation-Bold",
    textAlign: "center",
    paddingVertical: 14,
  },
  text: {
    fontFamily: "Sansation-Regular",
  },
  noProductsText: {
    fontSize: 18,
    textAlign: "center",
    fontFamily: "Sansation-Bold",
  },
  noProductsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
