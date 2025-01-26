import { ICONS } from "@/shared/lib";
import { IconProps } from "./types";

export const Icon: React.FC<IconProps> = ({ name, ...props }) => {
  return ICONS[name as keyof typeof ICONS]({ ...props });
};
