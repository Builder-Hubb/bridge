import React from "react";
import { SvgXml } from "react-native-svg";

interface CustomIconProps {
  svgString: string;
  size?: number;
  color: string;
}

const CustomIcon: React.FC<CustomIconProps> = ({
  svgString,
  size = 24,
  color,
}) => {
  const coloredSvg = svgString
    .replace(/stroke="[^"]*"/g, `stroke="${color}"`)
    .replace(/fill="[^"]*"/g, 'fill="none"');

  return <SvgXml xml={coloredSvg} width={size} height={size} />;
};

export default CustomIcon;
