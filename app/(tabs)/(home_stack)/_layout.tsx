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
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="details/[id]" options={{ headerShown: false }} />
    </Stack>
  );
}
