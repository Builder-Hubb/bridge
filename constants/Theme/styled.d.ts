import "styled-components/native";

declare module "styled-components/native" {
  export interface DefaultTheme {
    colors: {
      green: Record<string | number, string>;
      purple: Record<string | number, string>;
    };
    fonts: {
      regular: string;
      semibold: string;
    };
  }
}
