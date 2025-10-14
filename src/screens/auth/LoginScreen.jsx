import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Dimensions,
} from "react-native";
import { colors } from "../../theme/colors";
import { useEffect, useState } from "react";
import { useLoginMutation } from "../../services/authApi";
import { useDispatch } from "react-redux";
import { setUserEmail, setLocalId } from "../../features/user/userSlice";

const textInputWidth = Dimensions.get("window").width * 0.7;

const LoginScreen = ({ navigation, route }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [triggerLogin, result] = useLoginMutation();
  const dispatch = useDispatch();
  const onsubmit = () => {
    triggerLogin({ email, password });
  };

  useEffect(() => {
    if (result.status === "fulfilled") {
      dispatch(setUserEmail(result.data.email));
      dispatch(setLocalId(result.data.localId));
    }
  }, [result]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Azamon</Text>
      <Text style={styles.subTitle}>Inicia sesión</Text>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={(text) => setEmail(text)}
          placeholderTextColor={colors.white}
          placeholder="Correo electrónico"
          style={styles.textInput}
        />
        <TextInput
          onChangeText={(text) => setPassword(text)}
          placeholderTextColor={colors.white}
          placeholder="Contraseña"
          style={styles.textInput}
          secureTextEntry
        />
        {result.isError && (
          <Text style={styles.errorText}>correo o contraseña incorrectos</Text>
        )}
      </View>
      <View style={styles.footTextContainer}>
        <Text style={styles.whiteText}>¿No tienes una cuenta?</Text>
        <Pressable onPress={() => navigation.navigate("Signup")}>
          <Text
            style={{
              ...styles.whiteText,
              ...styles.underLineText,
            }}
          >
            Crea una
          </Text>
        </Pressable>
      </View>

      <Pressable
        style={({ pressed }) => [styles.btn, pressed && styles.btnPressed]}
        onPress={onsubmit}
      >
        <Text style={styles.btnText}>Iniciar sesión</Text>
      </Pressable>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
  },
  title: {
    color: colors.secondary,
    fontFamily: "Audiowide-Regular",
    fontSize: 80,
  },
  subTitle: {
    fontFamily: "Audiowide-Regular",
    fontSize: 18,
    color: colors.secondary,
    fontWeight: "700",
    letterSpacing: 3,
  },
  inputContainer: {
    gap: 16,
    margin: 16,
    marginTop: 48,
    alignItems: "center",
  },
  textInput: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: colors.darkGray,
    width: textInputWidth,
    color: colors.white,
    fontFamily: "Sansation-Bold",
    fontSize: 15,
  },
  footTextContainer: {
    flexDirection: "row",
    gap: 8,
    margin: 12,
  },
  whiteText: {
    color: colors.white,
    fontSize: 16,
    fontFamily: "Sansation-Bold",
  },
  underLineText: {
    textDecorationLine: "underline",
  },
  btn: {
    padding: 16,
    paddingHorizontal: 32,
    backgroundColor: colors.darkGray,
    borderRadius: 16,
    marginTop: 32,
  },
  btnPressed: {
    backgroundColor: colors.mediumGray,
  },
  btnText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "700",
    fontFamily: "Sansation-Bold",
  },
  errorText: {
    color: colors.red,
    fontSize: 14,
    textAlign: "center",
    fontFamily: "Sansation-Bold",
  },
});
