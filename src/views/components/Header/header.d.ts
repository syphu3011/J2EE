import React from "react";
interface HeaderProps {
    isLogin: boolean;
}
declare class Header extends React.Component<HeaderProps> {
    state: {
        prevScrollPos: number;
        isVisible: boolean;
        isLogin: boolean;
    };
    componentDidMount(): void;
    componentWillUnmount(): void;
    handleScroll: () => void;
    render(): import("react/jsx-runtime").JSX.Element;
}
export default Header;
