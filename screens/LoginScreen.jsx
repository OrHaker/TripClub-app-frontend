import React from "react";
import { StyleSheet, Animated } from "react-native";
import { AppLoading } from "expo";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import AppActivityIndicator from "../components/AppActivityIndicator";
import Button from "./../components/AppButton";
import ErrorMessage from "../components/ErrorMessage";
import Screen from "./../components/Screen";
import TextInput from "./../components/TextInput";
import Text from "../components/AppText";
import Title from "../components/Title";
import ModalForgotPassword from "./../components/ModalForgotPassword";

import colors from "../utility/colors";
import Routes from "../navigation/routes";

import { getUserByEmailAndPassword } from "./../api/userController";
import { TripClubContext } from "../context";

import { retrieveAsyncStorageData, storeAsyncStorageData } from "../utility/storage";
import { isEmail } from "../utility/validation";

const LoginScreen = ({ navigation }) => {
  const { setUser } = React.useContext(TripClubContext);

  const [isReady, setIsReady] = React.useState(false);
  const [passwordVisable, setPasswordVisable] = React.useState(true);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState({ visible: false, message: "" });
  const [isLoading, setIsLoading] = React.useState(false);
  const [resetPass, setResetPass] = React.useState(false);
  const [editable, setEditable] = React.useState(false);

  const _getUserData = async () => {
    setEditable(true);

    const user = await retrieveAsyncStorageData("user");
    if (user !== undefined && user !== null) setUser(user);
  };

  const logoAnime = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.spring(logoAnime, {
      toValue: 1,
      tension: 10,
      friction: 2,
      duration: 2500,
      useNativeDriver: false,
    }).start();
  }, []);

  const animatedStyle = {
    opacity: logoAnime,
    top: logoAnime.interpolate({
      inputRange: [0, 1],
      outputRange: [150, 0],
    }),
  };

  const _handelLogIn = async () => {
    setError({ visible: false, message: "" });
    if (email.trim() === "" || password.trim() === "") {
      setError({ visible: true, message: "אחד או יותר מהשדות ריקים ✋⚠️" });
      return;
    } else if (!isEmail(email)) {
      setError({ visible: true, message: "כתובת דוא'ל לא תקינה ✋⚠️" });
      return;
    } else if (email.length > 25 || password.length > 25) {
      setError({ visible: true, message: "אחד או יותר מהשדות ארוכים מידי ✋⚠️" });
      return;
    }
    setIsLoading(true);
    const user = await getUserByEmailAndPassword(email, password);
    setIsLoading(false);
    if (user !== null) {
      setUser(user);
      storeAsyncStorageData("user", user);
    } else setError({ visible: true, message: "דוא'ל או סיסמא שגויים ✋" });
  };

  const _handelMoveRegister = () => {
    navigation.navigate(Routes.REGISTER);
  };

  if (!isReady) {
    return <AppLoading startAsync={_getUserData} onFinish={() => setIsReady(true)} />;
  }
  return (
    <>
      <Screen style={styles.container} statusBarBG="secondary">
        <KeyboardAwareScrollView contentContainerStyle={styles.keyboardAware}>
          <Title>התחבר</Title>
          <Animated.Image
            style={[styles.logo, animatedStyle]}
            source={require("../assets/dog.png")}
          />
          <TextInput
            editable={editable}
            icon="email"
            placeholder='ד"ואל'
            onChangeText={(txt) => {
              setEmail(txt);
              setError({ visible: false, message: "" });
            }}
          />

          <TextInput
            value={password}
            secureTextEntry={passwordVisable}
            onIconPress={() => setPasswordVisable(!passwordVisable)}
            icon={!passwordVisable ? "eye-off-outline" : "eye-outline"}
            placeholder="סיסמא"
            onChangeText={(txt) => {
              setPassword(txt);
              setError({ visible: false, message: "" });
            }}
          />

          <ErrorMessage error={error.message} visible={error.visible} />
          <Button title="התחבר" onPress={_handelLogIn} color="secondary" />
          <Text>עוד לא רשום? לחץ למטה להרשמה</Text>
          <Button title="מעבר להרשמה" onPress={_handelMoveRegister} />
          <Button title="שכחתי סיסמא" onPress={() => setResetPass(true)} color="dark" />
        </KeyboardAwareScrollView>
      </Screen>
      <ModalForgotPassword visible={resetPass} setVisible={setResetPass} />
      <AppActivityIndicator visible={isLoading} />
    </>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.cream,
    flex: 1,
    alignItems: "center",
  },
  logo: {
    width: "70%",
    resizeMode: "stretch",
  },
  keyboardAware: {
    alignItems: "center",
    justifyContent: "center",
  },
});
