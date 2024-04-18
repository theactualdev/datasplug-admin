import React, { useCallback, useState } from "react";
import { Button, Card, Nav, NavItem, NavLink } from "reactstrap";
import { Block, BlockBetween, BlockHead, BlockHeadContent, BlockTitle, Icon } from "../../../../components/Component";

import { useNavigate, useParams } from "react-router-dom";
import { useGetSingleUser } from "../../../../api/users/user";
import { UserAvatar } from "../../../../components/Component";
import Content from "../../../../layout/content/Content";
import Head from "../../../../layout/head/Head";
import { findUpper, formatDateWithTime } from "../../../../utils/Utils";
import LoadingSpinner from "../../../components/spinner";

const UserDetailsPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { data: user, isLoading } = useGetSingleUser(userId);
  const [activeTab] = useState("1");

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
                <NavItem>
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
                </NavItem>
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
                              text={user && findUpper(`${user?.firstName} ${user?.lastName}`)}
                              image={user?.profilePicture}
                            ></UserAvatar>
                          </div>
                        </BlockBetween>
                      </BlockHead>
                      <div className="profile-ud-list">
                        <div className="profile-ud-item">
                          <div className="profile-ud wider">
                            <span className="profile-ud-label">Fullname</span>
                            <span className="profile-ud-value">
                              {user?.firstName} {user?.lastName}
                            </span>
                          </div>
                        </div>
                        <div className="profile-ud-item">
                          <div className="profile-ud wider">
                            <span className="profile-ud-label">Email</span>
                            <span className="profile-ud-value">{user?.email}</span>
                          </div>
                        </div>
                        <div className="profile-ud-item">
                          <div className="profile-ud wider">
                            <span className="profile-ud-label">Address</span>
                            <span className="profile-ud-value">{user?.address ? user?.address : "Not Set"}</span>
                          </div>
                        </div>
                        <div className="profile-ud-item">
                          <div className="profile-ud wider">
                            <span className="profile-ud-label">State/Country</span>
                            <span className="profile-ud-value">
                              {user?.state && user?.country ? user?.state / user?.country : "No Location set"}
                              {/* {user?.state}/{user?.country} */}
                            </span>
                          </div>
                        </div>
                        <div className="profile-ud-item">
                          <div className="profile-ud wider">
                            <span className="profile-ud-label">Postal Code</span>
                            <span className="profile-ud-value">{user?.postalCode ? user?.postalCode : "Not Set"}</span>
                          </div>
                        </div>
                        <div className="profile-ud-item">
                          <div className="profile-ud wider">
                            <span className="profile-ud-label">Mobile Number</span>
                            <span className="profile-ud-value">{user?.phoneNumber}</span>
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
                          Account Information
                        </BlockTitle>
                      </BlockHead>
                      <div className="profile-ud-list">
                        <div className="profile-ud-item">
                          <div className="profile-ud wider">
                            <span className="profile-ud-label">Joining Date</span>
                            <span className="profile-ud-value">{formatDateWithTime(user?.createdAt)}</span>
                          </div>
                        </div>
                        <div className="profile-ud-item">
                          <div className="profile-ud wider">
                            <span className="profile-ud-label">Role</span>
                            <span className={`profile-ud-value text-capitalize`}>{user?.role}</span>
                          </div>
                        </div>
                        <div className="profile-ud-item">
                          <div className="profile-ud wider">
                            <span className="profile-ud-label">Verification Status</span>
                            <span className={`profile-ud-value ${user?.isVerified ? "text-success" : "text-danger"}`}>
                              {user?.isVerified ? "Verified" : "Not verified"}
                            </span>
                          </div>
                        </div>
                        <div className="profile-ud-item">
                          <div className="profile-ud wider">
                            <span className="profile-ud-label">Account Status</span>
                            <span
                              className={`profile-ud-value text-capitalize ${
                                user?.status === "pending" ? "text-warning" : ""
                              }`}
                            >
                              {user?.status}
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
