const BACKEND_URLS = {
  baseURL: import.meta.env.VITE_APP_BACKEND_BASE_URL,
  // baseURL: "https://dummyjson.com",
  auth: {
    me: "/",
    // register: "/users/",
    login: "/login",
    // resendOtp: "/users/resend-verification/",
    forgotPassword: "/forgot-password",
    resetPassword: "/reset-password/",
    // verifyEmail: "/users/verify/",
    logout: "/logout",
    refreshToken: "/refresh-access-token/",
  },
  product: {
    all: "/products",
    productReview: "/review",
  },
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
  permissions: "/role-permissions",
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
