import React, { useCallback } from "react";
// import ProductVideo from "../../../images/product/video-a.jpg";
import { Badge, Card } from "reactstrap";
import {
  Block,
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Button,
  Icon,
} from "../../../../components/Component";
import Content from "../../../../layout/content/Content";
import Head from "../../../../layout/head/Head";
// import { ProductContext } from "./ProductContext";
import { useNavigate, useParams } from "react-router-dom";
import { useGetAssetInfo } from "../../../../api/assets";
import ImageContainer from "../../../../components/partials/gallery/GalleryImage";
import { formatDateWithTime, formatter } from "../../../../utils/Utils";
import LoadingSpinner from "../../../components/spinner";

const AssetDetails = ({ match }) => {
  //   const { contextData } = useContext(ProductContext);
  const navigate = useNavigate();
  let { assetId } = useParams();
  const { isLoading, data: asset } = useGetAssetInfo(assetId);

  const statusColor = useCallback((status) => {
    if (status === "pending") {
      return "warning";
    } else if (status === "approved" || status === "partially_approved") {
      return "success";
    } else if (status === "transferred") {
      return "info";
    } else {
      return "danger";
    }
  }, []);

  return (
    <React.Fragment>
      <Head title="Product Detail"></Head>
      {!isLoading ? (
        <Content>
          <BlockHead size="sm">
            <BlockBetween className="g-3">
              <BlockHeadContent>
                <BlockTitle>Asset Details</BlockTitle>
                <BlockDes className="">
                  <p>
                    Asset Reference: <span className="fw-medium">{asset?.data?.reference}</span>{" "}
                  </p>
                </BlockDes>
              </BlockHeadContent>
              <BlockHeadContent>
                <Button color="light" outline className="bg-white d-none d-sm-inline-flex" onClick={() => navigate(-1)}>
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
          </BlockHead>

          <Card>
            <div className="card-inner">
              <Block>
                <BlockHead>
                  <BlockTitle tag="h5">Asset Transaction Information</BlockTitle>
                  <p>Transaction information with user information.</p>
                </BlockHead>
                <div className="profile-ud-list">
                  <div className="profile-ud-item">
                    <div className="profile-ud wider">
                      <span className="profile-ud-label">Transaction Status</span>
                      <span className="profile-ud-value ccap">
                        <Badge
                          className="badge-sm badge-dot has-bg d-inline-flex"
                          color={statusColor(asset?.data?.status)}
                        >
                          <span className="ccap">
                            {asset?.data?.status === "partially_approved" ? "Partial" : asset?.data?.status}
                          </span>
                        </Badge>
                        {/* {asset?.data?.status} */}
                      </span>
                    </div>
                  </div>
                  <div className="profile-ud-item">
                    <div className="profile-ud wider">
                      <span className="profile-ud-label">Transaction Type</span>
                      <span className="profile-ud-value ccap">{asset?.data?.trade_type}</span>
                    </div>
                  </div>
                  <div className="profile-ud-item">
                    <div className="profile-ud wider">
                      <span className="profile-ud-label">Payable Amount</span>
                      <span className="profile-ud-value">
                        {asset?.data?.payable_amount ? formatter("NGN").format(asset.data.payable_amount) : 0}
                      </span>
                    </div>
                  </div>
                  <div className="profile-ud-item">
                    <div className="profile-ud wider">
                      <span className="profile-ud-label">Asset Rate</span>
                      <span className="profile-ud-value">
                        {asset?.data?.rate ? formatter("NGN").format(asset.data.rate) : 0}
                      </span>
                    </div>
                  </div>
                  <div className="profile-ud-item">
                    <div className="profile-ud wider">
                      <span className="profile-ud-label">Service Charge</span>
                      <span className="profile-ud-value">{asset?.data?.service_charge}</span>
                    </div>
                  </div>
                  <div className="profile-ud-item">
                    <div className="profile-ud wider">
                      <span className="profile-ud-label">Asset Value</span>
                      <span className="profile-ud-value">
                        {asset?.data?.amount}
                        {asset?.data?.crypto.code}
                      </span>
                    </div>
                  </div>
                  <div className="profile-ud-item">
                    <div className="profile-ud wider">
                      <span className="profile-ud-label">Transaction Date</span>
                      <span className="profile-ud-value">{formatDateWithTime(asset?.data?.created_at)}</span>
                    </div>
                  </div>
                </div>
              </Block>

              <Block>
                <BlockHead className="nk-block-head-line">
                  <BlockTitle tag="h6" className="overline-title text-base">
                    User Information
                  </BlockTitle>
                </BlockHead>
                <div className="profile-ud-list">
                  <div className="profile-ud-item">
                    <div className="profile-ud wider">
                      <span className="profile-ud-label">FullName</span>
                      <span className="profile-ud-value">
                        {asset?.data?.user?.firstname} {asset?.data?.user?.lastname}
                      </span>
                    </div>
                  </div>
                  <div className="profile-ud-item">
                    <div className="profile-ud wider">
                      <span className="profile-ud-label">Email</span>
                      <span className="profile-ud-value">{asset?.data?.user?.email}</span>
                    </div>
                  </div>
                  <div className="profile-ud-item">
                    <div className="profile-ud wider">
                      <span className="profile-ud-label">Phone Number</span>
                      <span className="profile-ud-value">
                        {asset?.data?.user?.phone_code}
                        {asset?.data?.user?.phone}
                      </span>
                    </div>
                  </div>
                  <div className="profile-ud-item">
                    <div className="profile-ud wider">
                      <span className="profile-ud-label">Country</span>
                      <span className="profile-ud-value">{asset?.data?.user?.country}</span>
                    </div>
                  </div>
                </div>
              </Block>

              <Block>
                <BlockHead className="nk-block-head-line">
                  <BlockTitle tag="h6" className="overline-title text-base">
                    Network
                  </BlockTitle>
                </BlockHead>
                <div className="profile-ud-list">
                  <div className="profile-ud-item">
                    <div className="profile-ud wider">
                      <span className="profile-ud-label">Network Name</span>
                      <span className="profile-ud-value">{asset?.data?.network?.name}</span>
                    </div>
                  </div>
                  <div className="profile-ud-item">
                    <div className="profile-ud wider">
                      <span className="profile-ud-label">Wallet Address</span>
                      <span className="profile-ud-value">{asset?.data?.network?.wallet_address}</span>
                    </div>
                  </div>
                </div>
              </Block>

              <div className="nk-divider divider md"></div>

              <Block>
                <BlockHead size="sm">
                  <BlockBetween>
                    <BlockTitle tag="h5">Reviews</BlockTitle>
                  </BlockBetween>
                </BlockHead>
                <div className="bq-note">
                  {/* {noteData.map((item) => (
                          <div className="bq-note-item" key={item.id}>
                            <div className="bq-note-text">
                              <p>{item.text}</p>
                            </div>
                            <div className="bq-note-meta">
                              <span className="bq-note-added">
                                Added on <span className="date">{item.date}</span> at{" "}
                                <span className="time">{item.time} PM</span>
                              </span>
                              <span className="bq-note-sep sep">|</span>
                              <span className="bq-note-by">
                                By <span>{item.company}</span>
                              </span>
                              <a
                                href="#deletenote"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                  deleteNote(item.id);
                                }}
                                className="link link-sm link-danger"
                              >
                                Delete Note
                              </a>
                            </div>
                          </div>
                        ))} */}
                </div>
              </Block>

              <div className="nk-divider divider md"></div>

              <Block>
                <BlockHead size="sm">
                  <BlockBetween>
                    <BlockTitle tag="h5">Proof</BlockTitle>
                  </BlockBetween>
                </BlockHead>
                {asset?.data?.proof ? (
                  <div style={{ width: "100px", height: "100px", overflow: "hidden" }}>
                    <ImageContainer img={asset.data.proof} />
                  </div>
                ) : (
                  <span>No Image was uploaded</span>
                )}
              </Block>
            </div>
          </Card>
        </Content>
      ) : (
        <LoadingSpinner />
      )}
    </React.Fragment>
  );
};

export default AssetDetails;
