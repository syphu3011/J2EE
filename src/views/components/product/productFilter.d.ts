import React from "react";
interface ProductProps {
    productData: any[];
    selectedTree: any[];
}
interface ProductState {
    minValue: number;
    maxValue: number;
    productData: any[];
}
export default class ProductFilter extends React.PureComponent<ProductProps, ProductState> {
    constructor(props: any);
    componentDidUpdate(prevProps: ProductProps): void;
    handleChange: (value: any) => void;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
