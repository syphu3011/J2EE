import React from "react";
interface HeaderProps {
    isLogin: boolean;
}
declare class Header extends React.Component<HeaderProps> {
    componentDidMount(): void;
    componentWillUnmount(): void;
    handleScroll: () => void;
    render(): import("react/jsx-runtime").JSX.Element;
}
export default Header;
