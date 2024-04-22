import React, { useEffect, useMemo, useRef, useState } from "react";
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
import { useGetAssetInfo } from "../../../../api/assets";
import ImageContainer from "../../../../components/partials/gallery/GalleryImage";

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

const AssetDetails = ({ match }) => {
  //   const { contextData } = useContext(ProductContext);
  const navigate = useNavigate();
  let { assetId } = useParams();
  // console.log(assetId);
  const { isLoading, data: asset } = useGetAssetInfo(assetId);
  // console.log(asset);
  //   console.log(product);

  //   const [data] = contextData;

  //   const [sliderData, setSliderData] = useState([]);
  //   const [currentSlide, setCurrentSlide] = useState({});
  //   const [colorSector, setColorSelector] = useState(1);
  //   const [sizeSelector, setSizeSelector] = useState(1);
  //   const [counter, setCounter] = useState(1);
  //   const [videoOpen, setVideoOpen] = useState(false);
  //   const [nav1, setNav1] = useState(null);
  //   const [nav2, setNav2] = useState(null);

  // increases quantity number
  //   const increaseCounter = () => {
  //     setCounter((prevState) => prevState + 1);
  //   };

  //   // decreases quantity number
  //   const decreaseCounter = () => {
  //     if (counter !== 0) {
  //       setCounter((prevState) => prevState - 1);
  //     }
  //   };

  // const productImages = useMemo(() => {
  //   if (!isLoading && product?.images) {
  //     return product?.images?.map((item, idx) => {
  //       return { id: idx, img: item };
  //     });
  //   } else {
  //     return [];
  //   }
  // }, [isLoading, product]);

  // const description = useMemo(() => {
  //   if (!isLoading && product) {
  //     return { __html: product.description };
  //   }
  // }, [product]);

  // changes slides
  //   const slideChange = (index) => {
  //     var product = productImages.find((item) => item.id === index);
  //     setCurrentSlide(product);
  //   };

  //   const slider1 = useRef(null);
  //   const slider2 = useRef(null);

  //   useEffect(() => {
  //     setNav1(slider1.current);
  //     setNav2(slider2.current);
  //   }, []);

  //   console.log(product);

  //   console.log(productImages);

  //   useEffect(() => {
  //     if (!isLoading && product?.images) {
  //       let initalImage = { id: 0, img: product.images[0] };
  //       setCurrentSlide(initalImage);
  //     }
  //   }, [isLoading, product]);
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
                      <span className="profile-ud-value ccap">{asset?.data?.status}</span>
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
                  <div style={{ width: "100px", height: "100px" }}>
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
