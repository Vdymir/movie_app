import { View, type StyleProp, type ViewStyle, StyleSheet } from "react-native";
import React from "react";
import { useThemeColor } from "@/shared/hooks";

interface Props {
  children: React.ReactElement;
  style?: StyleProp<ViewStyle>;
}

export default function CardWrapper({ children, style }: Props) {
  const backgroundColor = useThemeColor({}, "background");
  return (
    <View style={[styles.main, { backgroundColor }, style]}>{children}</View>
  );
}

const styles = StyleSheet.create({
  main: {
    padding: 5,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
