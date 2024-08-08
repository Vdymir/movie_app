import {
  View,
  Dimensions,
  Image,
  StyleSheet,
  ImageBackground,
} from "react-native";
import React from "react";
import { Movies } from "@/shared/interfaces/movies.interface";
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useThemeColor } from "@/shared/hooks";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import CardWrapper from "../../atoms/CardWrapper";
const { width } = Dimensions.get("screen");

interface Props {
  movie: Movies;
  translateX: SharedValue<number>;
  index: number;
}
const CARD_WIDTH = width * 0.7;
const CARD_HEIGHT = CARD_WIDTH * 1.4;

const AnimatedImageBackground =
  Animated.createAnimatedComponent(ImageBackground);

export function RenderItemAnimation({ movie, translateX, index }: Props) {
  const backgroundColor = useThemeColor({}, "background");
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

  const cStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      translateX.value,
      inputRange,
      [-100, 0, -100]
    );
    return {
      transform: [{ translateY }],
    };
  });
  const bgImgStyle = useAnimatedStyle(() => {
    const translateXImage = interpolate(translateX.value, inputRange, [
      0,
      0,
      width,
    ]);

    return {
      transform: [{ translateX: translateXImage }],
    };
  });

  return (
    <View style={{ width, alignItems: "center" }}>
      <AnimatedImageBackground
        source={{
          uri: `${process.env.EXPO_PUBLIC_IMAGE_URL}${movie.backdrop_path}`,
        }}
        style={[styles.background_image, bgImgStyle]}
      >
        <LinearGradient
          colors={["transparent", backgroundColor]}
          style={styles.linear_gradient}
        />
      </AnimatedImageBackground>
      <Animated.View style={[cStyle, styles.image_container]}>
        <Link
          href={{
            pathname: `/details/${movie.id}` as any,
          }}
        >
          <CardWrapper>
            <Image
              source={{
                uri: `${process.env.EXPO_PUBLIC_IMAGE_URL}${movie.poster_path}`,
              }}
              style={styles.image}
            />
          </CardWrapper>
        </Link>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  background_image: {
    width,
    height: CARD_HEIGHT,
  },
  linear_gradient: {
    position: "absolute",
    width,
    height: CARD_HEIGHT,
  },
  image_container: {
    position: "absolute",
    top: CARD_HEIGHT / 2,
  },
  image: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 5,
    objectFit: "cover",
  },
  title_container: {
    paddingHorizontal: 40,
    position: "absolute",
    top: CARD_HEIGHT * 1.6,
  },
});
