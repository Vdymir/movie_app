import { Dimensions, StyleSheet } from "react-native";
const { width } = Dimensions.get("screen");

const CARD_WIDTH = width * 0.7;
const CARD_HEIGHT = CARD_WIDTH * 1.8;
export const STYLES = StyleSheet.create({
  pressable_go_back: {
    top: 45,
    left: 25,
    position: "absolute",
    zIndex: 2,
  },
  pressable_like: {
    top: 45,
    right: 25,
    position: "absolute",
    zIndex: 2,
  },
  blur: {
    overflow: "hidden",
    borderRadius: 20,
    padding: 15,
  },
  gradient: {
    position: "absolute",
    zIndex: 2,
    bottom: 0,
    width,
    height: width,
  },
  image: {
    width,
    height: CARD_HEIGHT,
    zIndex: 1,
    resizeMode: "cover",
  },
  info_container: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    gap: 10,
  },
  title_container: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  star_container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  text_gender_and_date: {
    opacity: 0.7,
  },
  heart: {
    width: 200,
    height: 200,
    position: "absolute",
    zIndex: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 4,
      height: 8,
    },
    shadowOpacity: 0.45,
    shadowRadius: 3.84,
  },
});
