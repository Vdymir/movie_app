import { StyleSheet } from "react-native";
import React from "react";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { useFavoriteStore } from "@/shared/stores";

interface Props {
  children: React.ReactElement;
  id: number;
}

export default function SwipeCard({ children, id }: Props) {
  const { removeToFavorite } = useFavoriteStore();
  const translateX = useSharedValue(0);
  const prevTranslateX = useSharedValue(0);
  const opacity = useSharedValue(1);
  const height = useSharedValue(120);

  const pan = Gesture.Pan()
    .onStart(() => {
      prevTranslateX.value = translateX.value;
    })
    .onUpdate(({ translationX }) => {
      if (prevTranslateX.value === 0) {
        if (Math.abs(translationX) >= 150) return;
        if (translationX < 0) {
          translateX.value = translationX + prevTranslateX.value;
        }
      }
    })
    .onEnd(() => {
      if (Math.abs(translateX.value) > 140) {
        opacity.value = withTiming(0, { duration: 250 });
        height.value = withDelay(250, withTiming(0, { duration: 500 }));
        setTimeout(() => {
          removeToFavorite(id);
        }, 750);
        return;
      }

      translateX.value = withSpring(0);
    })
    .runOnJS(true);

  const vIconStyle = useAnimatedStyle(() => {
    const opacity = interpolate(translateX.value, [0, -145], [-2, 1]);

    return {
      opacity,
    };
  }, []);

  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={[styles.center, { opacity, height }]}>
        <Animated.View style={{ transform: [{ translateX }] }}>
          {children}
        </Animated.View>
        <Animated.View style={[styles.icon, vIconStyle]}>
          <MaterialIcons name="delete-sweep" size={26} color="#E4003A" />
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  center: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    position: "absolute",
    right: 0,
    padding: 10,
    zIndex: -1,
  },
});
