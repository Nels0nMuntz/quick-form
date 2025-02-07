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
  "new-form": (props: IconsProps) => (
    <svg
      width="28"
      height="36"
      viewBox="0 0 28 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="presentation"
      aria-hidden="true"
      focusable="false"
      style={{ width: "auto", height: "auto" }}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.23077 2.11765C2.636 2.11765 2.15385 2.5917 2.15385 3.17647V32.8235C2.15385 33.4083 2.636 33.8824 3.23077 33.8824H24.7692C25.364 33.8824 25.8462 33.4083 25.8462 32.8235V9.88235H21.2692C19.4849 9.88235 18.0385 8.4602 18.0385 6.70588V2.11765H3.23077ZM20.1923 3.63585L24.344 7.76471H21.2692C20.6745 7.76471 20.1923 7.29065 20.1923 6.70588V3.63585ZM0 3.17647C0 1.42215 1.44647 0 3.23077 0H19.5651L28 8.38849V32.8235C28 34.5778 26.5535 36 24.7692 36H3.23077C1.44646 36 0 34.5778 0 32.8235V3.17647ZM6.46154 13.7647C6.46154 13.1799 6.94369 12.7059 7.53846 12.7059H20.4615C21.0563 12.7059 21.5385 13.1799 21.5385 13.7647C21.5385 14.3495 21.0563 14.8235 20.4615 14.8235H7.53846C6.94369 14.8235 6.46154 14.3495 6.46154 13.7647ZM6.46154 20.1176C6.46154 19.5329 6.94369 19.0588 7.53846 19.0588H20.4615C21.0563 19.0588 21.5385 19.5329 21.5385 20.1176C21.5385 20.7024 21.0563 21.1765 20.4615 21.1765H7.53846C6.94369 21.1765 6.46154 20.7024 6.46154 20.1176ZM6.46154 26.4706C6.46154 25.8858 6.94369 25.4118 7.53846 25.4118H14C14.5948 25.4118 15.0769 25.8858 15.0769 26.4706C15.0769 27.0554 14.5948 27.5294 14 27.5294H7.53846C6.94369 27.5294 6.46154 27.0554 6.46154 26.4706Z"
        className="fill-current"
      />
    </svg>
  ),
  "arrow-left": (props: IconsProps) => (
    <svg
      width="16"
      height="13"
      viewBox="0 0 16 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="presentation"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path
        d="M8.75284 13L7.65909 11.9205L12.1619 7.41761H0.5V5.85511H12.1619L7.65909 1.36648L8.75284 0.272727L15.1165 6.63636L8.75284 13Z"
        className="fill-current"
      />
    </svg>
  ),
};
