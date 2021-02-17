import React from "react";
import { Alert, StyleSheet } from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import AppActivityIndicator from "../components/AppActivityIndicator";
import Button from "./../components/AppButton";
import Title from "../components/Title";
import TextInput from "./../components/TextInput";
import Screen from "./../components/Screen";
import Picker from "./../components/Picker";

import colors from "../utility/colors";
import Routes from "../navigation/routes";

import { TripClubContext } from "../context";
import { storeAsyncStorageData } from "../utility/storage";
import { updateUser } from "./../api/userController";

const pickerItems = [
  { label: "נקבה", value: "f" },
  { label: "זכר", value: "m" },
];

const EditUserDetailsScreen = ({ navigation }) => {
  const { setUser: setContextUser, user: contextUser } = React.useContext(
    TripClubContext
  );

  const [user, setUser] = React.useState(contextUser);
  const [pickerSelected, setPickerSelected] = React.useState(
    pickerItems.find((i) => i.value === user.gender)
  );
  const [isLoading, setIsLoading] = React.useState(false);
  const [passwordVisable, setPasswordVisable] = React.useState(true);

  const _handleUpdateUser = async () => {
    if (
      user.password.trim() === "" ||
      user.firstName.trim() === "" ||
      user.lastName.trim() === ""
    ) {
      Alert.alert("✋", "שם  או סיסמא ריקים");
      return;
    }
    setIsLoading(true);
    const returnedUser = await updateUser(user);
    if (returnedUser !== null) {
      setContextUser(returnedUser);
      storeAsyncStorageData("user", returnedUser);
      Alert.alert("👌", "העדכון בוצע בהצלחה");
      navigation.navigate(Routes.POSTS_FEED);
    }
    if (returnedUser === null) Alert.alert("😓", "סליחה אבל הייתה בעיה בתקשורת");
    setIsLoading(false);
  };

  return (
    <>
      <Screen style={styles.container}>
        <KeyboardAwareScrollView contentContainerStyle={styles.keyboardAware}>
          <Title>ערוך פרטי משתמש</Title>
          <TextInput
            value={user.firstName}
            placeholder="שם פרטי*"
            onChangeText={(txt) =>
              setUser({ ...user, firstName: txt, userName: txt + " " + user.lastName })
            }
          />
          <TextInput
            value={user.lastName}
            placeholder="שם משפחה*"
            onChangeText={(txt) =>
              setUser({ ...user, lastName: txt, userName: user.firstName + " " + txt })
            }
          />
          <TextInput
            value={user.password}
            secureTextEntry={passwordVisable}
            onIconPress={() => setPasswordVisable(!passwordVisable)}
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
            multiline={true}
            numberOfLines={5}
            placeholder="כמה מילים עלייך..."
            style={styles.postInput}
            iconStyle={styles.iconStyle}
            maxLength={150}
            icon="thought-bubble-outline"
            onChangeText={(txt) => setUser({ ...user, discription: txt })}
          />
          <Button title="עדכן פרטי משתמש" onPress={_handleUpdateUser} color="dark" />
        </KeyboardAwareScrollView>
      </Screen>
      <AppActivityIndicator visible={isLoading} />
    </>
  );
};

export default EditUserDetailsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.cream,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  keyboardAware: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
