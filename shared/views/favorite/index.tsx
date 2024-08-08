import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { CardListMovie, Typography } from "@/shared/components";
import { useFavoriteStore } from "@/shared/stores";
import { useThemeColor } from "@/shared/hooks";
import SwipeCard from "@/shared/components/molecules/SwipeCard";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export function FavoritesView() {
  const backgroundColor = useThemeColor({}, "background");
  const { favorites } = useFavoriteStore();
  return (
    <GestureHandlerRootView>
      <SafeAreaView style={[STYLES.main, { backgroundColor }]}>
        <View style={{ paddingHorizontal: 16 }}>
          <Typography type="title">My List</Typography>
        </View>
        <ScrollView
          style={{ marginTop: 16 }}
          contentContainerStyle={{
            gap: 15,
            alignItems: "center",
          }}
        >
          {favorites.map((movie) => (
            <SwipeCard key={movie.id} id={Number(movie.id)}>
              <CardListMovie
                poster_path={`${process.env.EXPO_PUBLIC_IMAGE_URL}${movie.poster_path}`}
                title={movie.title}
                overview={movie.overview}
              />
            </SwipeCard>
          ))}
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const STYLES = StyleSheet.create({
  main: {
    flex: 1,
  },
});
