import * as React from "react";
import {
  getProducts,
  getProductsWithAllCategory,
} from "../controllers/modules/customer/products";
import { getAllProduct } from "../controllers/modules/admin/product";
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
import {
  editProductInStock,
  getProductInStock,
} from "../controllers/modules/admin/productInStock";
import {
  getProviderProductColorSize,
  importProduct,
  importProductHistory,
  removeImportProduct,
} from "../controllers/modules/admin/importProduct";
import {
  addProvider,
  editProvider,
  getProvider,
  removeProvider,
} from "../controllers/modules/admin/provider";
import {
  addPrivileges,
  editPrivileges,
  getPrivileges,
  removePrivileges,
} from "../controllers/modules/admin/privileges";
import {
  addStaff,
  editStaff,
  getStaff,
  grantAccount,
  removeAccount,
  removeStaff,
} from "../controllers/modules/admin/staff";
import { buy } from "../controllers/modules/customer/buy";
import {
  confirmOrder,
  getHistoryOrders as getHistoryOrdersAdmin,
  getOrders,
} from "../controllers/modules/admin/order";
import {
  statistics_revenue_days,
  statistics_revenue_month,
  top10product,
  top5customer,
  top5staff,
} from "../controllers/modules/admin/statistic";
import { logout } from "../controllers/modules/customer/logout";
import { getAllCategories } from "../controllers/modules/customer/categories";
import { getHistoryOrders } from "../controllers/modules/customer/historyorders";

export default class Coding_ok extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      test: "",
    };
  }

  componentDidMount() {
    const self = this;

    async function removeImport() {
      const ar = [41, 42];
      for (const i of ar) {
        try {
          const rs = await removeImportProduct(i);
          console.log(rs);
          self.setState({
            test: self.state.test + JSON.stringify(rs) + "\n",
          });
        } catch (e) {
          console.log(e);
          self.setState({
            test: self.state.test + JSON.stringify(e) + "\n",
          });
        }
      }
    }

    async function testProvider(number) {
      let rs = await addProvider(
        "Thử nghiệm thêm nhà cung cấp",
        "Quận 7",
        "0334171858",
        1
      );
      self.setState({
        test: self.state.test + JSON.stringify(rs) + "\n",
      });
      rs = await editProvider(
        number,
        "Thử nghiệm sửa nhà cung cấp",
        "Quận 7",
        "0334171858",
        1
      );
      self.setState({
        test: self.state.test + JSON.stringify(rs) + "\n",
      });
      rs = await removeProvider(number);
      self.setState({
        test: self.state.test + JSON.stringify(rs) + "\n",
      });
    }

    async function testPrivileges(number) {
      let rs = await removePrivileges(number);
      self.setState({
        test: self.state.test + JSON.stringify(rs) + "\n",
      });
    }

    async function testBuy() {
      await buy(
        1,
        "Nguyễn Văn Sỹ Phú",
        "279 Lâm Văn Bền",
        "sdfhk@gmail.com",
        "0382949382",
        [
          {
            masanpham: 12,
            makichco: 1,
            mamau: 1,
            soluong: 20,
          },
          {
            masanpham: 6,
            makichco: 1,
            mamau: 5,
            soluong: 20,
          },
        ]
      );
      await buy(
        2,
        "Vòng Cỏng Mềnh",
        "279 Lâm Văn Bền",
        "sdfhk@gmail.com",
        "0382949382",
        [
          {
            masanpham: 17,
            makichco: 1,
            mamau: 2,
            soluong: 5,
          },
          {
            masanpham: 17,
            makichco: 3,
            mamau: 2,
            soluong: 5,
          },
        ]
      );
      await buy(
        2,
        "Vòng Cỏng Mềnh",
        "279 Lâm Văn Bền",
        "sdfhk@gmail.com",
        "0382949382",
        [
          {
            masanpham: 17,
            makichco: 1,
            mamau: 2,
            soluong: 5,
          },
          {
            masanpham: 17,
            makichco: 3,
            mamau: 2,
            soluong: 5,
          },
        ]
      );
      await buy(
        3,
        "Nguyễn Minh Thao",
        "279 Lâm Văn Bền",
        "sdfhk@gmail.com",
        "0382949382",
        [
          {
            masanpham: 18,
            makichco: 1,
            mamau: 2,
            soluong: 5,
          },
          {
            masanpham: 18,
            makichco: 2,
            mamau: 2,
            soluong: 5,
          },
          {
            masanpham: 18,
            makichco: 3,
            mamau: 2,
            soluong: 5,
          },
        ]
      );
      await buy(
        3,
        "Nguyễn Minh Thao",
        "279 Lâm Văn Bền",
        "sdfhk@gmail.com",
        "0382949382",
        [
          {
            masanpham: 18,
            makichco: 1,
            mamau: 2,
            soluong: 5,
          },
          {
            masanpham: 18,
            makichco: 2,
            mamau: 2,
            soluong: 5,
          },
          {
            masanpham: 18,
            makichco: 3,
            mamau: 2,
            soluong: 5,
          },
        ]
      );
      await buy(
        4,
        "Trần Phương Vy",
        "279 Lâm Văn Bền",
        "sdfhk@gmail.com",
        "0382949382",
        [
          {
            masanpham: 19,
            makichco: 1,
            mamau: 2,
            soluong: 5,
          },
          {
            masanpham: 19,
            makichco: 2,
            mamau: 2,
            soluong: 5,
          },
          {
            masanpham: 19,
            makichco: 3,
            mamau: 2,
            soluong: 5,
          },
        ]
      );
      await buy(
        4,
        "Trần Phương Vy",
        "279 Lâm Văn Bền",
        "sdfhk@gmail.com",
        "0382949382",
        [
          {
            masanpham: 19,
            makichco: 1,
            mamau: 2,
            soluong: 5,
          },
          {
            masanpham: 19,
            makichco: 2,
            mamau: 2,
            soluong: 5,
          },
          {
            masanpham: 19,
            makichco: 3,
            mamau: 2,
            soluong: 5,
          },
        ]
      );
    }

    postKeyToServer().then((rsk) => {
      // removeImport();
      //   importProductHistory().then((rs) => {
      //     self.setState({
      //       test: JSON.stringify(rs),
      //     });
      //   });
      // getHistoryOrders().then(rs => {
      //     self.setState({
      //         test: JSON.stringify(rs),
      //     });
      // })
      getPrivileges().then((rs) => {
        self.setState({
          test: JSON.stringify(rs),
          // JSON.stringify(rs.data.sanpham.data)
          // + '\n' +
          // JSON.stringify(rs.data.nhacungcap.data)
          // + '\n' +
          // JSON.stringify(rs.data.mau.data)
          // + '\n' +
          // JSON.stringify(rs.data.kichco.data)
        });
      });
    });
  }

  render() {
    return <div>{JSON.stringify(this.state.test)}</div>;
  }
}
