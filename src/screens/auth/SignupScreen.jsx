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
import { useSignupMutation } from "../../services/authApi";
import signupSchema from "../../validations/signupSchema";

const textInputWidth = Dimensions.get("window").width * 0.7;

const SignupScreen = ({ navigation, route }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const [triggerSignup, result] = useSignupMutation();
  const onsubmit = () => {
    try {
      signupSchema.validateSync(
        { email, password, confirmPassword },
        { abortEarly: false }
      );
      triggerSignup({ email, password, confirmPassword });
    } catch (err) {
      const validationErrors = {};
      err.inner.forEach((error) => {
        validationErrors[error.path] = error.message;
      });
      setErrors(validationErrors);
    }
  };

  useEffect(() => {
    if (result.status === "fulfilled") {
      navigation.navigate("Login");
    }
  }, [result]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Azamon</Text>
      <Text style={styles.subTitle}>Registrate</Text>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={(text) => setEmail(text)}
          placeholderTextColor={colors.white}
          placeholder="Correo electrónico"
          style={styles.textInput}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
        <TextInput
          onChangeText={(text) => setPassword(text)}
          placeholderTextColor={colors.white}
          placeholder="Contraseña"
          style={styles.textInput}
          secureTextEntry
        />
        {errors.password && (
          <Text style={styles.errorText}>{errors.password}</Text>
        )}
        <TextInput
          onChangeText={(text) => setConfirmPassword(text)}
          placeholderTextColor={colors.white}
          placeholder="Confirmar contraseña"
          style={styles.textInput}
          secureTextEntry
        />
        {errors.confirmPassword && (
          <Text style={styles.errorText}>{errors.confirmPassword}</Text>
        )}
      </View>
      <Pressable
        style={({ pressed }) => [styles.btn, pressed && styles.btnPressed]}
        onPress={onsubmit}
      >
        <Text style={styles.btnText}>Registrarse</Text>
      </Pressable>
    </View>
  );
};

export default SignupScreen;

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
