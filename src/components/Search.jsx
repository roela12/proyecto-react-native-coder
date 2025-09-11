import { StyleSheet, View, TextInput } from "react-native";
import { colors } from "../theme/colors";

const Search = ({ setKeyword, keyword }) => {
  return (
    <View style={styles.searchContainer}>
      <TextInput
        onChangeText={(text) => setKeyword(text)}
        placeholder="Buscar producto"
        style={styles.textInput}
        valuye={keyword}
      />
    </View>
  );
};

export default Search;

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
});
