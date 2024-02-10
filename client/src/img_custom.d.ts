// eslint-disable-next-line react/no-typos
import "react";

declare module "react" {
  interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
    fetchpriority?: 'high' | 'low' | 'auto';
  }
}

// import { AriaAttributes, DOMAttributes } from "react";

// declare module 'react' {
//   interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
//     fetchpriority?: 'high' | 'low' | 'auto';
//   }
// };