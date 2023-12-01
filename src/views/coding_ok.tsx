import * as React from "react";
import {
    getProducts,
    getProductsWithAllCategory,
} from "../controllers/modules/customer/products";
import {
    getAllProduct,
    getAllCategory,
} from "../controllers/modules/admin/product";
import { postKeyToServer } from "../controllers/modules/key";
import {
    addCate,
    getAllCate,
    removeCate,
} from "../controllers/modules/admin/cate";
import {
    blockCustomer,
    editCustomer,
    getCustomer,
    removeCustomer,
} from "../controllers/modules/admin/customer";

export default class Coding_ok extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            test: "",
        };
    }
    componentDidMount() {
        postKeyToServer().then((rsk) => {
            getCustomer().then((rs) => {
                this.setState({
                    test: rs,
                });
            });
            // removeCustomer(2).then(rs => {
            //     this.setState({
            //         test: rs
            //     })
            // })
        });
    }
    render() {
        return <div> {JSON.stringify(this.state.test)}</div>;
    }
}
