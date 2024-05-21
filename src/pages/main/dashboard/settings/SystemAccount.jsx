import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Card, Modal, ModalBody } from "reactstrap";
import { useCreateAppVersion, useEditAppVersion, useGetAppVersion } from "../../../../api/settings";
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
import LoadingSpinner from "../../../components/spinner";
import {
  useGetSystemAccount,
  useVerifyAccount,
  useDeletesystemAccount,
  useCreateSystemAccount,
} from "../../../../api/system-bank-account";
import { useGetBanks } from "../../../../api/generics";
const SystemAccountPage = () => {
  const [sm, updateSm] = useState(false);
  const [mobileView, setMobileView] = useState(false);
  const [editedId, setEditId] = useState();
  const { isLoading, data } = useGetSystemAccount(1, 7);
  const { mutate: addAccount, isLoading: creating } = useCreateSystemAccount();
  const { mutate: deleteAccount } = useDeletesystemAccount(editedId);
  const { data: banks } = useGetBanks();
  // console.log(banks);

  //   console.log(data);

  const bankOptions = useMemo(() => {
    if (banks) {
      return banks?.data?.map((item) => ({ code: item.id, label: item.name, value: item.name }));
    } else return [];
  }, [banks]);
  // console.log(bankOptions)

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const [formData, setFormData] = useState({
    bank_name: "",
    bank_code: "",
    account_name: "",
    account_number: "",
    type: "",
    status: "",
    created_at: "",
  });

  const { mutate: verify, isLoading: verifying } = useVerifyAccount(formData, setFormData);

  const onEditClick = (id) => {
    data?.data?.forEach((item) => {
      if (item.id === id) {
        setFormData({
          bank_name: item.bank_name,
          bank_code: item.bank_code,
          account_name: item.account_name,
          account_number: item.account_number,
          type: item.type,
          status: item.status,
          created_at: item.created_at,
        });
      }
    });
    setEditId(id);
  };

  // resets forms
  const resetForm = () => {
    setFormData({
      bank_name: "",
      bank_code: "",
      account_name: "",
      account_number: "",
      type: "",
      status: "",
      created_at: "",
    });
    setModal(false);
  };

  // console.log(data);

  const [modalTab, setModalTab] = useState("1");
  const [modal, setModal] = useState(false);

  const [forceUpdate, setForceUpdate] = useState(false);

  const onFormSubmit = (form) => {
    // console.log(form);
    let submittedData = {
      bank_id: form.bank_code,
      account_name: form.account_name,
      account_number: form.account_number,
    };
    // console.log(submittedData);
    if (formData.account_name) {
      addAccount(submittedData);
      resetForm();
    } else {
      verify({
        bank_id: form.bank_code,
        account_number: form.account_number,
      });
    }
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
                    <BlockTitle tag="h4">System Bank Account</BlockTitle>
                    <BlockDes>
                      <p>Account Details associated with BillPadi.</p>
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
                      <h6 className="overline-title mb-0">Account Details</h6>
                      {data?.data?.length > 0 ? (
                        <div>
                          <a
                            href="#edit"
                            onClick={() => {
                              setEditId(data?.data[0].id);
                              deleteAccount();
                            }}
                            className="text-primary"
                          >
                            Delete
                          </a>
                        </div>
                      ) : (
                        <div onClick={() => setModal(true)}>
                          <a href="#edit" onClick={(e) => e.preventDefault()} className="text-primary">
                            Add
                          </a>
                        </div>
                      )}
                    </BlockBetween>
                  </div>

                  {isLoading ? (
                    <LoadingSpinner />
                  ) : (
                    <>
                      {data?.data?.map((item) => (
                        <div key={item?.id}>
                          <div
                            className="data-item"
                            onClick={() => {
                              setEditId(item?.id);
                            }}
                          >
                            <div className="data-col">
                              <span className="data-label">Bank Name</span>
                              <span className="data-value">{item?.bank_name}</span>
                            </div>
                          </div>
                          <div className="data-item">
                            <div className="data-col">
                              <span className="data-label">Bank Code</span>
                              <span className="data-value">{item?.bank_code}</span>
                            </div>
                          </div>{" "}
                          <div className="data-item">
                            <div className="data-col">
                              <span className="data-label">Account Number</span>
                              <span className="data-value">{item?.account_number}</span>
                            </div>
                          </div>
                          <div className="data-item">
                            <div className="data-col">
                              <span className="data-label">Account Name</span>
                              <span className="data-value">{item?.account_name}</span>
                            </div>
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
                            <label className="form-label" htmlFor="bank_code">
                              Banks
                            </label>
                            <div className="form-control-wrap">
                              <RSelect
                                options={bankOptions}
                                onChange={(e) => setFormData({ ...formData, bank_code: e.code })}
                              />

                              {errors.bank_code && <span className="invalid">{errors.bank_code.message}</span>}
                            </div>
                          </div>
                        </Col>

                        <Col md="12">
                          <div className="form-group">
                            <label className="form-label" htmlFor="account_number">
                              Account Number
                            </label>
                            <div className="form-control-wrap">
                              <input
                                type="number"
                                className="form-control"
                                {...register("account_number", {
                                  required: "This field is required",
                                })}
                                onChange={(e) => setFormData({ ...formData, account_number: e.target.value })}
                                value={formData.account_number}
                              />
                              {errors.account_number && (
                                <span className="invalid">{errors.account_number.message}</span>
                              )}
                            </div>
                          </div>
                        </Col>

                        <Col md="12">
                          <div className="form-group">
                            <label className="form-label" htmlFor="account_name">
                              Account Name
                            </label>
                            <div className="form-control-wrap">
                              <input
                                type="text"
                                className="form-control"
                                {...register("account_name")}
                                onChange={(e) => setFormData({ ...formData, account_name: e.target.value })}
                                value={formData.account_name}
                                disabled
                              />
                              {errors.account_name && <span className="invalid">{errors.account_name.message}</span>}
                            </div>
                          </div>
                        </Col>

                        <Col size="12">
                          <Button color="primary" type="submit" disabled={creating || verifying}>
                            <Icon className="plus"></Icon>
                            <span>{formData.account_name ? "Add" : "Verify"} Account</span>
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

export default SystemAccountPage;
