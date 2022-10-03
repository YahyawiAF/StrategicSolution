import { STYLES_ROOT_FONT_SIZE_PX } from "~/config/styles";

export const pxToRem = (value: number) => {
  return `${value / STYLES_ROOT_FONT_SIZE_PX}rem`;
};
