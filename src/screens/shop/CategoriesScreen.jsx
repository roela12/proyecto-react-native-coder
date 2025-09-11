import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
} from "react-native";
import categories from "../../data/categories.json";
import FlatCard from "../../components/FlatCard";

const CategoriesScreen = ({ navigation }) => {
  const renderCategorieItem = ({ item }) => {
    return (
      <Pressable
        onPress={() =>
          navigation.navigate("Productos", { category: item.title })
        }
      >
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
