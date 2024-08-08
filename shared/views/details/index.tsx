import {
  View,
  Text,
  Pressable,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import { useThemeColor } from "@/shared/hooks";
import { BlurView } from "expo-blur";
import { Icon, Typography } from "@/shared/components";
import { LinearGradient } from "expo-linear-gradient";
import { STYLES } from "./styles";
import { MoviesDetails } from "@/shared/interfaces/movie_details.interface";
import {
  GestureHandlerRootView,
  TapGestureHandler,
} from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  withDelay,
  withSpring,
} from "react-native-reanimated";
import { useFavoriteStore } from "@/shared/stores";
const { width } = Dimensions.get("screen");

interface Props {
  details: MoviesDetails;
}

const AnimatedImage = Animated.createAnimatedComponent(Image);

export function DetailsView({ details }: Props) {
  const { favorites, addToFavorites, removeToFavorite } = useFavoriteStore();
  const { title, overview, poster_path, genres, vote_average, id } = details;
  const backgroundColor = useThemeColor({}, "background");
  const [isFavorite, setIsFavorite] = useState(false);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0);
  const { goBack } = useNavigation();
  const listGenres = genres.map((item) => item.name).join(", ");

  const handleDobleTap = useCallback(() => {
    const existInFavorite = favorites.find(
      (movie) => String(id) === String(movie.id)
    );
    if (!existInFavorite) {
      addToFavorites(details);
    }
    setIsFavorite(true);
    opacity.value = withSpring(1);
    scale.value = withSpring(1, undefined, (isFinished) => {
      if (isFinished) {
        scale.value = withDelay(500, withSpring(0));
        opacity.value = withDelay(500, withSpring(0));
      }
    });
  }, [favorites]);

  const handlePressHeart = () => {
    if (isFavorite) {
      removeToFavorite(id);
    } else {
      addToFavorites(details);
    }
    setIsFavorite(!isFavorite);
  };

  useEffect(() => {
    const existInFavorite = favorites.find(
      (movie) => String(id) === String(movie.id)
    );
    if (existInFavorite) {
      setIsFavorite(true);
    }
  }, []);

  return (
    <GestureHandlerRootView>
      <View>
        <Pressable
          onPress={() => {
            goBack();
          }}
          style={STYLES.pressable_go_back}
        >
          <BlurView style={STYLES.blur}>
            <Icon name="back" color="#FFFFFF" size={20} />
          </BlurView>
        </Pressable>
        <Pressable style={STYLES.pressable_like} onPress={handlePressHeart}>
          <BlurView style={STYLES.blur}>
            <Icon
              name={isFavorite ? "heart" : "hearto"}
              color={isFavorite ? "red" : "#FFF"}
              size={20}
            />
          </BlurView>
        </Pressable>

        <ScrollView showsVerticalScrollIndicator={false}>
          <TapGestureHandler
            numberOfTaps={2}
            onActivated={() => {
              handleDobleTap();
            }}
          >
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Image
                source={{
                  uri: `${process.env.EXPO_PUBLIC_IMAGE_URL}${poster_path}`,
                }}
                style={STYLES.image}
              />
              <LinearGradient
                colors={["transparent", backgroundColor]}
                style={STYLES.gradient}
              />
              <AnimatedImage
                source={require("@/assets/images/heart.png")}
                style={[
                  STYLES.heart,
                  {
                    opacity,
                    transform: [{ scale }],
                  },
                ]}
              />
            </View>
          </TapGestureHandler>

          <View style={STYLES.info_container}>
            <View style={STYLES.title_container}>
              <Typography type="title" style={{ maxWidth: width / 1.4 }}>
                {title}
              </Typography>
              <View style={STYLES.star_container}>
                <Icon name="star" color="orange" />
                <Typography type="defaultSemiBold">
                  ({vote_average?.toFixed(1)})
                </Typography>
              </View>
            </View>
            <Typography style={STYLES.text_gender_and_date}>
              {listGenres}.
            </Typography>
            <Typography style={{ fontSize: 14 }}>{overview}</Typography>
          </View>
        </ScrollView>
      </View>
    </GestureHandlerRootView>
  );
}
