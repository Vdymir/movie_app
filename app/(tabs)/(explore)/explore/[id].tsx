import React from "react";
import { useLocalSearchParams } from "expo-router";
import { DetailsView } from "@/shared/views";
import { DetailsLoader } from "@/shared/components";
import { useQuery } from "@tanstack/react-query";
import { Fetch } from "@/shared/api/config";
import { MoviesDetails } from "@/shared/interfaces/movie_details.interface";

export default function ExploreIdScreen() {
  const params = useLocalSearchParams();
  const { id } = params;
  const { data, isLoading } = useQuery<MoviesDetails>({
    queryKey: [`movies-${id}`],
    queryFn: async () => await Fetch(`movie/${id}`),
  });

  if (isLoading) return <DetailsLoader />;

  return <DetailsView details={data!} />;
}
