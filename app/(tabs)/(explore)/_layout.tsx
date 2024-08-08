import React from "react";
import { Stack } from "expo-router";
import { useThemeColor } from "@/shared/hooks";

export default function HomeLayout() {
  const backgroundColor = useThemeColor({}, "background");
  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor,
        },
      }}
    >
      <Stack.Screen name="explore" options={{ headerShown: false }} />
      <Stack.Screen name="explore/[id]" options={{ headerShown: false }} />
    </Stack>
  );
}
