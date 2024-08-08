import { View, Text, Dimensions, ActivityIndicator } from "react-native";
import React from "react";
import { Skeleton } from "@/shared/components/atoms";
const { width } = Dimensions.get("screen");

const CARD_WIDTH = width * 0.7;
const CARD_HEIGHT = CARD_WIDTH * 1.8;
export function DetailsLoader() {
  return (
    <View>
      <View
        style={{
          height: CARD_HEIGHT,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator />
      </View>
      <View style={{ paddingHorizontal: 20, paddingVertical: 30, gap: 10 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Skeleton width={250} height={30} />
          <Skeleton width={80} height={30} />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Skeleton width={100} height={20} />
          <Skeleton width={120} height={20} />
        </View>
        <Skeleton width={"100%"} height={200} />
      </View>
    </View>
  );
}
