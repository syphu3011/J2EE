declare module '*.css' {
     const content: { [className: string]: string };
     export default content;
   }
   declare module '*.scss' {
     const content: { [className: string]: string };
     export default content;
   }
declare module "*.jpg" {
    const path: string;
    export default path;
}
declare module "*.jpeg" {
  const path: string;
  export default path;
}
declare module '*.png'{
    const path: string;
    export default path;
}