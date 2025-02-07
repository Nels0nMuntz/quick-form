import { ICONS, IconsProps } from "@/shared/lib";

export type IconName = keyof typeof ICONS;

export interface IconProps extends IconsProps {
  name: IconName;
}
