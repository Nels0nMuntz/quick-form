import { IconsProps } from "./types";

export const ICONS = {
  logo: (props: IconsProps) => (
    <svg
      width="512"
      height="512"
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="presentation"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <rect
        x="12"
        y="12"
        width="488"
        height="488"
        rx="48"
        fill="#03111B"
        stroke="#007AD3"
        strokeWidth="24"
      />
      <rect x="76" y="76" width="360" height="92" rx="46" fill="#F1C40F" />
      <rect x="76" y="210" width="220" height="92" rx="46" fill="#E74C3C" />
      <rect x="76" y="344" width="92" height="92" rx="46" fill="#C587EB" />
    </svg>
  ),
};
