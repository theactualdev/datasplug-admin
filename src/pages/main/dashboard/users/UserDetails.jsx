import React, { useCallback, useState } from "react";
import { Button, Card, Nav, NavItem, NavLink } from "reactstrap";
import { Block, BlockBetween, BlockHead, BlockHeadContent, BlockTitle, Icon } from "../../../../components/Component";

import { useNavigate, useParams } from "react-router-dom";
import { useGetSingleUser } from "../../../../api/users/user";
import { UserAvatar } from "../../../../components/Component";
import Content from "../../../../layout/content/Content";
import Head from "../../../../layout/head/Head";
import { findUpper, formatDateWithTime, formatter } from "../../../../utils/Utils";
import LoadingSpinner from "../../../components/spinner";

const UserDetailsPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { data: user, isLoading } = useGetSingleUser(userId);
  const [activeTab] = useState("1");
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
                    className={`${activeTabStyle("1")}`}
                    onClick={(ev) => {
                      ev.preventDefault();
                      // toggle("1");
                    }}
                  >
                    Personal Information
                  </NavLink>
                </NavItem>
                {/* <NavItem>
                  <NavLink
                    tag="a"
                    href="#tab"
                    className={`${activeTabStyle("2")}`}
                    onClick={(ev) => {
                      ev.preventDefault();
                      // toggle("2");
                    }}
                  >
                    Account Information
                  </NavLink>
                </NavItem> */}
              </Nav>
              <div className="card-inner">
                {isLoading ? (
                  <LoadingSpinner />
                ) : (
                  <>
                    <Block>
                      <BlockHead className="nk-block-head-line">
                        <BlockBetween>
                          <BlockTitle tag="h5">Profile Information</BlockTitle>
                          <div className="user-card">
                            <UserAvatar
                              // theme={user?.avatar}
                              className="md"
                              text={user && findUpper(`${user?.data?.firstname} ${user?.data?.lastname}`)}
                              image={user?.data?.avatar}
                            ></UserAvatar>
                          </div>
                        </BlockBetween>
                      </BlockHead>
                      <div className="profile-ud-list">
                        <div className="profile-ud-item">
                          <div className="profile-ud wider">
                            <span className="profile-ud-label">Fullname</span>
                            <span className="profile-ud-value">
                              {user?.data?.firstname} {user?.data?.lastname}
                            </span>
                          </div>
                        </div>
                        <div className="profile-ud-item">
                          <div className="profile-ud wider">
                            <span className="profile-ud-label">Email</span>
                            <span className="profile-ud-value">{user?.data?.email}</span>
                          </div>
                        </div>
                        <div className="profile-ud-item">
                          <div className="profile-ud wider">
                            <span className="profile-ud-label">Gender</span>
                            <span className="profile-ud-value ccap">
                              {user?.data?.gender ? user?.data?.gender : "Not Set"}
                            </span>
                          </div>
                        </div>
                        <div className="profile-ud-item">
                          <div className="profile-ud wider">
                            <span className="profile-ud-label">State/Country</span>
                            <span className="profile-ud-value">
                              {user?.data?.state && user?.data?.country
                                ? `${user?.data?.state} / ${user?.data?.country}`
                                : "No Location set"}
                              {/* {user?.state}/{user?.country} */}
                            </span>
                          </div>
                        </div>
                        <div className="profile-ud-item">
                          <div className="profile-ud wider">
                            <span className="profile-ud-label">Referral Code</span>
                            <span className="profile-ud-value">
                              {user?.data?.ref_code ? user?.data?.ref_code : "Not Set"}
                            </span>
                          </div>
                        </div>
                        <div className="profile-ud-item">
                          <div className="profile-ud wider">
                            <span className="profile-ud-label">Mobile Number</span>
                            {user?.data?.phone ? (
                              <span className="profile-ud-value">
                                ({user?.data?.phone_code}) {user?.data?.phone}
                              </span>
                            ) : (
                              <span className="profile-ud-value">Not set</span>
                            )}
                          </div>
                        </div>
                        <div className="profile-ud-item">
                          <div className="profile-ud wider">
                            <span className="profile-ud-label">Joining Date</span>
                            <span className="profile-ud-value">{formatDateWithTime(user?.data?.created_at)}</span>
                          </div>
                        </div>

                        {/* <div className="profile-ud-item">
                    <div className="profile-ud wider">
                      <span className="profile-ud-label">Email Address</span>
                      <span className="profile-ud-value">{user.email}</span>
                    </div>
                  </div> */}
                      </div>
                    </Block>

                    <div className="nk-divider divider md"></div>

                    <Block>
                      <BlockHead className="nk-block-head-line">
                        <BlockTitle tag="h4" className="overline-title">
                          Wallet Information
                        </BlockTitle>
                      </BlockHead>
                      <div className="profile-ud-list">
                        <div className="profile-ud-item">
                          <div className="profile-ud wider">
                            <span className="profile-ud-label">Wallet Type</span>
                            <span className="profile-ud-value">{user?.data?.wallet?.type}</span>
                          </div>
                        </div>
                        <div className="profile-ud-item">
                          <div className="profile-ud wider">
                            <span className="profile-ud-label">Wallet Balance</span>
                            <span className={`profile-ud-value text-capitalize`}>
                              {formatter("NGN").format(user?.data?.wallet?.balance)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Block>

                    <div className="nk-divider divider md"></div>

                    <Block>
                      <BlockHead className="nk-block-head-line">
                        <BlockTitle tag="h4" className="overline-title">
                          Account Information
                        </BlockTitle>
                      </BlockHead>
                      <div className="profile-ud-list">
                        <div className="profile-ud-item">
                          <div className="profile-ud wider">
                            <span className="profile-ud-label">Email Verified</span>
                            <span
                              className={`profile-ud-value ccap ${
                                user?.data?.email_verified ? "text-success" : "text-danger"
                              }`}
                            >
                              {user?.data?.email_verified ? "Verified" : "Not verified"}
                            </span>
                          </div>
                        </div>

                        <div className="profile-ud-item">
                          <div className="profile-ud wider">
                            <span className="profile-ud-label">Account Status</span>
                            <span
                              className={`profile-ud-value ccap ${
                                user?.data?.status === "active" ? "text-success" : "text-danger"
                              }`}
                            >
                              {user?.data?.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Block>
                  </>
                )}
              </div>
            </div>
          </div>
        </Card>
      </Content>
    </>
  );
};
export default UserDetailsPage;
