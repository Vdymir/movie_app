import { View, Text } from "react-native";
import React from "react";
import { Skeleton } from "@/shared/components/atoms";

export function ListMoviesLoader() {
  return (
    <View style={{ padding: 16, gap: 16 }}>
      <Skeleton width={120} height={20} />
      <View style={{ flexDirection: "row", alignItems: "center", gap: 15 }}>
        {[1, 2, 3, 4, 5].map((item) => (
          <Skeleton width={110} height={150} radius={5} key={item} />
        ))}
      </View>
    </View>
  );
}
