const BACKEND_URLS = {
  baseURL: import.meta.env.VITE_APP_BACKEND_BASE_URL,
  // baseURL: "https://dummyjson.com",
  auth: {
    me: "/",
    // register: "/users/",
    login: "/auth/login",
    // resendOtp: "/users/resend-verification/",
    forgotPassword: "/forgot-password",
    resetPassword: "/auth/password/reset",
    changePassword: "/auth/password/update",
    // verifyEmail: "/users/verify/",
    logout: "/auth/logout",
    refreshToken: "/refresh-access-token/",
  },
  admins: "/admins",
  crypto: "/crypto-transactions",
  giftcard: "/giftcard-transactions",
  transaction: "/transactions",
  wallet: "/wallet/transactions",
  annoucement: "/alerts",
  banners: "/banners",
  referralTerms: "/referral-terms",
  systemAccount: "/bank-accounts",
  providers: "/providers",
  service: "/services",
  product: "/products",
  route: "/route-actions",

  // product: {
  //   all: "/products",
  //   productReview: "/review",
  // },
  stores: "/store",
  catalog: {
    brands: "/catalog/brands",
    categories: "/catalog/categories",
    subcategories: "/catalog/sub-categories",
    colors: "/catalog/colors",
  },
  orders: "/orders",
  generalOrders: "/order-summary",
  coupons: "/coupon",
  users: "/users",
  roles: "/roles",
  permissions: "/permissions",
  serviceCharge: "/additional-charges",
  shipping: {
    intlZones: "/shipping-zone",
    intlZonesWeight: "/shipping-zone-weight",
    intlClass: "/shipping-class",
    localZones: "/local-shipping-zone",
    localZonesWeight: "/local-shipping-zone-weight",
    localClass: "/local-shipping-class",
  },
};

export default BACKEND_URLS;
