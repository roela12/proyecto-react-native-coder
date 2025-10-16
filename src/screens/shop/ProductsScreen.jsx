import { StyleSheet, Text, FlatList, Image, Pressable } from "react-native";
import FlatCard from "../../components/FlatCard";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Search from "../../components/Search";
import { colors } from "../../theme/colors";
import { useGetProductsByCategoryQuery } from "../../services/shopApi";

const ProductsScreen = ({ navigation }) => {
  const [filteredProducts, setfilteredProducts] = useState([]);
  const [keyword, setKeyword] = useState("");

  const category = useSelector((state) => state.shopReducer.selectedCategory);
  const {
    data: filteredProductsByCategory,
    error,
    isLoading,
  } = useGetProductsByCategoryQuery(category.toLowerCase());

  useEffect(() => {
    keyword
      ? setfilteredProducts(
          filteredProductsByCategory.filter((product) =>
            product.title.toLowerCase().includes(keyword.toLowerCase())
          )
        )
      : setfilteredProducts(filteredProductsByCategory);
  }, [keyword, filteredProductsByCategory]);

  const renderProductItem = ({ item }) => {
    return isLoading ? (
      <Text>Cargando...</Text>
    ) : error ? (
      <Text>Error: {error.message}</Text>
    ) : (
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
