import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    text: string;
    bg: string;
    bgComponent: string;
    border: string;
    accent: string;
    accentHover: string;
  }
}
