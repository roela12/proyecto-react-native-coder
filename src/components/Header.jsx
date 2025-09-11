import { StyleSheet, Text, View, Pressable } from "react-native";
import { colors } from "../theme/colors";
import { useNavigation } from "@react-navigation/native";

const Header = ({ subtitle }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.navigate("Categorías")}>
        <Text style={styles.title}>Azamon</Text>
      </Pressable>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    height: 140,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    color: colors.secondary,
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    color: colors.secondary,
  },
});
