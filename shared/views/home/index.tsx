import { Fetch } from "@/shared/api/config";
import { MoviesAPIResponse } from "@/shared/interfaces/movies.interface";
import { useQuery } from "@tanstack/react-query";
import { ActivityIndicator, Dimensions, ScrollView, View } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { RenderItemAnimation } from "@/shared/components";
import { STYLES } from "./styles";
import ListMoviesType from "@/shared/components/molecules/ListMoviesType";
const { width } = Dimensions.get("screen");

const CARD_HEIGHT = width * 0.7 * 1.4;

export default function HomeView() {
  const { data, isLoading, error } = useQuery<MoviesAPIResponse>({
    queryKey: ["movie/now_playing"],
    queryFn: async () => await Fetch("movie/now_playing"),
  });
  const translateX = useSharedValue(0);

  const handlerScroll = useAnimatedScrollHandler((event) => {
    translateX.value = event.contentOffset.x;
  });

  return (
    <View style={[STYLES.main]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {isLoading ? (
          <View
            style={{
              height: CARD_HEIGHT * 1.6,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator />
          </View>
        ) : (
          <Animated.FlatList
            data={data?.results}
            horizontal
            pagingEnabled
            onScroll={handlerScroll}
            scrollEventThrottle={15}
            style={{ height: CARD_HEIGHT * 1.6 }}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => {
              return (
                <RenderItemAnimation
                  movie={item as any}
                  translateX={translateX}
                  index={index}
                />
              );
            }}
          />
        )}
        <View>
          <ListMoviesType type="top_rated" />
          <ListMoviesType type="popular" />
          <ListMoviesType type="upcoming" />
          <View style={{ height: 20 }} />
        </View>
      </ScrollView>
    </View>
  );
}
