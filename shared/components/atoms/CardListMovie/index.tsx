import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import React from "react";
import { useThemeColor } from "@/shared/hooks";
import { truncateString } from "@/shared/helpers/string";
import { Typography } from "../Typography";

const { width } = Dimensions.get("screen");

const SIZE = width * 0.9;

interface Props {
  poster_path: string;
  title: string;
  overview: string;
}

export function CardListMovie({ poster_path, overview, title }: Props) {
  const backgroundColor = useThemeColor({}, "cardsBackground");
  return (
    <View style={[styles.main, { backgroundColor }]}>
      <Image
        source={{
          uri: poster_path,
        }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={{ width: 250 }}>
        <Typography>{title}</Typography>
        <Typography style={styles.overview}>
          {truncateString(overview, 100)}
        </Typography>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flexDirection: "row",
    width: SIZE,
    height: 120,
    borderRadius: 5,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    gap: 15,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 2,
  },
  overview: {
    opacity: 0.8,
    fontSize: 12,
    lineHeight: 14,
  },
});
