import { DefaultTheme } from "@react-navigation/native";
import colors from "../utility/colors";

export default {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    text: colors.black,
  },
};
