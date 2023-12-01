import React from "react";
interface ProductProps {
    productData: [];
}
interface ProductState {
    minValue: number;
    maxValue: number;
    productData: [any];
}
export default class Product extends React.PureComponent<ProductProps, ProductState> {
    constructor(props: any);
    handleChange: (value: any) => void;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
