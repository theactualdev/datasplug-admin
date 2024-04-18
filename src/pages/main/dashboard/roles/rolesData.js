export const permissionsData = [
  "Create Product",
  "Edit Product",
  "edit Product Status",
  "Create Order",
  "Edit Order",
  "edit order status",
  "verify stores",
  "add categories",
  "edit categories",
  "edit categories status",
  "add brand",
  "edit brand",
  "edit brand status",
  "add subcategories",
  "edit sucategories",
  "edit subcategories status",
  "add colors",
  "edit colors",
  "edit color status",
  "add product types",
  "edit product types",
  "approve / decline payouts",
  "create coupons",
  "edit coupons",
  "edit coupon status",
  "add users",
  "approve users",
  "restrict users",
  "create admin",
  "suspend admin",
  "edit admin",
  "create roles",
  "edit roles",
  "delete roles",
];

export const roleData = [
  {
    id: 1,
    name: "admin",
    permissionCount: "34",
    totalAdmins: "1",
    dateCreated: "20/10/2022",
    permissions: permissionsData,
  },
  {
    id: 2,
    name: "manager",
    permissionCount: "24",
    totalAdmins: "5",
    dateCreated: "20/05/2023",
    permissions: [
      "edit Product Status",
      "Create Order",
      "Edit Order",
      "edit order status",
      "verify stores",
      "add categories",
      "edit categories",
      "edit categories status",
      "add brand",
      "edit brand",
      "edit brand status",
      "add subcategories",
      "edit sucategories",
      "edit subcategories status",
      "add colors",
      "edit colors",
      "edit color status",
      "add product types",
      "edit product types",
      "approve / decline payouts",
      "create coupons",
      "edit coupons",
      "edit coupon status",
      "approve users",
      "restrict users",
    ],
  },
  {
    id: 3,
    name: "courier",
    permissionCount: "10",
    totalAdmins: "10",
    dateCreated: "20/5/2023",
    permissions: ["Create Order", "Edit Order", "edit order status"],
  },
];
