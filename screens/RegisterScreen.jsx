import React from "react";
import { Alert, StyleSheet, View } from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Swiper from "react-native-swiper";
import LottieView from "lottie-react-native";

import AppActivityIndicator from "../components/AppActivityIndicator";
import Button from "./../components/AppButton";
import Title from "../components/Title";
import TextInput from "./../components/TextInput";
import Text from "../components/AppText";
import Screen from "./../components/Screen";
import Picker from "./../components/Picker";

import Routes from "../navigation/routes";
import colors from "../utility/colors";

import { insertNewUser } from "../api/userController";
import { TripClubContext } from "../context";
import { storeAsyncStorageData } from "../utility/storage";

const pickerItems = [
  { label: "נקבה", value: "f" },
  { label: "זכר", value: "m" },
];

const RegisterScreen = ({ navigation }) => {
  const { setUser: setContextUser } = React.useContext(TripClubContext);

  const [user, setUser] = React.useState({
    userName: "",
    password: "",
    email: "",
    firstName: "",
    lastName: "",
    userImage: "",
    gender: pickerItems[0].value,
    discription: "",
    userType: 2,
  });
  const [pickerSelected, setPickerSelected] = React.useState(pickerItems[0]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [passwordVisable, setPasswordVisable] = React.useState(true);
  const [isKeyboardOpen, setIsKeyboardOpen] = React.useState(false);
  const [editable, setEditable] = React.useState(false);

  const _handleRegister = async () => {
    if (
      user.password.trim() === "" ||
      user.email.trim() === "" ||
      user.firstName.trim() === "" ||
      user.lastName.trim() === ""
    ) {
      Alert.alert("✋", "שם דוא'ל או סיסמא ריקים");
      return;
    }
    setIsLoading(true);
    const returnedUser = await insertNewUser(user);
    setIsLoading(false);

    if (returnedUser === "Conflict") Alert.alert("✋", "המייל נמצא כבר בשימוש");
    else if (returnedUser === null) Alert.alert("😓", "סליחה אבל הייתה בעיה בתקשורת");
    else if (returnedUser !== undefined) {
      setContextUser(returnedUser);
      storeAsyncStorageData("user", returnedUser);
    }
  };

  const _handleMoveToLogin = () => {
    navigation.navigate(Routes.LOGIN);
  };

  React.useEffect(() => {
    //this setTimeout solve xiaomi problem to write an email on text input in react native
    setTimeout(() => {
      setEditable(true);
    }, 100);
  }, []);

  return (
    <>
      <Swiper
        showsPagination={!isKeyboardOpen ? true : false}
        removeClippedSubviews={false}
        loop={false}
        paginationStyle={{ bottom: 10 }}
        showsHorizontalScrollIndicator
        index={2}
        dot={<View style={styles.dot} />}
        activeDot={<View style={styles.activeDot} />}
      >
        <Screen
          style={[styles.container, { backgroundColor: "#BDD8F6" }]}
          statusBarBG="dark"
        >
          <View style={styles.animationContainer}>
            <Title>הרשמה</Title>
            <LottieView
              autoPlay
              loop
              source={require("../assets/animations/climber-edit.json")}
              style={styles.lottie}
            />
          </View>
          <Text>אפליקציה למציאת שותפ/ה </Text>
          <Text>לטיול גדול והמלצות ליעדים נבחרים</Text>
        </Screen>
        <Screen style={styles.container} statusBarBG="dark">
          <View style={styles.animationContainer}>
            <LottieView
              autoPlay
              loop
              source={require("../assets/animations/passport.json")}
              style={styles.lottie}
            />
          </View>
          <Text style={{ marginHorizontal: 30 }}>
            תרבות הטיולים בשנים האחרונות הולכת וגדלה חלק משמעותי נוסף הוא לעשות את הטיול
            הגדול התכנון וחיבור עם השותף הנכון הוא חלק חשוב מאוד. יש לא מעט אנשים שחולמים
            לצאת לטיול שכזה - אנחנו שמים לנו למטרה לעזור לכם כאן!
          </Text>
        </Screen>
        <Screen style={styles.container} statusBarBG="dark">
          <KeyboardAwareScrollView contentContainerStyle={styles.keyboardAware}>
            <TextInput
              value={user.firstName}
              onFocus={() => setIsKeyboardOpen(true)}
              onEndEditing={() => setIsKeyboardOpen(false)}
              placeholder="שם פרטי*"
              onChangeText={(txt) =>
                setUser({ ...user, firstName: txt, userName: txt + " " + user.lastName })
              }
            />
            <TextInput
              value={user.lastName}
              onFocus={() => setIsKeyboardOpen(true)}
              onEndEditing={() => setIsKeyboardOpen(false)}
              placeholder="שם משפחה*"
              onChangeText={(txt) =>
                setUser({ ...user, lastName: txt, userName: user.firstName + " " + txt })
              }
            />
            <TextInput
              value={user.email}
              editable={editable}
              onFocus={() => setIsKeyboardOpen(true)}
              onEndEditing={() => setIsKeyboardOpen(false)}
              icon="email"
              placeholder="דואל*"
              onChangeText={(txt) => setUser({ ...user, email: txt })}
            />
            <TextInput
              value={user.password}
              secureTextEntry={passwordVisable}
              onIconPress={() => setPasswordVisable(!passwordVisable)}
              onFocus={() => setIsKeyboardOpen(true)}
              onEndEditing={() => setIsKeyboardOpen(false)}
              icon={!passwordVisable ? "eye-off-outline" : "eye-outline"}
              placeholder="סיסמא*"
              onChangeText={(txt) => setUser({ ...user, password: txt })}
            />
            <Picker
              icon="human-male-female"
              items={pickerItems}
              selectedItem={pickerSelected}
              onSelectItem={(item) => {
                setPickerSelected(item);
                setUser({ ...user, gender: item.value });
              }}
            />
            <TextInput
              value={user.discription}
              onFocus={() => setIsKeyboardOpen(true)}
              onEndEditing={() => setIsKeyboardOpen(false)}
              multiline={true}
              numberOfLines={5}
              placeholder="כמה מילים עלייך..."
              style={styles.postInput}
              iconStyle={styles.iconStyle}
              maxLength={150}
              icon="thought-bubble-outline"
              onChangeText={(txt) => setUser({ ...user, discription: txt })}
            />
            <Button title="הירשם" onPress={_handleRegister} color="dark" />
            <Text style={{ fontSize: 13 }}>כבר רשום? לחץ למטה למעבר להתחברות</Text>
            <Button title="התחבר" onPress={_handleMoveToLogin} width="50%" />
          </KeyboardAwareScrollView>
        </Screen>
      </Swiper>
      <AppActivityIndicator visible={isLoading} />
    </>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  activeDot: {
    backgroundColor: colors.primary,
    width: 22,
    height: 12,
    borderRadius: 6,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  animationContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 0.5,
  },
  container: {
    backgroundColor: colors.cream,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  dot: {
    backgroundColor: "rgba(0,0,0,.2)",
    width: 12,
    height: 12,
    borderRadius: 6,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  keyboardAware: {
    paddingTop: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  lottie: {
    width: 300,
    height: 300,
  },
  postInput: {
    textAlignVertical: "top",
    paddingTop: 15,
    height: 150,
  },
  iconStyle: {
    marginBottom: 100,
  },
});
