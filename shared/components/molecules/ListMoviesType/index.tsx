import { View, FlatList, Image, Pressable } from "react-native";
import React from "react";
import { Typography } from "../../atoms";
import mock_data from "@/__MOCKS__/movies.json";
import CardWrapper from "../../atoms/CardWrapper";
import { Link } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { MoviesAPIResponse } from "@/shared/interfaces/movies.interface";
import { Fetch } from "@/shared/api/config";
import { ListMoviesLoader } from "../Loaders";

type MoviesType = "now_playing" | "popular" | "top_rated" | "upcoming";

interface Props {
  type: MoviesType;
}

const resolvedTitleByType = (type: MoviesType) => {
  switch (type) {
    case "now_playing":
      return "Now Playing";
    case "popular":
      return "Popular";
    case "top_rated":
      return "Top rated";
    case "upcoming":
      return "Up coming";
  }
};

export default function ListMoviesType({ type }: Props) {
  const { data, isLoading, error } = useQuery<MoviesAPIResponse>({
    queryKey: [`movie/${type}`],
    queryFn: async () => await Fetch(`movie/${type}`),
  });
  const title = resolvedTitleByType(type);

  if (isLoading) return <ListMoviesLoader />;

  return (
    <View>
      <View style={{ paddingHorizontal: 16 }}>
        <Typography type="subtitle" style={{ textTransform: "uppercase" }}>
          {title}
        </Typography>
      </View>
      <FlatList
        data={data?.results}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ gap: 15, padding: 16 }}
        renderItem={({ item }) => {
          return (
            <Link
              asChild
              href={{
                pathname: "/details/[id]",
                params: {
                  id: item.id,
                },
              }}
            >
              <Pressable>
                <CardWrapper>
                  <Image
                    source={{
                      uri: `${process.env.EXPO_PUBLIC_IMAGE_URL}${item.poster_path}`,
                    }}
                    style={{
                      width: 110,
                      height: 150,
                      borderRadius: 5,
                      resizeMode: "cover",
                    }}
                  />
                </CardWrapper>
              </Pressable>
            </Link>
          );
        }}
      />
    </View>
  );
}
