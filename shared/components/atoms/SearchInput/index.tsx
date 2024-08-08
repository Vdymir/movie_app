import {
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  type TextInputProps,
} from "react-native";
import React from "react";
import { useThemeColor } from "@/shared/hooks";
import { Icon } from "../Icon";
const { width } = Dimensions.get("screen");

const SIZE = width * 0.85;

interface Props extends TextInputProps {}

export function SearchInput({ style, ...rest }: Props) {
  const backgroundColor = useThemeColor({}, "cardsBackground");
  const textColor = useThemeColor({}, "text");
  const iconColor = useThemeColor(
    {
      dark: "#FFF",
      light: "#000",
    },
    "icon"
  );

  return (
    <View style={[styles.input_wrapper, { backgroundColor }]}>
      <TextInput
        style={[styles.input, { color: textColor }]}
        placeholder="Search..."
        placeholderTextColor="gray"
        {...rest}
      />
      <Icon name="search1" color={iconColor} />
    </View>
  );
}

const styles = StyleSheet.create({
  input_wrapper: {
    width: SIZE,
    height: 50,
    borderRadius: 22,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.35,
    shadowRadius: 3.84,
    elevation: 3,
  },
  input: {
    flex: 1,
    height: "100%",
    fontSize: 16,
    fontWeight: "500",
    letterSpacing: 0.2,
  },
});
