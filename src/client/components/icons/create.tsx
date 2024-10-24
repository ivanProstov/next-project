import { SVGProps } from "react";

export const CreateIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <>
      <svg
        id="svg"
        fill="currentColor"
        stroke="currentColor"
        width="36px"
        height="36px"
        version="1.1"
        viewBox="144 144 512 512"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <g id="IconSvg_bgCarrier" strokeWidth="0"></g>
        <g
          id="IconSvg_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
          stroke="#CCCCCC"
        ></g>
        <g id="IconSvg_iconCarrier">
          <g xmlns="http://www.w3.org/2000/svg">
            <path d="m400 218.94c-99.977 0-181.06 81.082-181.06 181.06s81.082 181.05 181.05 181.05c99.977 0 181.05-81.082 181.05-181.05 0.003907-99.977-81.078-181.06-181.05-181.06zm0 314.88c-73.996 0-133.82-59.828-133.82-133.82s59.828-133.82 133.82-133.82 133.82 59.828 133.82 133.82-59.828 133.82-133.82 133.82z" />
            <path d="m466.91 376.38h-43.297v-43.297c0-13.383-10.234-23.617-23.617-23.617-13.383 0-23.617 10.234-23.617 23.617l0.003906 43.297h-43.297c-13.383 0-23.617 10.234-23.617 23.617s10.234 23.617 23.617 23.617l43.297-0.003907v43.297c0 13.383 10.234 23.617 23.617 23.617s23.617-10.234 23.617-23.617l-0.003907-43.297h43.297c13.383 0 23.617-10.234 23.617-23.617 0-13.379-11.02-23.613-23.617-23.613z" />
          </g>
        </g>
      </svg>
    </>
  );
};
