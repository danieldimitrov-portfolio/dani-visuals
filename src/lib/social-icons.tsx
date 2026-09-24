import { Link as LinkIcon } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import {
  InstagramIcon,
  TikTokIcon,
  YoutubeIcon,
  FacebookIcon,
} from "@/components/icons/SocialIcons";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

export const SOCIAL_ICON_MAP: Record<string, ComponentType<IconProps>> = {
  instagram: InstagramIcon,
  tiktok: TikTokIcon,
  youtube: YoutubeIcon,
  facebook: FacebookIcon,
};

export function getSocialIcon(key: string): ComponentType<IconProps> {
  return SOCIAL_ICON_MAP[key] ?? LinkIcon;
}
