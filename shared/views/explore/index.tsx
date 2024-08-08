import { useThemeColor } from "@/shared/hooks";
import { LinearGradient } from "expo-linear-gradient";
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
} from "react-native";
import movies from "@/__MOCKS__/movies.json";
import { Link } from "expo-router";
import { STYLES } from "./styles";
import { CardListMovie, SearchInput } from "@/shared/components";
import { useMutation } from "@tanstack/react-query";
import { Fetch } from "@/shared/api/config";
import { useState } from "react";
import { MoviesAPIResponse } from "@/shared/interfaces/movies.interface";

const MOVIE = movies.results[0];
export function ExploreView() {
  const [search, setSearch] = useState("");
  const { data, mutate, isPending } = useMutation<MoviesAPIResponse>({
    mutationKey: [`movie-search`],
    mutationFn: async () =>
      await Fetch(`search/movie?query=${search}&ie&language=en-US`),
  });
  const backgroundColor = useThemeColor({}, "background");
  return (
    <SafeAreaView style={[STYLES.main, { backgroundColor }]}>
      <View>
        <View style={STYLES.search}>
          <SearchInput
            onChangeText={setSearch}
            onSubmitEditing={() => {
              mutate();
            }}
            returnKeyType="done"
          />
        </View>
        <ScrollView
          style={{ paddingTop: 10 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={STYLES.scroll_view_content}
        >
          {isPending && <ActivityIndicator />}
          {data?.results.map((movie) => (
            <Link
              asChild
              key={movie.id}
              href={{
                pathname: "/explore/[id]",
                params: {
                  id: movie.id,
                },
              }}
            >
              <Pressable>
                <CardListMovie
                  poster_path={`${process.env.EXPO_PUBLIC_IMAGE_URL}${movie.poster_path}`}
                  title={movie.title}
                  overview={movie.overview}
                />
              </Pressable>
            </Link>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
