import React from "react";

// Eager load all doodle SVGs as raw strings in React environment
const svgFiles = import.meta.glob<string>("../../assets/icons/doodle/**/*.svg", {
  query: "?raw",
  import: "default",
  eager: true,
});

function getSvgRaw(iconName: string): string | null {
  const cleanName = iconName.endsWith(".svg") ? iconName : `${iconName}.svg`;
  for (const path in svgFiles) {
    if (path.endsWith(`/${cleanName}`) || path.endsWith(`/${iconName}`)) {
      return svgFiles[path];
    }
  }
  return null;
}

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
  const rawSvg = getSvgRaw(name);
  if (!rawSvg) return null;

  const processedSvg = rawSvg
    .replace(/fill="(?:black|#000000)"/gi, 'fill="currentColor"')
    .replace(/stroke="(?:black|#000000)"/gi, 'stroke="currentColor"')
    .replace(/<svg([^>]*)>/i, (_, attrs) => {
      const cleanedAttrs = attrs.replace(/\s(width|height)="[^"]*"/gi, "");
      const ariaAttr = ariaLabel
        ? `role="img" aria-label="${ariaLabel}"`
        : `aria-hidden="true" focusable="false"`;
      const styleAttr = size
        ? `style="width: ${typeof size === "number" ? `${size}px` : size}; height: ${typeof size === "number" ? `${size}px` : size};"`
        : "";
      const classAttr = className ? `class="${className}"` : "";
      return `<svg${cleanedAttrs} ${classAttr} ${styleAttr} ${ariaAttr}>`;
    });

  return (
    <span
      className="inline-flex shrink-0 items-center justify-center"
      dangerouslySetInnerHTML={{ __html: processedSvg }}
    />
  );
};
