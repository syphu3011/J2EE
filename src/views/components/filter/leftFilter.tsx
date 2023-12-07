import { Tree } from "antd";
import { DataNode } from "antd/es/tree";
import { useEffect, useState } from "react";
import ColorGroups from "./filtercolor";
import { getProductsWithAllCategory } from "../../../controllers/modules/customer/products";
import { getAllCategories } from "../../../controllers/modules/customer/categories";
import DirectoryTree from "antd/es/tree/DirectoryTree";

const treeData: DataNode[] = [
  {
    title: "Loại",
    key: "types",
    children: [
      {
        title: "Áo",
        key: "Áo",
        children: [
          {
            title: "Áo thun",
            key: "Áo thun",
          },
          {
            title: "Áo sơ mi",
            key: "Áo sơ mi",
          },
          {
            title: "Áo kiểu",
            key: "Áo kiểu",
          },
          {
            title: "Áo polo",
            key: "Áo polo",
          },
        ],
      },
      {
        title: "Quần",
        key: "Quần",
        children: [
          {
            title: "Quần Jeans",
            key: "Quần Jeans",
          },
          {
            title: "Quần tây",
            key: "Quần tây",
          },
          {
            title: "Quần Jogger",
            key: "Quần Jogger",
          },
          {
            title: "Quần dài vải",
            key: "Quần dài vải",
          },
        ],
      },
      {
        title: "Đầm và chân váy",
        key: "Đầm và chân váy",
        children: [
          {
            title: "Đầm và jumpsuit",
            key: "Đầm và jumpsuit",
          },
          {
            title: "Chân váy",
            key: "Chân váy",
          },
        ],
      },
      {
        title: "Áo khoác",
        key: "Áo khoác",
        children: [
          {
            title: "Áo hoodie",
            key: "Áo hoodie",
          },
          {
            title: "Áo Blazer",
            key: "Áo Blazer",
          },
          {
            title: "Áo chăn bông",
            key: "Áo chăn bông",
          },
          {
            title: "Áo Parka",
            key: "Áo Parka",
          },
        ],
      },
      {
        title: "Phụ kiện",
        key: "Phụ kiện",
        children: [
          {
            title: "Nón",
            key: "Nón",
          },
          {
            title: "Nơ cài",
            key: "Nơ cài",
          },
          {
            title: "Vớ",
            key: "Vớ",
          },
          {
            title: "Thắt lưng",
            key: "Thắt lưng",
          },
        ],
      },
    ],
  },

  {
    title: "Kích cỡ",
    key: "Kích cỡ",
    children: [
      {
        title: "XS",
        key: "XS",
      },
      {
        title: "S",
        key: "S",
      },
      {
        title: "M",
        key: "M",
      },
      {
        title: "L",
        key: "L",
      },
      {
        title: "XL",
        key: "XL",
      },
      {
        title: "Free size",
        key: "Free size",
      },
    ],
  },
  {
    title: "Giá",
    key: "Giá",
    children: [
      {
        title: "Dưới 1.000.000",
        key: "less-than-one-milions",
      },
      {
        title: "Từ 1.000.000 đến 5.000.000",
        key: "from-one-milions-to-five-milions",
      },
      {
        title: " Trên 5.000.000",
        key: "Bigger-than-five-milions",
      },
    ],
  },
];
export default function FilterProduct({
  onColorSelect,
  onDataChange,
  dataCate,
  allCate,
}) {
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([
    "types",
    "Áo",
    "Quần",
    "Kích cỡ",
    "Phụ kiện",
    "Giá",
    "Đầm và chân váy",
    "Áo khoác",
  ]); //mo rong not dung trong cay
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
  const [productData, setProductData] = useState([]);
  const [filteredProductData, setFilteredProductData] = useState(null);
  const [treeDataa, setTreeData] = useState(null);

  const onExpand = (expandedKeysValue: React.Key[]) => {
    console.log("onExpand", expandedKeysValue);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    setExpandedKeys(expandedKeysValue);
    //setAutoExpandParent(false);
  };
  const onSelect = (selectedKeysValue, { checked, node }) => {
    // console.log("onSelect", selectedKeysValue, info);
    setSelectedKeys(selectedKeysValue);
    onDataChange(node.key);
    // Kiểm tra xem tiêu đề của nút được chọn thuộc vào giá hay kích thước
    // if (
    //   node.key === "Giá" ||
    //   node.key === "Kích cỡ" ||
    //   node.key === "types"
    // ) {
    //   const childKeys = [];
    //   const traverseTree = (node) => {
    //     if (node.children) {
    //       node.children.forEach((child) => {
    //         childKeys.push(child.key);
    //         traverseTree(child);
    //       });
    //     }
    //   };
    //   traverseTree(node);
    //   setSelectedKeys([...selectedKeysValue, ...childKeys]);
    // }
    // Nếu là checkbox cha và đang được chọn
    if (node.children && checked) {
      // Lọc ra các keys của các node con để không thêm vào danh sách checkedKeys
      const childKeys = node.children.map(child => child.key);
      selectedKeysValue = selectedKeysValue.filter(key => !childKeys.includes(key));
    }

    setSelectedKeys(selectedKeysValue);
  };
  useEffect(() => {
    const _tempTree = [];
    let _tempCate = allCate.sort((a, b) => b.capbac - a.capbac);
    for (const cate of _tempCate) {
      const _data = {
        key: cate.ten,
        title: cate.ten,
        level: cate.capbac,
        parent_id: cate.loaicha ? cate.loaicha.ma : null,
        children: _tempTree.filter((e) => e.parent_id == cate.ma),
      };
      _tempTree.push(_data);
    }
    setTreeData([{
      title: "Loại",
      key: "types",
      disableCheckbox: true,
      children: 
        _tempTree.filter((e) => e.level == 1)
      },
      {
        title: "Kích cỡ",
        key: "Kích cỡ",
        disableCheckbox: true,
        children: [
          {
            title: "XS",
            key: "XS",
          },
          {
            title: "S",
            key: "S",
          },
          {
            title: "M",
            key: "M",
          },
          {
            title: "L",
            key: "L",
          },
          {
            title: "XL",
            key: "XL",
          },
          {
            title: "Free size",
            key: "Free size",
          },
        ],
      },
      {
        title: "Giá",
        key: "Giá",
        disableCheckbox: true,
        children: [
          {
            title: "Dưới 1.000.000",
            key: "less-than-one-milions",
          },
          {
            title: "Từ 1.000.000 đến 5.000.000",
            key: "from-one-milions-to-five-milions",
          },
          {
            title: " Trên 5.000.000",
            key: "Bigger-than-five-milions",
          },
        ],
      }
    ]
    );
  }, [dataCate, allCate]);
  return (
    <div className="filter">
      <Tree
        expandedKeys={expandedKeys}
        checkable
        defaultExpandAll={false}
        onExpand={onExpand}
        treeData={treeDataa}
        // onSelect={onSelect}
        selectable={false}
        onCheck={onSelect}
        checkedKeys={selectedKeys}
      ></Tree>
      <div>
        <span>Màu sắc</span>
        <ColorGroups onColorSelect={onColorSelect} productDataProp={dataCate} />
      </div>
    </div>
  );
}
