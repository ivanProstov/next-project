import { SVGProps } from "react";

export const CloseIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <>
      <svg
        id="svg"
        fill="currentColor"
        stroke="currentColor"
        width="16px"
        height="16px"
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
          stroke="currentColor"
        ></g>
        <g id="IconSvg_iconCarrier">
          <path
            xmlns="http://www.w3.org/2000/svg"
            d="m400.91 433.76 145.93 145.93c9.0703 9.0703 23.801 9.0391 32.848 0 9.0625-9.0703 9.0703-23.781-0.003907-32.848l-145.92-145.93 145.93-145.93c9.0625-9.0703 9.0625-23.785 0-32.848-9.0703-9.0703-23.781-9.0703-32.848 0l-145.93 145.92-145.93-145.93c-9.0703-9.0703-23.781-9.0703-32.844 0-4.5352 4.5352-6.7734 10.457-6.7695 16.414-0.015626 5.9688 2.2344 11.902 6.7695 16.434l145.93 145.93-145.91 145.91c-4.5352 4.5391-6.8086 10.484-6.8008 16.43 0.011719 5.9492 2.2656 11.891 6.7969 16.426 9.0625 9.0625 23.781 9.0703 32.848 0z"
          />
        </g>
      </svg>
    </>
  );
};
