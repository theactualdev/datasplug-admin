import React, { useState } from "react";
import {
  Button,
  Card,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  UncontrolledDropdown,
} from "reactstrap";
import {
  BlockBetween,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  BlockDes,
} from "../../../../components/Component";

import toast from "react-hot-toast";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useFinanceUser, useGetSingleUser, useUpdateUserStatus } from "../../../../api/users/user";
import Content from "../../../../layout/content/Content";
import Head from "../../../../layout/head/Head";
import FaqTable from "../faq/faqTable";
import { TransactionTable } from "../transactions/table";
import WithdrawalTable from "../wallet/table";
import AddModal from "./AddModal";
import Details from "./details/details";
import ReferralUserList from "./details/referral-table";

const UserDetailsPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const itemsPerPage = searchParams.get("limit") ?? 7;
  const currentPage = searchParams.get("page") ?? 1;
  const activeTab = searchParams.get("tab") ?? "details";
  const { data: user, isLoading } = useGetSingleUser(userId);
  const { mutate: financeUser } = useFinanceUser(userId);
  const { mutate: updateUserStatus } = useUpdateUserStatus(userId);

  // console.log(user);

  const copyAccountDetails = (id) => {
    let account = user?.data?.bank_accounts?.find((item) => item.id === id);
    if (account) {
      let text = `Account Name: ${account?.account_name}
                  Account Number: ${account?.account_number}
                  Bank Name: ${account.bank_name}`;
      // console.log(text);
      navigator.clipboard.writeText(text);
      toast("Copied to clipboard");
    }

    // console.log(account);
  };

  const ActionOptions = ({ id }) => (
    <ul className="nk-tb-actions gx-1 my-n1">
      <li>
        <UncontrolledDropdown>
          <DropdownToggle tag="a" className="btn btn-trigger dropdown-toggle btn-icon me-n1">
            <Icon name="more-h"></Icon>
          </DropdownToggle>
          <DropdownMenu end>
            <ul className="link-list-opt no-bdr">
              <li>
                <DropdownItem
                  tag="a"
                  href="#"
                  onClick={(ev) => {
                    ev.preventDefault();
                    copyAccountDetails(id);
                  }}
                >
                  <Icon name="copy"></Icon>
                  <span>Copy details</span>
                </DropdownItem>
              </li>
            </ul>
          </DropdownMenu>
        </UncontrolledDropdown>
      </li>
    </ul>
  );
  const onFormSubmit = (data) => {
    let submittedData = {
      ...data,
      type: data.type.value,
    };
    financeUser(submittedData);
    closeModal();
  };

  const [view, setView] = useState({
    finance: false,
  });

  const toggleModal = (type) => {
    setView({
      finance: type === "finance" ? true : false,
    });
  };

  // resets forms
  const resetForm = () => {
    // setFormData({
    //   name: "",
    //   status: "",
    // });
  };

  const closeModal = () => {
    setView({ finance: false });
    resetForm();
  };

  return (
    <>
      <Head title="User Details"></Head>

      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockDes className="text-soft">
                <p>User Details</p>
              </BlockDes>
              <BlockTitle page>
                {user?.data?.firstname} {user?.data?.lastname}
              </BlockTitle>
            </BlockHeadContent>
            <BlockHeadContent>
              <Button
                color="light"
                outline
                className="bg-white d-none d-sm-inline-flex"
                onClick={() => navigate("/user-management")}
              >
                <Icon name="arrow-left"></Icon>
                <span>Back</span>
              </Button>
              <a
                href="#back"
                onClick={(ev) => {
                  ev.preventDefault();
                  navigate(-1);
                }}
                className="btn btn-icon btn-outline-light bg-white d-inline-flex d-sm-none"
              >
                <Icon name="arrow-left"></Icon>
              </a>
            </BlockHeadContent>
          </BlockBetween>
          {/* <p>Basic info, like your name and address, that you use on Nio Platform.</p> */}
        </BlockHead>
        <Card>
          <div className="card-aside-wrap" id="user-detail-block">
            <div className="card-content">
              <Nav tabs className="nav nav-tabs nav-tabs-card">
                <NavItem>
                  <NavLink
                    tag="a"
                    href="#tab"
                    className={activeTab === "details" ? "active" : ""}
                    onClick={(ev) => {
                      ev.preventDefault();
                      setSearchParams({ tab: "details" });
                    }}
                  >
                    Personal Information
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    tag="a"
                    href="#tab"
                    className={activeTab === "wallet" ? "active" : ""}
                    onClick={(ev) => {
                      ev.preventDefault();
                      setSearchParams({ tab: "wallet" });
                    }}
                  >
                    Wallet Transactions
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    tag="a"
                    href="#tab"
                    className={activeTab === "services" ? "active" : ""}
                    onClick={(ev) => {
                      ev.preventDefault();
                      setSearchParams({ tab: "services" });
                    }}
                  >
                    Service Transactions
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    tag="a"
                    href="#tab"
                    className={activeTab === "referral" ? "active" : ""}
                    onClick={(ev) => {
                      ev.preventDefault();
                      setSearchParams({ tab: "referral" });
                    }}
                  >
                    Referrals
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    tag="a"
                    href="#tab"
                    className={activeTab === "accounts" ? "active" : ""}
                    onClick={(ev) => {
                      ev.preventDefault();
                      setSearchParams({ tab: "accounts" });
                    }}
                  >
                    Bank Account
                  </NavLink>
                </NavItem>

                <NavItem className="nav-item nav-item-trigger">
                  <Button
                    // outline={storeDetail?.store?.adminAction !== "approved"}
                    onClick={() => toggleModal("finance")}
                    className="me-2"
                    // color={storeDetail?.store?.adminAction !== "approved" ? "primary" : "danger"}
                  >
                    <span>Finance</span>
                  </Button>

                  <Button
                    outline={user?.data?.status !== "active"}
                    className="ccap"
                    onClick={updateUserStatus}
                    color={user?.data?.status !== "active" ? "primary" : "danger"}
                  >
                    <span>{user?.data?.status === "active" ? "Restrict" : "Unrestrict"}</span>
                  </Button>
                </NavItem>
              </Nav>
              <div className="card-inner">
                {/* {isLoading ? (
                  <LoadingSpinner />
                ) : (
                  <div> */}
                <TabContent activeTab={activeTab}>
                  <TabPane tabId="details">
                    <Details user={user} />
                  </TabPane>
                  <TabPane tabId="wallet">
                    <WithdrawalTable userId={userId} showStats={true} type={"all"} />
                  </TabPane>
                  <TabPane tabId="services">
                    <TransactionTable userId={userId} showStats={true} purpose={"all"} />
                    {/* <WithdrawalTable userId={userId} /> */}
                  </TabPane>
                  <TabPane tabId="accounts">
                    <FaqTable
                      faqTitle={"Accounts"}
                      headers={["Account Name", "Account Number", "Bank Name"]}
                      dataKeys={["account_name", "account_number", "bank_name"]}
                      defaultData={user?.data?.bank_accounts}
                      data={user?.data?.bank_accounts}
                      hidePagination={true}
                      hideFilters={true}
                      action={ActionOptions}
                    />
                  </TabPane>
                  <TabPane tabId="referral">
                    <ReferralUserList list={user?.data?.referrals} />
                  </TabPane>
                </TabContent>
              </div>
              {/* )} */}
              {/* </div> */}
            </div>
          </div>
        </Card>
        <AddModal modal={view.finance} closeModal={closeModal} onSubmit={onFormSubmit} />
      </Content>
    </>
  );
};
export default UserDetailsPage;
