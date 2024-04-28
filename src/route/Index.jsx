import React from "react";
import { Route } from "react-router-dom";

import EcomOrder from "../pages/main/dashboard/order/Orders";
import EcomProducts from "../pages/main/dashboard/product/ProductList";
// import EcomSettings from "../pages/main/dashboard/settings/Settings";
import EcomDashboard from "../pages/main/dashboard/index";
import ProductDetailPage from "../pages/main/dashboard/product/ProductDetail";
import EcomStores from "../pages/main/dashboard/stores/StoreList";

import Error404Classic from "../pages/error/404-classic";
import Error404Modern from "../pages/error/404-modern";
import Error504Classic from "../pages/error/504-classic";
import Error504Modern from "../pages/error/504-modern";

import ForgotPassword from "../pages/auth/ForgotPassword";
import Login from "../pages/auth/Login";

import Layout from "../layout/Index";
import LayoutNoSidebar from "../layout/Index-nosidebar";
import OrderDetails from "../pages/main/dashboard/order/OrderDetails";
import ProductReviewPage from "../pages/main/dashboard/product/ProductReview";

import AdminList from "../pages/main/dashboard/admin/adminList";
import BrandsPage from "../pages/main/dashboard/catelog/Brands";
import CategoriesPage from "../pages/main/dashboard/catelog/CategoriesPage";
import ColorsPage from "../pages/main/dashboard/catelog/Colors";
import ProductTypePage from "../pages/main/dashboard/catelog/ProductType";
import SubCategoriesPage from "../pages/main/dashboard/catelog/SubCategories";
import CouponsPage from "../pages/main/dashboard/coupons/CouponsPage";
import SingleOrders from "../pages/main/dashboard/order/SingleOrders";
import PayoutPage from "../pages/main/dashboard/payouts/PayoutPage";
import CreateRoles from "../pages/main/dashboard/roles/createRoles";
import EditRoles from "../pages/main/dashboard/roles/editRoles";
import RolesList from "../pages/main/dashboard/roles/rolesList";
import UserSecurityPage from "../pages/main/dashboard/settings/Security";
import UserInfoPage from "../pages/main/dashboard/settings/UserInfo";
import StoreDetailsPageTwo from "../pages/main/dashboard/stores";
import UserDetailsPage from "../pages/main/dashboard/users/UserDetails";
import UserList from "../pages/main/dashboard/users/UserList";
import ProtectedRoute from "./ProtectedRoute";

import { RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import ChangePassword from "../pages/auth/ChangePassword";
import OtherSettingsPage from "../pages/main/dashboard/settings/OtherSettings";
import AssetListPage from "../pages/main/dashboard/assets/assetsPage";
import GiftCardListPage from "../pages/main/dashboard/giftcards/giftcard";
import WithdrawalListPage from "../pages/main/dashboard/withdrawals/withdrawals";
import TransactionsPage from "../pages/main/dashboard/transactions/transactions";
import ReferralsPage from "../pages/main/dashboard/referrals/ProductList";
import AnnouncementPage from "../pages/main/dashboard/announcement/announcement";
import BannersPage from "../pages/main/dashboard/banners/banners";
// import FAQsPage from "../pages/main/dashboard/faqs/ProductList";
import AppVersionPage from "../pages/main/dashboard/app-version/ProductList";
import ReferralTermsPage from "../pages/main/dashboard/referral-terms/ProductList";
import SystemBankAccountPage from "../pages/main/dashboard/system-bank-account/ProductList";
import ServicesPage from "../pages/main/dashboard/services/ProductList";
import ServiceProviders from "../pages/main/dashboard/service-providers/ProductList";
import TradeSettings from "../pages/main/dashboard/trade-settings/ProductList";
import AssetDetails from "../pages/main/dashboard/assets/details";
import GiftcardDetails from "../pages/main/dashboard/giftcards/details";
import FAQsPage from "../pages/main/dashboard/faq/FaqList";
import FaqCategoriesPage from "../pages/main/dashboard/faq/CategoriesPage";

const routes = (
  <Route>
    <>
      {/*Panel */}
      <Route element={<ProtectedRoute />}>
        <Route path={`/`} element={<Layout />}>
          <Route index element={<EcomDashboard />}></Route>
          <Route path="orders">
            <Route path="general" element={<EcomOrder />} />
            <Route path="single" element={<SingleOrders />} />
            <Route path="order-details/:orderId" element={<OrderDetails />} />
          </Route>
          <Route path="products">
            <Route index element={<EcomProducts />} />
            <Route path="product-details/:productId" element={<ProductDetailPage />}></Route>
            <Route path="product-reviews/:productId" element={<ProductReviewPage />}></Route>
          </Route>
          <Route path="stores" element={<EcomStores />}></Route>
          <Route path="store-details/:storeId" element={<StoreDetailsPageTwo />}></Route>
          <Route>
            <Route path="categories" element={<CategoriesPage />}></Route>
            <Route path="subcategory" element={<SubCategoriesPage />}></Route>
            <Route path="brands" element={<BrandsPage />}></Route>
            <Route path="colors" element={<ColorsPage />}></Route>
            <Route path="product-type" element={<ProductTypePage />}></Route>
          </Route>
          <Route path="payouts" element={<PayoutPage />}></Route>
          <Route path="coupons" element={<CouponsPage />}></Route>

          <Route path="assets" element={<AssetListPage />} />
          <Route path="assets-details/:assetId" element={<AssetDetails />} />
          <Route path="giftcards" element={<GiftCardListPage />} />
          <Route path="giftcards-details/:giftcardId" element={<GiftcardDetails />} />
          <Route path="withdrawals" element={<WithdrawalListPage />} />
          <Route path="transactions" element={<TransactionsPage />} />
          <Route path="announcement" element={<AnnouncementPage />} />
          <Route path="faqs" element={<FAQsPage />} />
          <Route path="faq-categories" element={<FaqCategoriesPage />}></Route>
          <Route path="banners" element={<BannersPage />} />
          <Route path="app-version" element={<AppVersionPage />} />
          <Route path="referral-terms" element={<ReferralTermsPage />} />
          <Route path="system-bank-account" element={<SystemBankAccountPage />} />
          <Route path="service-providers" element={<ServiceProviders />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="trades-info" element={<TradeSettings />} />

          <Route path="user-management" element={<UserList />}></Route>
          <Route path="user-details/:userId" element={<UserDetailsPage />}></Route>
          <Route path="admin-management" element={<AdminList />}></Route>
          <Route path="roles-management" element={<RolesList />}></Route>
          <Route path="create-roles" element={<CreateRoles />}></Route>
          <Route path="edit-roles/:roleId" element={<EditRoles />}></Route>
          <Route path="referral-management" element={<ReferralsPage />}></Route>

          <Route path="settings">
            <Route index element={<UserInfoPage />} />
            <Route path="user-security" element={<UserSecurityPage />} />
            <Route path="other-settings" element={<OtherSettingsPage />} />
          </Route>
        </Route>
      </Route>

      <Route path={`/`} element={<LayoutNoSidebar />}>
        <Route path="auth-reset" element={<ForgotPassword />}></Route>
        <Route path="auth-login" element={<Login />}></Route>
        <Route path="auth-change-password" element={<ChangePassword />} />
        <Route path="errors">
          <Route path="404-modern" element={<Error404Modern />}></Route>
          <Route path="404-classic" element={<Error404Classic />}></Route>
          <Route path="504-modern" element={<Error504Modern />}></Route>
          <Route path="504-classic" element={<Error504Classic />}></Route>
        </Route>
        <Route path="*" element={<Error404Modern />}></Route>
      </Route>
    </>
  </Route>
);

const Router = () => {
  const routers = createBrowserRouter(createRoutesFromElements(routes));

  return <RouterProvider router={routers} />;
};
export default Router;
