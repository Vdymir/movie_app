import React from "react";
import { useLocalSearchParams } from "expo-router";
import { DetailsView } from "@/shared/views";
import { DetailsLoader, Typography } from "@/shared/components";
import { useQuery } from "@tanstack/react-query";
import { MoviesDetails } from "@/shared/interfaces/movie_details.interface";
import { Fetch } from "@/shared/api/config";

export default function DetailsScreen() {
  const params = useLocalSearchParams();
  const { id } = params;
  const { data, isLoading } = useQuery<MoviesDetails>({
    queryKey: [`movies-${id}`],
    queryFn: async () => await Fetch(`movie/${id}`),
  });

  if (isLoading) return <DetailsLoader />;

  return <DetailsView details={data!} />;
}
