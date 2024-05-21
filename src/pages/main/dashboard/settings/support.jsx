import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Card, Modal, ModalBody } from "reactstrap";
import {
  useCreateAppVersion,
  useEditAppVersion,
  useEditSupport,
  useGetAppVersion,
  useGetSupport,
} from "../../../../api/settings";
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
import UserProfileAside from "./UserProfileAside";
import LoadingSpinner from "../../../components/spinner";
const SupportPage = () => {
  const [sm, updateSm] = useState(false);
  const [mobileView, setMobileView] = useState(false);
  const [editedId, setEditId] = useState();
  const { data, isLoading } = useGetSupport();
  const { mutate: createAppVersion } = useCreateAppVersion();
  const { mutate: editAppVersion } = useEditSupport(editedId);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const [formData, setFormData] = useState({
    title: "",
    value: "",
  });

  const onEditClick = (id) => {
    data?.data?.forEach((item) => {
      if (item.id === id) {
        setFormData({
          title: item.name,
          value: item.value,
        });
      }
    });
  };
  // console.log(data);

  const [modalTab, setModalTab] = useState("1");
  const [modal, setModal] = useState(false);

  const [forceUpdate, setForceUpdate] = useState(false);

  const onFormSubmit = (data) => {
    const dataToSend = { value: data.value };
    editAppVersion(dataToSend);

    setModal(false);
    closeModal();
  };

  const closeModal = () => {
    setModal(false);
    reset({ title: "", value: "" });
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

  const android = useMemo(() => {
    if (data) {
      return data?.data?.find((item) => item.platform === "android");
    } else {
      return null;
    }
  }, [data]);

  const ios = useMemo(() => {
    if (data) {
      return data?.data?.find((item) => item.platform === "ios");
    } else {
      return null;
    }
  }, [data]);

  // console.log(android?.is_required);

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

  useEffect(() => {
    if (formData) {
      reset(formData);
    }
  }, [formData]);

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
                    <BlockTitle tag="h4">Support</BlockTitle>
                    <BlockDes>
                      <p>Details associated with BillPadi Support.</p>
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
                      <h6 className="overline-title mb-0">App Version and Support</h6>
                    </BlockBetween>
                  </div>

                  {isLoading ? (
                    <LoadingSpinner />
                  ) : (
                    <>
                      {data?.data?.map((item) => (
                        <div
                          className="data-item"
                          onClick={() => {
                            setEditId(item?.id);
                            onEditClick(item?.id);
                            setModal(true);
                          }}
                        >
                          <div className="data-col">
                            <span className="data-label">{item?.name}</span>
                            <span className="data-value">{item?.value}</span>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
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
                    <h5 className="title">Update {formData.title}</h5>
                    <form onSubmit={handleSubmit(onFormSubmit)}>
                      <Row className="g-3">
                        <Col md="12">
                          <div className="form-group">
                            <label className="form-label" htmlFor="customer">
                              Value
                            </label>
                            <div className="form-control-wrap">
                              <input
                                type="text"
                                className="form-control"
                                defaultValue={formData.value}
                                {...register("value", {
                                  required: "This field is required",
                                })}
                              />
                              {errors.value && <span className="invalid">{errors.value.message}</span>}
                            </div>
                          </div>
                        </Col>
                        <Col size="12">
                          <Button color="primary" type="submit">
                            <Icon className="plus"></Icon>
                            <span>Update {formData.title}</span>
                          </Button>
                        </Col>
                      </Row>
                    </form>
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

export default SupportPage;
