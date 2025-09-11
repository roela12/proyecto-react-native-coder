import { StyleSheet, Text, FlatList, Image, Pressable } from "react-native";
import FlatCard from "../../components/FlatCard";
import products from "../../data/products.json";
import { useEffect, useState } from "react";
import Search from "../../components/Search";
import { colors } from "../../theme/colors";

const ProductsScreen = ({ route, navigation }) => {
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [keyword, setKeyword] = useState("");

  const { category } = route.params;

  useEffect(() => {
    const productsFilteredByCategory = products.filter(
      (product) => product.category.toLowerCase() == category.toLowerCase()
    );
    keyword
      ? setProductsFiltered(
          productsFilteredByCategory.filter((product) =>
            product.title.toLowerCase().includes(keyword.toLowerCase())
          )
        )
      : setProductsFiltered(productsFilteredByCategory);
  }, [keyword]);

  const renderProductItem = ({ item }) => {
    return (
      <Pressable onPress={() => navigation.navigate("Producto")}>
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
        data={productsFiltered}
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
