import React from "react";
interface ProductProps {
}
interface ProductState {
    minValue: number;
    maxValue: number;
}
export default class Product extends React.PureComponent<ProductProps, ProductState> {
    constructor(props: any);
    handleChange: (value: any) => void;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
