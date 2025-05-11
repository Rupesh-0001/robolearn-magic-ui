import * as React from "react";

interface SvgIconProps {
  [key: string]: any;
}

const SvgIcon: React.FC<SvgIconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="235"
    height="50"
    version="1"
    viewBox="0 0 491.25 104.25"
  >
    <defs>
      <filter id="e54dd9f43b" width="100%" height="100%" x="0%" y="0%">
        <feColorMatrix
          colorInterpolationFilters="sRGB"
          values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
        ></feColorMatrix>
      </filter>
      <filter id="ec67942b03" width="100%" height="100%" x="0%" y="0%">
        <feColorMatrix
          colorInterpolationFilters="sRGB"
          values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 .2126 .7152 .0722 .000000001"
        ></feColorMatrix>
      </filter>
      <image
        xlinkHref="data:image/png;base64,iVBORw... (truncated for brevity)"
        id="dba65c9d67"
        width={500}
        height={500}
        x={0}
        y={0}
        preserveAspectRatio={"xMidYMid meet"}
      ></image>
      <image
        xlinkHref="data:image/png;base64,iVBORw... (truncated for brevity)"
        id="d1e156b778"
        width={500}
        height={500}
        x={-40.516}
        y={-222.82}
        preserveAspectRatio={"xMidYMid meet"}
      ></image>
      <clipPath id={"7608edb6ba"}>
        <path d={"M1.383,...."}></path>
      </clipPath>
      <mask id={"c7f52138dc"}>
        <g filter={"url(#e54dd9f43b)"}>
          <g filter={"url(#ec67942b03)"}>
            {/* Additional image elements here */}
          </g>
        </g>
      </mask>
    </defs>
    <g clipPath={"url(#7608edb6ba)"} mask={"url(#c7f52138dc)"}>
      {/* Image rendering logic */}
    </g>
  </svg>
);

export default SvgIcon;
