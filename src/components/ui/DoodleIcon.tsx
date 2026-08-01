import React from "react";
import { getDoodleSvg } from "../../lib/icons/doodleRegistry";

export interface DoodleIconProps {
  name: string;
  className?: string;
  size?: number | string;
  ariaLabel?: string;
}

export const DoodleIcon: React.FC<DoodleIconProps> = ({
  name,
  className = "size-5",
  size,
  ariaLabel,
}) => {
  const rawSvg = getDoodleSvg(name);
  if (!rawSvg) return null;

  const processedSvg = rawSvg.replace(/<svg([^>]*)>/i, (_, attrs) => {
    const ariaAttr = ariaLabel
      ? `role="img" aria-label="${ariaLabel}"`
      : `aria-hidden="true" focusable="false"`;
    return `<svg ${attrs} class="size-full h-full w-full max-h-full max-w-full block object-contain" ${ariaAttr}>`;
  });

  return (
    <span
      className={`doodle-icon inline-flex shrink-0 items-center justify-center align-middle select-none ${className}`}
      style={
        size
          ? {
              width: typeof size === "number" ? `${size}px` : size,
              height: typeof size === "number" ? `${size}px` : size,
            }
          : undefined
      }
      dangerouslySetInnerHTML={{ __html: processedSvg }}
    />
  );
};
