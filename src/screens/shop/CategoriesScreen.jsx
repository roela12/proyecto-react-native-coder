import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Dimensions,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import FlatCard from "../../components/FlatCard";
import {
  selectCategory,
  filterProductsByCategory,
} from "../../features/shop/shopSlice";
import { useGetCategoriesQuery } from "../../services/shopApi";

const usableHeight = Dimensions.get("window").height * 0.77;

const CategoriesScreen = ({ navigation }) => {
  const { data: categories, error, isLoading } = useGetCategoriesQuery();
  const dispatch = useDispatch();

  const handleSelectCategory = (category) => {
    dispatch(selectCategory(category));
    navigation.navigate("Productos");
  };

  const renderCategorieItem = ({ item }) => {
    return isLoading ? (
      <Text>Cargando...</Text>
    ) : error ? (
      <Text>Error: {error.message}</Text>
    ) : (
      <Pressable onPress={() => handleSelectCategory(item.title)}>
        <FlatCard>
          <Text style={styles.categoriesText}>{item.title}</Text>
          <Image
            source={{ uri: item.image }}
            width={100}
            height={100}
            resizeMode="contain"
          />
        </FlatCard>
      </Pressable>
    );
  };

  return (
    <View style={{ height: usableHeight }}>
      <FlatList
        data={categories}
        renderItem={renderCategorieItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default CategoriesScreen;

const styles = StyleSheet.create({
  categoriesText: {
    fontFamily: "Sansation-Regular",
  },
});
