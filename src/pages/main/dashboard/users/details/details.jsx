import React from "react";
import { UserAvatar, Block, BlockBetween, BlockHead, BlockTitle, Icon } from "../../../../../components/Component";
import { findUpper, formatDateWithTime, formatter } from "../../../../../utils/Utils";

const Details = ({ user }) => {
  return (
    <React.Fragment>
      <Block>
        <BlockHead className="nk-block-head-line">
          <BlockBetween>
            <BlockTitle tag="h5">Profile Information</BlockTitle>
            {/* <div className="user-card"> */}
            {/* <div className="wide-sm">
                <img src={user?.data?.avatar} />
              </div> */}
            <UserAvatar
              theme={user?.avatar}
              className="md"
              text={user && findUpper(`${user?.data?.firstname} ${user?.data?.lastname}`)}
              image={user?.data?.avatar}
            ></UserAvatar>
            {/* </div> */}
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
              <span className="profile-ud-label">Username</span>
              <span className="profile-ud-value">{user?.data?.username ?? "Not set"}</span>
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
              <span className="profile-ud-value ccap">{user?.data?.gender ? user?.data?.gender : "Not Set"}</span>
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
              <span className="profile-ud-value">{user?.data?.ref_code ? user?.data?.ref_code : "Not Set"}</span>
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
              <span className="profile-ud-label">Date Joined</span>
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
              <span className={`profile-ud-value ccap ${user?.data?.email_verified ? "text-success" : "text-danger"}`}>
                {user?.data?.email_verified ? "Verified" : "Not verified"}
              </span>
            </div>
          </div>

          <div className="profile-ud-item">
            <div className="profile-ud wider">
              <span className="profile-ud-label">Account Status</span>
              <span
                className={`profile-ud-value ccap ${user?.data?.status === "active" ? "text-success" : "text-danger"}`}
              >
                {user?.data?.status}
              </span>
            </div>
          </div>
        </div>
      </Block>
    </React.Fragment>
  );
};

export default Details;
