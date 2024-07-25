import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
// import ProductVideo from "../../../images/product/video-a.jpg";
import Slider from "react-slick";
import { Badge, Card } from "reactstrap";
import {
  Block,
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Button,
  Col,
  Icon,
  Row,
} from "../../../../components/Component";
import Content from "../../../../layout/content/Content";
import Head from "../../../../layout/head/Head";
// import { ProductContext } from "./ProductContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetProductInfo } from "../../../../api/product/products";
import { SlickArrowLeft, SlickArrowRight } from "../../../../components/partials/slick/SlickComponents";
import LoadingSpinner from "../../../components/spinner";
import { formatCurrency, formatDateWithTime, formatter } from "../../../../utils/Utils";
import ImageContainer from "../../../../components/partials/gallery/GalleryImage";
import { useGetGiftcardInfo } from "../../../../api/giftcard";

// const sliderSettings = {
//   className: "slider-init row",
//   slidesToShow: 2,
//   centerMode: false,
//   slidesToScroll: 1,
//   infinite: false,
//   prevArrow: <SlickArrowLeft />,
//   nextArrow: <SlickArrowRight />,
//   responsive: [
//     { breakpoint: 3000, settings: { slidesToShow: 4 } },
//     { breakpoint: 1540, settings: { slidesToShow: 3 } },
//     { breakpoint: 992, settings: { slidesToShow: 2 } },
//     { breakpoint: 576, settings: { slidesToShow: 1 } },
//   ],
// };

// const sliderSettingsDefault = {
//   slidesToShow: 2,
//   slidesToScroll: 1,
//   centerMode: true,
//   slide: null,
//   responsive: [
//     { breakpoint: 1539, settings: { slidesToShow: 2 } },
//     { breakpoint: 768, settings: { slidesToShow: 2 } },
//     { breakpoint: 420, settings: { slidesToShow: 1 } },
//   ],
//   arrows: false,
//   swipeToSlide: true,
//   focusOnSelect: true,
//   className: "slider-init slider-nav",
// };

const settings = {
  className: "slider-init slider-nav",
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  //   centerMode: true,
  prevArrow: <SlickArrowLeft />,
  nextArrow: <SlickArrowRight />,
};

const GiftcardDetails = ({ match }) => {
  //   const { contextData } = useContext(ProductContext);
  const navigate = useNavigate();
  let { giftcardId } = useParams();
  // console.log(giftcardId);
  const { isLoading, data: giftcard } = useGetGiftcardInfo(giftcardId);
  // console.log(giftcard);
  // console.log("hello");

  const statusColor = useCallback((status) => {
    if (status === "pending") {
      return "warning";
    } else if (status === "approved") {
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
                <BlockTitle>Giftcard Details</BlockTitle>
                <BlockDes className="">
                  <p>
                    Giftcard Reference: <span className="fw-medium">{giftcard?.data?.reference}</span>{" "}
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
                  <BlockTitle tag="h5">Giftcard Transaction Information</BlockTitle>
                  <p>Transaction information with user information.</p>
                </BlockHead>
                <div className="profile-ud-list">
                  <div className="profile-ud-item">
                    <div className="profile-ud wider">
                      <span className="profile-ud-label">Transaction Status</span>
                      <span className="profile-ud-value ccap">
                        <Badge
                          className="badge-sm badge-dot has-bg d-inline-flex"
                          color={statusColor(giftcard?.data?.status)}
                        >
                          <span className="ccap">{giftcard?.data?.status}</span>
                        </Badge>
                      </span>
                    </div>
                  </div>
                  <div className="profile-ud-item">
                    <div className="profile-ud wider">
                      <span className="profile-ud-label">Transaction Type</span>
                      <span className="profile-ud-value ccap">{giftcard?.data?.trade_type}</span>
                    </div>
                  </div>
                  <div className="profile-ud-item">
                    <div className="profile-ud wider">
                      <span className="profile-ud-label">Payable Amount</span>
                      <span className="profile-ud-value">
                        {giftcard?.data?.payable_amount ? formatter("NGN").format(giftcard.data.payable_amount) : 0}
                      </span>
                    </div>
                  </div>
                  <div className="profile-ud-item">
                    <div className="profile-ud wider">
                      <span className="profile-ud-label">Giftcard Rate</span>
                      <span className="profile-ud-value">
                        {giftcard?.data?.rate ? formatter("NGN").format(giftcard.data.rate) : 0}
                      </span>
                    </div>
                  </div>
                  <div className="profile-ud-item">
                    <div className="profile-ud wider">
                      <span className="profile-ud-label">Service Charge</span>
                      <span className="profile-ud-value">{giftcard?.data?.service_charge}</span>
                    </div>
                  </div>
                  <div className="profile-ud-item">
                    <div className="profile-ud wider">
                      <span className="profile-ud-label">Giftcard Value</span>
                      <span className="profile-ud-value">
                        {giftcard?.data?.amount}
                        {/* {giftcard?.data?.crypto.code} */}
                      </span>
                    </div>
                  </div>
                  <div className="profile-ud-item">
                    <div className="profile-ud wider">
                      <span className="profile-ud-label">Transaction Date</span>
                      <span className="profile-ud-value">{formatDateWithTime(giftcard?.data?.created_at)}</span>
                    </div>
                  </div>
                  <div className="profile-ud-item">
                    <div className="profile-ud wider">
                      <span className="profile-ud-label">Giftcard Type</span>
                      <span className="profile-ud-value ccap">
                        {giftcard?.data?.card_type}
                        {/* {giftcard?.data?.crypto.code} */}
                      </span>
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
                        {giftcard?.data?.user?.firstname} {giftcard?.data?.user?.lastname}
                      </span>
                    </div>
                  </div>
                  <div className="profile-ud-item">
                    <div className="profile-ud wider">
                      <span className="profile-ud-label">Email</span>
                      <span className="profile-ud-value">{giftcard?.data?.user?.email}</span>
                    </div>
                  </div>
                  <div className="profile-ud-item">
                    <div className="profile-ud wider">
                      <span className="profile-ud-label">Phone Number</span>
                      <span className="profile-ud-value">
                        {giftcard?.data?.user?.phone_code}
                        {giftcard?.data?.user?.phone}
                      </span>
                    </div>
                  </div>
                  <div className="profile-ud-item">
                    <div className="profile-ud wider">
                      <span className="profile-ud-label">Country</span>
                      <span className="profile-ud-value">{giftcard?.data?.user?.country}</span>
                    </div>
                  </div>
                </div>
              </Block>

              <Block>
                <BlockHead className="nk-block-head-line">
                  <BlockTitle tag="h6" className="overline-title text-base">
                    Giftcard Information
                  </BlockTitle>
                </BlockHead>
                <div className="profile-ud-list">
                  <div className="profile-ud-item">
                    <div className="profile-ud wider">
                      <span className="profile-ud-label">Giftcard Name</span>
                      <span className="profile-ud-value">{giftcard?.data?.gift_card?.name}</span>
                    </div>
                  </div>
                  <div className="profile-ud-item">
                    <div className="profile-ud wider">
                      <span className="profile-ud-label">Giftcard Price</span>
                      {giftcard?.data?.trade_type === "sell" ? (
                        <span className="profile-ud-value">
                          {formatter("NGN").format(giftcard?.data?.gift_card?.sell_rate)}
                        </span>
                      ) : (
                        <span className="profile-ud-value">
                          {formatter("NGN").format(giftcard?.data?.gift_card?.ngn_price_list[0])}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Block>

              {/* <div className="nk-divider divider md"></div> */}

              {/* <Block>
                <BlockHead size="sm">
                  <BlockBetween>
                    <BlockTitle tag="h5">Bank Information</BlockTitle>
                  </BlockBetween>
                </BlockHead>
                <div className="profile-ud-list">
                  <div className="profile-ud-item">
                    <div className="profile-ud wider">
                      <span className="profile-ud-label">Account Name</span>
                      <span className="profile-ud-value">
                        {giftcard?.data?.account_name ? giftcard?.data?.account_name : "Not Set"}
                      </span>
                    </div>
                  </div>
                  <div className="profile-ud-item">
                    <div className="profile-ud wider">
                      <span className="profile-ud-label">Account Number</span>
                      <span className="profile-ud-value">
                        {giftcard?.data?.account_number ? giftcard?.data?.account_number : "Not Set"}
                      </span>
                    </div>
                  </div>
                  <div className="profile-ud-item">
                    <div className="profile-ud wider">
                      <span className="profile-ud-label">Bank Name</span>
                      <span className="profile-ud-value">
                        {giftcard?.data?.bank_name ? giftcard?.data?.bank_name : "Not Set"}
                      </span>
                    </div>
                  </div>
                </div>
              </Block> */}

              {/* <div className="nk-divider divider md"></div> */}

              <Block>
                <BlockHead size="sm">
                  <BlockBetween>
                    <BlockTitle tag="h5">Proof</BlockTitle>
                  </BlockBetween>
                </BlockHead>
                {giftcard?.data?.card ? (
                  <div style={{ width: "100px", height: "100px" }}>
                    <ImageContainer img={giftcard.data.card} />
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

export default GiftcardDetails;
