import React, { useEffect, useState } from "react";
import { Card, Modal, ModalBody } from "reactstrap";
import { useGetServiceCharge, useUpdateServiceCharge } from "../../../../api/users/admin";
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
  RSelect,
  Row,
} from "../../../../components/Component";
import Content from "../../../../layout/content/Content";
import Head from "../../../../layout/head/Head";
import UserProfileAside from "./UserProfileAside";
import { formatter } from "../../../../utils/Utils";
import { useEditReferralBonus, useGetReferralBonus } from "../../../../api/settings";
const ReferralBonusPage = () => {
  const [sm, updateSm] = useState(false);
  const [editedId, setEditedId] = useState();
  const [mobileView, setMobileView] = useState(false);
  //   const { data, isLoading } = useGetServiceCharge();
  const { data } = useGetReferralBonus();
  const { mutate: updateCharges } = useUpdateServiceCharge(editedId);
  const { mutate: editBonus } = useEditReferralBonus(editedId);
  const [modalTab, setModalTab] = useState("1");
  const [modal, setModal] = useState(false);
  //   console.log(data);

  const [formData, setFormData] = useState({
    name: "",
    value: "",
    type: "",
    threshold: "",
  });

  const submitForm = (e) => {
    e.preventDefault();

    let data = {
      value: e.target.value.value,
      type: formData.type,
      threshold: e.target.threshold.value,
    };
    // console.log(data);
    editBonus(data);
    setModal(false);
  };

  const onEditClick = (id) => {
    data?.data?.forEach((item) => {
      if (item.id === id) {
        setFormData({
          name: item.user_type,
          value: item.value,
          type: item.type,
          threshold: item.threshold,
        });
      }
    });
    setEditedId(id);
    setModal(true);
  };

  // function to change the design view under 990 px
  const viewChange = () => {
    if (window.innerWidth < 990) {
      setMobileView(true);
    } else {
      setMobileView(false);
      updateSm(false);
    }
  };

  useEffect(() => {
    viewChange();
    window.addEventListener("load", viewChange);
    window.addEventListener("resize", viewChange);
    document.getElementsByClassName("nk-header")[0].addEventListener("click", function () {
      updateSm(false);
    });
    return () => {
      window.removeEventListener("resize", viewChange);
      window.removeEventListener("load", viewChange);
    };
  }, []);

  return (
    <React.Fragment>
      <Head title="Settings"></Head>
      <Content>
        <Card>
          <div className="card-aside-wrap">
            <div
              className={`card-aside card-aside-left user-aside toggle-slide toggle-slide-left toggle-break-lg ${
                sm ? "content-active" : ""
              }`}
            >
              <UserProfileAside updateSm={updateSm} sm={sm} />
            </div>
            <div className="card-inner card-inner-lg">
              {sm && mobileView && <div className="toggle-overlay" onClick={() => updateSm(!sm)}></div>}
              <BlockHead size="lg">
                <BlockBetween>
                  <BlockHeadContent>
                    <BlockTitle tag="h4">Referral Bonus</BlockTitle>
                    <BlockDes>
                      <p>Details associated with BillPadi Referral Bonus.</p>
                    </BlockDes>
                  </BlockHeadContent>
                  <BlockHeadContent className="align-self-start d-lg-none">
                    <Button
                      className={`toggle btn btn-icon btn-trigger mt-n1 ${sm ? "active" : ""}`}
                      onClick={() => updateSm(!sm)}
                    >
                      <Icon name="menu-alt-r"></Icon>
                    </Button>
                  </BlockHeadContent>
                </BlockBetween>
              </BlockHead>

              <Block>
                <div className="nk-data data-list">
                  <div className="data-head">
                    <BlockBetween>
                      <h6 className="overline-title mb-0">BillPadi Bonuses</h6>
                      {/* <div onClick={() => setModal(true)}>
                        <a href="#edit" onClick={(e) => e.preventDefault()} className="text-primary">
                          Edit
                        </a>
                      </div> */}
                    </BlockBetween>
                  </div>

                  {data?.data?.map((item, index) => (
                    <div key={index} className="data-item" onClick={() => onEditClick(item.id)}>
                      <div className="data-col">
                        <span className="data-label fw-bold ccap">
                          {item?.user_type}
                          <br />
                          <span className="fw-normal" style={{ fontSize: "14px" }}>
                            Threshold: {item?.threshold?.toLocaleString()}
                          </span>
                        </span>
                        {item?.type === "flat" ? (
                          <span className="data-value">{formatter("NGN").format(item?.value)}</span>
                        ) : (
                          <span className="data-value">{item?.value}%</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Block>

              <Modal isOpen={modal} className="modal-dialog-centered" size="lg" toggle={() => setModal(false)}>
                <a
                  href="#dropdownitem"
                  onClick={(ev) => {
                    ev.preventDefault();
                    setModal(false);
                  }}
                  className="close"
                >
                  <Icon name="cross-sm"></Icon>
                </a>
                <ModalBody>
                  <div className="p-2">
                    <h5 className="title">
                      Update <span className="ccap">{formData?.name} </span>Bonus
                    </h5>
                    <div className="tab-content mt-4">
                      <div className={`tab-pane ${modalTab === "1" ? "active" : ""}`} id="personal">
                        <form onSubmit={submitForm}>
                          <Row className="gy-4">
                            <Col md="6">
                              <div className="form-group">
                                <label className="form-label" htmlFor="value">
                                  Value
                                </label>
                                <input
                                  id="value"
                                  className="form-control"
                                  name="value"
                                  defaultValue={formData.value}
                                  placeholder="Enter Service Value"
                                  pattern="[0-9]*[.,]?[0-9]*"
                                  type="text"
                                  inputmode="decimal"
                                />
                              </div>
                            </Col>
                            <Col md="6">
                              <div className="form-group">
                                <label className="form-label" htmlFor="full-name">
                                  Type
                                </label>
                                <RSelect
                                  options={[
                                    { label: "Flat", value: "flat" },
                                    { label: "Percentage", value: "percentage" },
                                  ]}
                                  value={{
                                    label: formData.type.charAt(0).toUpperCase() + formData.type.slice(1),
                                    value: formData.type,
                                  }}
                                  onChange={(e) => setFormData({ ...formData, type: e.value })}
                                  placeholder="Select Type"
                                  isSearchable={false}
                                />
                              </div>
                            </Col>
                            <Col md="6">
                              <div className="form-group">
                                <label className="form-label" htmlFor="threshold">
                                  Threshold
                                </label>
                                <input
                                  id="threshold"
                                  className="form-control"
                                  name="threshold"
                                  defaultValue={formData.threshold}
                                  placeholder="Enter Threshold Value"
                                  pattern="[0-9]*[.,]?[0-9]*"
                                  type="text"
                                  inputmode="decimal"
                                />
                              </div>
                            </Col>

                            <Col size="12">
                              <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                                <li>
                                  <Button type="submit" color="primary" size="lg">
                                    Update
                                  </Button>
                                </li>
                                <li>
                                  <a
                                    href="#dropdownitem"
                                    onClick={(ev) => {
                                      ev.preventDefault();
                                      setModal(false);
                                    }}
                                    className="link link-light"
                                  >
                                    Cancel
                                  </a>
                                </li>
                              </ul>
                            </Col>
                          </Row>
                        </form>
                      </div>
                    </div>
                  </div>
                </ModalBody>
              </Modal>
            </div>
          </div>
        </Card>
      </Content>
    </React.Fragment>
  );
};

export default ReferralBonusPage;
