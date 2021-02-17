import React from "react";
import { StyleSheet, Alert, Modal } from "react-native";
import TextInput from "./TextInput";
import Screen from "./Screen";
import Button from "./AppButton";
import { isEmail } from "../utility/validation";
import colors from "../utility/colors";
import Text from "./AppText";
import { passwordResetRequest } from "./../api/systemToolsController";
import AppActivityIndicator from "./AppActivityIndicator";

const ModalForgotPassword = ({ visible, setVisible, navigation }) => {
  const [email, setEmail] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const _handelReset = async () => {
    if (!isEmail(email)) {
      Alert.alert("⚠️שגיאה", "כתובת דוא'ל לא תקינה");
      return;
    }
    setIsLoading(true);
    const res = await passwordResetRequest(email);
    if (res === "Email not found on system")
      Alert.alert("⚠️שגיאה", " המייל לא קיים אצלנו במערכת כלל");
    else if (res !== null)
      Alert.alert("נשלח מייל איפוס סיסמא", "אנא בדוק את תיבת האימייל שלך");

    setIsLoading(false);
  };

  return (
    <Modal visible={visible}>
      <Screen style={styles.container}>
        <Text style={styles.text}>שלחו לי מייל איפוס סיסמא</Text>
        <TextInput
          value={email}
          textContentType="emailAddress"
          icon="mail"
          onChangeText={(txt) => setEmail(txt)}
          placeholder="דו'אל"
        />
        <Button title="שלח לי מייל איפוס סיסמא" onPress={_handelReset} />
        <Button
          title="חזור להתחברות"
          onPress={() => setVisible(false)}
          color="secondary"
        />
      </Screen>
      <AppActivityIndicator visible={isLoading} />
    </Modal>
  );
};

export default ModalForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.cream,
  },
  text: { marginVertical: 80 },
});
