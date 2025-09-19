import { StyleSheet, Text, FlatList, Image, Pressable } from "react-native";
import FlatCard from "../../components/FlatCard";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Search from "../../components/Search";
import { colors } from "../../theme/colors";

const ProductsScreen = ({ navigation }) => {
  const [filteredProducts, setfilteredProducts] = useState([]);
  const [keyword, setKeyword] = useState("");

  const filteredProductsByCategory = useSelector(
    (state) => state.shopReducer.filteredProductsByCategory
  );

  useEffect(() => {
    keyword
      ? setfilteredProducts(
          filteredProductsByCategory.filter((product) =>
            product.title.toLowerCase().includes(keyword.toLowerCase())
          )
        )
      : setfilteredProducts(filteredProductsByCategory);
  }, [keyword]);

  const renderProductItem = ({ item }) => {
    return (
      <Pressable
        onPress={() => navigation.navigate("Producto", { productId: item.id })}
      >
        <FlatCard>
          <Text style={styles.productsText}>{item.title}</Text>
          <Image
            source={{ uri: item.mainImage }}
            width={100}
            height={100}
            resizeMode="contain"
          />
        </FlatCard>
      </Pressable>
    );
  };

  return (
    <>
      <Search setKeyword={setKeyword} keyword={keyword} />
      <FlatList
        data={filteredProducts}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id}
      />
    </>
  );
};

export default ProductsScreen;

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
  textInput: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 16,
    width: "90%",
    paddingLeft: 8,
  },
  productsText: {
    fontFamily: "Sansation-Regular",
  },
});
