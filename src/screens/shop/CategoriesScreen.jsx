import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import FlatCard from "../../components/FlatCard";
import {
  selectCategory,
  filterProductsByCategory,
} from "../../features/shop/shopSlice";

const CategoriesScreen = ({ navigation }) => {
  const categories = useSelector((state) => state.shopReducer.categories);
  const dispatch = useDispatch();

  const handleSelectCategory = (category) => {
    dispatch(selectCategory(category));
    dispatch(filterProductsByCategory());
    navigation.navigate("Productos");
  };

  const renderCategorieItem = ({ item }) => {
    return (
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
    <View>
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
