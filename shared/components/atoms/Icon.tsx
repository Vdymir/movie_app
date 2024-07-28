import AntDesign from "@expo/vector-icons/AntDesign";
import { type IconProps } from "@expo/vector-icons/build/createIconSet";
import { type ComponentProps } from "react";

export function Icon({
  style,
  ...rest
}: IconProps<ComponentProps<typeof AntDesign>["name"]>) {
  return <AntDesign size={20} style={style} {...rest} />;
}
