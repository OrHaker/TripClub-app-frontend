import React from "react";
import { StyleSheet, Image, TouchableOpacity, Dimensions } from "react-native";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import * as ImagePicker from "expo-image-picker";

import Button from "./../components/AppButton";
import Text from "./../components/AppText";

import { TripClubContext } from "../context";

import { profileImageUpload } from "./../api/imagesController";
import { removeAsyncStorageData } from "./../utility/storage";
import colors from "../utility/colors";
import { updateUser } from "./../api/userController";

const windowWidth = Dimensions.get("window").width;

const DrawerContent = (props) => {
  const { user, setUser: setContextUser } = React.useContext(TripClubContext);
  const [greet, setGreeting] = React.useState("שלום");

  const _handleSetGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour <= 12) setGreeting("בוקר טוב");
    else if (hour >= 13 && hour <= 16) setGreeting("צהריים טובים");
    else if (hour >= 17 && hour <= 18) setGreeting("אחרי צהריים טובים");
    else if (hour >= 19 && hour < 24) setGreeting("ערב טוב");
    else setGreeting("לילה טוב");
  };

  const renderUserImage = () =>
    user?.userImage
      ? { uri: `${user?.userImage}?date=${Date.now()}` }
      : require("../assets/drawer-default-user-image.png");

  const _handleLogOut = () => {
    removeAsyncStorageData("user");
    setContextUser(null);
  };

  const _handleUploadImage = async () => {
    if (!user) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [5, 5],
      quality: 0.5,
      base64: true,
    });
    if (!result.cancelled) {
      const url = await profileImageUpload(result.base64, `profile${user.userId}`);

      setContextUser({ ...user, userImage: url });
      const updatedUser = await updateUser({ ...user, userImage: url });
      console.log("updatedUser", updatedUser);
    }
  };

  React.useEffect(() => {
    _handleSetGreeting();
  }, []);

  return (
    <DrawerContentScrollView {...props}>
      <Text>{`${greet} , ${user ? user.userName : "אורח"}`}</Text>
      <TouchableOpacity onPress={_handleUploadImage}>
        <Image
          source={renderUserImage()}
          style={user?.userImage ? styles.profileImage : styles.emptyProfileImage}
        />
      </TouchableOpacity>
      <DrawerItemList {...props} />
      {user !== null && (
        <Button title="התנתק" onPress={_handleLogOut} width="98%" color="secondary" />
      )}
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  profileImage: {
    marginTop: 20,
    width: windowWidth / 4,
    height: windowWidth / 4,
    borderRadius: 50,
    borderColor: "rgba(0, 0, 0, 0.1)",
    borderWidth: 4,
    alignSelf: "center",
  },
  emptyProfileImage: {
    marginTop: 20,
    width: windowWidth / 4,
    height: windowWidth / 4,
    alignSelf: "center",
  },
  drawerItem: {
    color: colors.dark,
    fontWeight: "bold",
  },
});

export default DrawerContent;
