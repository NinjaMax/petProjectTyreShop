declare module "*.png" {
    const path: string;
    export default path;
}
declare module "*.svg" {
    const path: string;
    export default path;
}
declare module "*.jpeg" {
    const path: string;
    export default path;
}
declare module "*.jpg" {
    const path: string;
    export default path;
}
declare module "*.json" {
    const path: string;
    export default path;
}

declare module '*.module.css' {
    const classes: { readonly [key: string]: string };
    export default classes;
}
  
declare module '*.module.scss' {
    const classes: { readonly [key: string]: string };
    export default classes;
}
  
declare module '*.module.sass' {
    const classes: { readonly [key: string]: string };
    export default classes;
}