import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  Animated,
  type RegisteredStyle,
  type ViewStyle,
} from "react-native";

export type AnimateValue =
  | number
  | Animated.Value
  | "auto"
  | `${number}%`
  | Animated.AnimatedInterpolation<string | number>
  | Animated.WithAnimatedObject<Animated.AnimatedNode>
  | null
  | undefined;

interface SkeletonProps {
  width: AnimateValue;
  height?: AnimateValue;
  radius?: number;
  isCircle?: boolean;
  style?:
    | false
    | Animated.Value
    | Animated.AnimatedInterpolation<string | number>
    | RegisteredStyle<ViewStyle>
    | Animated.WithAnimatedObject<ViewStyle>
    | undefined;
}

export function Skeleton({
  height = 100,
  width = 100,
  isCircle = false,
  radius = 6,
  style,
}: SkeletonProps) {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.1,
          useNativeDriver: true,
          duration: 500,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          useNativeDriver: true,
          duration: 500,
        }),
      ])
    ).start();
    return () => {
      opacity.stopAnimation();
    };
  }, [opacity]);

  return (
    <Animated.View
      style={[
        styles.skeleton,
        {
          opacity,
          height,
          width,
          borderRadius: isCircle ? Number(width) / 2 : radius,
        },
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: "grey",
  },
});
