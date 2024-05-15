import React, { useCallback, useState } from "react";
import { Button, Card, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { Block, BlockBetween, BlockHead, BlockHeadContent, BlockTitle, Icon } from "../../../../components/Component";

import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useGetSingleUser, useUpdateUserStatus } from "../../../../api/users/user";
import { UserAvatar } from "../../../../components/Component";
import Content from "../../../../layout/content/Content";
import Head from "../../../../layout/head/Head";
import { findUpper, formatDateWithTime, formatter } from "../../../../utils/Utils";
import LoadingSpinner from "../../../components/spinner";
import Details from "./details/details";
import WithdrawalTable from "../wallet/table";
import { TransactionTable } from "../transactions/table";
import AddModal from "./AddModal";
import { useFinanceUser } from "../../../../api/users/user";

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

  const activeTabStyle = useCallback(
    (value) => {
      if (value === activeTab) {
        return "active";
      }
      return;
    },
    [activeTab]
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
              <BlockTitle page>User Details</BlockTitle>
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
                    <WithdrawalTable userId={userId} />
                  </TabPane>
                  <TabPane tabId="services">
                    <TransactionTable userId={userId} />
                    {/* <WithdrawalTable userId={userId} /> */}
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
