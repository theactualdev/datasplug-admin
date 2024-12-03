import React, { useState } from "react";
import {
  UserAvatar,
  Block,
  BlockBetween,
  BlockHead,
  BlockTitle,
  Icon,
  Button,
} from "../../../../../components/Component";
import { findUpper, formatDateWithTime, formatter } from "../../../../../utils/Utils";
import { useViewUserBVN } from "../../../../../api/users/user";
import { Modal, ModalBody, Row, Col } from "reactstrap";
import { useForm } from "react-hook-form";

const Details = ({ user }) => {
  const [bvn, setbvn] = useState(null);
  const { mutate: viewBVN } = useViewUserBVN(user?.data?.id, setbvn);
  const [showViewBVN, setShowViewBVN] = useState(false);
  const [passState, setPassState] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { password: "" } });

  const handleViewBVN = (data) => {
    viewBVN(data);
  };

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

          <div className="profile-ud-item">
            <div className="profile-ud wider">
              <span className="profile-ud-label">User Type</span>
              <span className="profile-ud-value ccap text-primary">{user?.data?.type}</span>
            </div>
          </div>
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

          <div className="profile-ud-item">
            <div className="profile-ud wider">
              <span className="profile-ud-label">Phone Number Status</span>
              <span className={`profile-ud-value ccap ${user?.data?.phone_verified ? "text-success" : "text-danger"}`}>
                {user?.data?.phone_verified ? "Verified" : "Not verified"}
              </span>
            </div>
          </div>

          <div className="profile-ud-item">
            <div className="profile-ud wider">
              <span className="profile-ud-label">BVN Verified</span>
              <span className={`profile-ud-value ccap ${user?.data?.bvn_verified ? "text-success" : "text-danger"}`}>
                {user?.data?.bvn_verified ? "Yes" : "No"}
              </span>
            </div>
          </div>

          <div className="profile-ud-item">
            <div className="profile-ud wider">
              <span className="profile-ud-label">BVN Validated</span>
              <span className={`profile-ud-value ccap ${user?.data?.bvn_validated ? "text-success" : "text-danger"}`}>
                {user?.data?.bvn_validated ? "Yes" : "No"}
              </span>
            </div>
          </div>
          {user?.data?.bvn_verified && (
            <div className="profile-ud-item">
              <div className="profile-ud wider">
                <span className="profile-ud-label">View User BVN</span>
                <span className="profile-ud-value ccap">
                  <Button
                    onClick={() => {
                      setShowViewBVN(true);
                    }}
                    size={"sm"}
                    color={"primary"}
                  >
                    View
                  </Button>
                </span>
              </div>
            </div>
          )}
        </div>
      </Block>

      {/* FORM EDIT */}
      <Modal isOpen={showViewBVN} toggle={() => setShowViewBVN(false)} className="modal-dialog-centered" size="sm">
        <ModalBody>
          <a href="#cancel" className="close">
            {" "}
            <Icon
              name="cross-sm"
              onClick={(ev) => {
                ev.preventDefault();
                setShowViewBVN(false);
              }}
            ></Icon>
          </a>
          <div className="p-2">
            <h5 className="title">View User BVN</h5>
            {bvn ? (
              <div className="nk-tnx-details mt-sm-3">
                <Row className="gy-3">
                  <Col lg={6}>
                    <span className="sub-text">BVN</span>
                    <span className="caption-text">{bvn}</span>
                  </Col>
                </Row>
              </div>
            ) : (
              <div className="mt-4">
                <form onSubmit={handleSubmit(handleViewBVN)}>
                  <Row className="g-3">
                    <Col size="12">
                      <div className="form-group">
                        <div className="form-label-group">
                          <label className="form-label" htmlFor="password">
                            Passcode
                          </label>
                        </div>
                        <div className="form-control-wrap">
                          <a
                            href="#password"
                            onClick={(ev) => {
                              ev.preventDefault();
                              setPassState(!passState);
                            }}
                            className={`form-icon lg form-icon-right passcode-switch ${
                              passState ? "is-hidden" : "is-shown"
                            }`}
                          >
                            <Icon name="eye" className="passcode-icon icon-show"></Icon>

                            <Icon name="eye-off" className="passcode-icon icon-hide"></Icon>
                          </a>
                          <input
                            type={passState ? "text" : "password"}
                            id="password"
                            {...register("password", { required: "This field is required" })}
                            // defaultValue="password"
                            placeholder="Enter your passcode"
                            className={`form-control-lg form-control ${passState ? "is-hidden" : "is-shown"}`}
                          />
                          {errors.password && <span className="invalid">{errors.password.message}</span>}
                        </div>
                      </div>

                      <Button color="primary" type="submit">
                        <Icon className="plus"></Icon>
                        <span>View User BVN</span>
                      </Button>
                    </Col>
                  </Row>
                </form>
              </div>
            )}
          </div>
        </ModalBody>
      </Modal>

      {showViewBVN && <div className="toggle-overlay" onClick={() => setShowViewBVN(false)}></div>}
    </React.Fragment>
  );
};

export default Details;
