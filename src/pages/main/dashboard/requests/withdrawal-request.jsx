import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  Badge,
  Card,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Modal,
  ModalBody,
  UncontrolledDropdown,
} from "reactstrap";
import { useGetWithdrawalTransactions } from "../../../../api/transactions";
import {
  Block,
  Button,
  Col,
  DataTableBody,
  DataTableHead,
  DataTableItem,
  DataTableRow,
  Icon,
  PaginationComponent,
  BlockHeadContent,
  BlockTitle,
  Row,
  BlockHead,
  BlockBetween,
} from "../../../../components/Component";
import { formatDateWithTime, formatter } from "../../../../utils/Utils";
import LoadingSpinner from "../../../components/spinner";
import Search from "../tables/Search";
import SortToolTip from "../tables/SortTooltip";
import { FilterOptions } from "../tables/filter-select";
import {
  useAuthorizeWithdrawalRequest,
  useGetDepositRequest,
  useGetWithdrawalRequest,
  useInitiateWithdrawalRequest,
  useUpdateDepositRequestStatus,
  useUpdateWithdrawalRequestStatus,
} from "../../../../api/requests";
import { RequestsStatsCard } from "./stats-card";
import Content from "../../../../layout/content/Content";
import Head from "../../../../layout/head/Head";
import ImageContainer from "../../../../components/partials/gallery/GalleryImage";
import OTPModal from "./otp-modal";

const WithdrawalRequest = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [editedId, setEditedId] = useState(null);
  const [updatedStatus, setUpdatedStatus] = useState();
  const [provider, setProvider] = useState();

  const itemsPerPage = searchParams.get("limit") ?? 100;
  const currentPage = searchParams.get("page") ?? 1;
  const search = searchParams.get("search") ?? "";
  const status = searchParams.get("status") ?? "";

  //   const type = searchParams.get("type") ?? undefined;
  // const { isLoading, data, error } = useGetAllProducts(currentPage, itemsPerPage, search, type);
  // const { isLoading, data, error } = useGetWithdrawalTransactions(
  //   currentPage,
  //   itemsPerPage,
  //   status,
  //   search,
  //   type,
  //   userId
  // );
  const { isLoading, data, error } = useGetWithdrawalRequest(currentPage, itemsPerPage, search, status);
  // console.log(data);
  // console.log(data?.stat);
  const { mutate: updateStatus } = useUpdateWithdrawalRequestStatus(editedId, updatedStatus);
  const { mutate: initiateRequest } = useInitiateWithdrawalRequest(editedId, provider);
  const { mutate: authorizeRequest } = useAuthorizeWithdrawalRequest(editedId, provider);

  const [formData, setFormData] = useState({
    reference: "",
    amount: "",
    type: "",
    provider: "",
    remark: "",
    status: "",
    fee: "",
    accountName: "",
    accountNumber: "",
    bank: "",
    fullName: "",
    email: "",
    phone: "",
    totalAmount: "",
    receiverName: "",
    receiverPhone: "",
    receiverEmail: "",
    purpose: "",
    bank_name: "",
    account_number: "",
    account_name: "",
  });
  const [view, setView] = useState({
    edit: false,
    add: false,
    details: false,
    otp: false,
  });
  const [onSearch, setonSearch] = useState(false);
  const [filters, setfilters] = useState({});
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // function to close the form modal
  const onFormCancel = () => {
    setView({ edit: false, add: false, details: false, otp: false });
    setTimeout(() => {
      resetForm();
    }, 500);
  };

  const resetForm = () => {
    setFormData({
      reference: "",
      amount: "",
      type: "",
      provider: "",
      remark: "",
      status: "",
      fee: "",
      accountName: "",
      accountNumber: "",
      bank: "",
      fullName: "",
      email: "",
      phone: "",
      totalAmount: "",
      receiverName: "",
      receiverPhone: "",
      receiverEmail: "",
      purpose: "",
      bank_name: "",
      account_number: "",
      account_name: "",
    });
    reset({});
  };

  // function that loads the want to editted data
  const onEditClick = (id) => {
    data?.data?.forEach((item) => {
      if (item.id === id) {
        setFormData({
          reference: item?.reference,
          amount: item?.amount,
          type: item?.type,
          provider: item?.provider,
          remark: item?.remark,
          status: item?.status,
          purpose: item?.purpose,
          fee: item?.fee,
          receiverName: `${item?.meta?.firstname} ${item?.meta?.lastname}`,
          receiverPhone: `${item?.meta?.phone_code}${item?.meta?.phone}`,
          receiverEmail: item?.meta?.email,
          bank: item?.meta?.bank_name,
          fullName: `${item?.user?.firstname} ${item?.user?.lastname}`,
          email: item?.user?.email,
          phone: `${item?.user?.phone_code}${item?.user?.phone}`,
          totalAmount: item?.total_amount,
          bank_name: item?.bank_name,
          account_number: item?.account_number,
          account_name: item?.account_name,
        });
      }
    });
    setEditedId(id);
    setView({ add: false, edit: true });
  };

  // function to filter data
  const filterData = useCallback(() => {
    return;
  }, []);

  // toggle function to view product details
  const toggle = (type) => {
    setView({
      edit: type === "edit" ? true : false,
      add: type === "add" ? true : false,
      details: type === "details" ? true : false,
      otp: type === "otp" ? true : false,
    });
  };

  // Change Page
  //paginate
  const paginate = (pageNumber) => {
    setSearchParams((searchParams) => {
      searchParams.set("page", pageNumber);
      return searchParams;
    });
  };

  const authorize = (data) => {
    authorizeRequest(data);
    onFormCancel();
  };

  const statusColor = useCallback((status) => {
    if (status === "pending" || status === "transfer-initiated" || status === "transfer-authorization-initiated") {
      return "warning";
    } else if (status === "approved" || status === "transfer-completed") {
      return "success";
    } else {
      return "danger";
    }
  }, []);

  useEffect(() => {
    reset(formData);
  }, [formData, reset]);

  //scroll off when sidebar shows
  useEffect(() => {
    view.add ? document.body.classList.add("toggle-shown") : document.body.classList.remove("toggle-shown");
  }, [view.add]);
  return (
    <>
      <React.Fragment>
        <Head title="Deposit requests"></Head>
        <Content>
          <BlockHead size="sm">
            <BlockBetween>
              <BlockHeadContent>
                <BlockTitle>Withdrawal Requests</BlockTitle>
              </BlockHeadContent>
            </BlockBetween>
          </BlockHead>

          <Row className="mb-5">
            <Col>
              <RequestsStatsCard data={data?.stat} />
            </Col>
          </Row>
          <Block>
            <Card>
              <div className="card-inner border-bottom">
                <div className="card-title-group">
                  <div className="card-title">
                    <h5 className="title">Transactions</h5>
                  </div>
                  <div className="card-tools me-n1">
                    <ul className="btn-toolbar gx-1">
                      <li>
                        <Button
                          href="#search"
                          onClick={(ev) => {
                            ev.preventDefault();
                            setonSearch(true);
                          }}
                          className="btn-icon search-toggle toggle-search"
                        >
                          <Icon name="search"></Icon>
                        </Button>
                      </li>
                      <li className="btn-toolbar-sep"></li>
                      <li>
                        <FilterOptions options={[]} />
                      </li>
                      <li>
                        <UncontrolledDropdown>
                          <DropdownToggle tag="a" className="btn btn-trigger btn-icon dropdown-toggle">
                            <Icon name="setting"></Icon>
                          </DropdownToggle>
                          <DropdownMenu end className="dropdown-menu-xs">
                            <SortToolTip />
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </li>
                    </ul>
                  </div>
                  {/* Search component */}
                  <Search onSearch={onSearch} setonSearch={setonSearch} placeholder="reference number" />
                </div>
              </div>
              <div className="card-inner-group">
                <div className="card-inner p-0">
                  {isLoading ? (
                    <LoadingSpinner />
                  ) : data?.meta?.total > 0 ? (
                    <>
                      <DataTableBody className="is-compact">
                        <DataTableHead className="tb-tnx-head bg-white fw-bold text-secondary">
                          <DataTableRow>
                            <span className="tb-tnx-head bg-white text-secondary">S/N</span>
                          </DataTableRow>
                          <DataTableRow size="sm">
                            <span className="tb-tnx-head bg-white text-secondary">Fullname</span>
                          </DataTableRow>
                          <DataTableRow>
                            <span className="tb-tnx-head bg-white text-secondary">provider</span>
                          </DataTableRow>
                          <DataTableRow>
                            <span className="tb-tnx-head bg-white text-secondary">Amount</span>
                          </DataTableRow>

                          <DataTableRow>
                            <span className="tb-tnx-head bg-white text-secondary">Proof</span>
                          </DataTableRow>
                          <DataTableRow>
                            <span className="tb-tnx-head bg-white text-secondary">Date</span>
                          </DataTableRow>
                          <DataTableRow>
                            <span className="tb-tnx-head bg-white text-secondary">Status</span>
                          </DataTableRow>

                          <DataTableRow className="nk-tb-col-tools">
                            <ul className="nk-tb-actions gx-1 my-n1">
                              <li className="me-n1">
                                <UncontrolledDropdown>
                                  <DropdownToggle
                                    tag="a"
                                    href="#toggle"
                                    onClick={(ev) => ev.preventDefault()}
                                    className="dropdown-toggle btn btn-icon btn-trigger disabled"
                                  >
                                    <Icon name="more-h"></Icon>
                                  </DropdownToggle>
                                </UncontrolledDropdown>
                              </li>
                            </ul>
                          </DataTableRow>
                        </DataTableHead>
                        {data?.data?.map((item, index) => {
                          return (
                            <DataTableItem key={item.id} className="text-secondary">
                              <DataTableRow>
                                <span className="text-capitalize"> {index + 1}</span>
                              </DataTableRow>
                              <DataTableRow size="sm" className="text-primary fw-bold">
                                <Link to={`/user-details/${item?.user?.id}`} className="title">
                                  {item?.user?.firstname} {item?.user?.lastname}
                                </Link>
                              </DataTableRow>

                              <DataTableRow>
                                <span>{item?.provider}</span>
                              </DataTableRow>

                              <DataTableRow>
                                <span>{formatter("NGN").format(item?.amount)}</span>
                              </DataTableRow>

                              <DataTableRow>
                                {item?.proof ? <ImageContainer img={item.proof} sm /> : <span>Nil</span>}
                              </DataTableRow>

                              <DataTableRow>
                                <span>{formatDateWithTime(item.created_at)}</span>
                              </DataTableRow>
                              <DataTableRow>
                                <span className={`dot bg-${statusColor(item.status)} d-sm-none`}></span>
                                <Badge
                                  className="badge-sm badge-dot has-bg d-none d-sm-inline-flex"
                                  color={statusColor(item.status)}
                                >
                                  <span className="ccap">{item.status}</span>
                                </Badge>
                              </DataTableRow>
                              <DataTableRow className="nk-tb-col-tools">
                                <ul className="nk-tb-actions gx-1 my-n1">
                                  <li className="me-n1">
                                    <UncontrolledDropdown>
                                      <DropdownToggle
                                        tag="a"
                                        href="#more"
                                        onClick={(ev) => ev.preventDefault()}
                                        className="dropdown-toggle btn btn-icon btn-trigger"
                                      >
                                        <Icon name="more-h"></Icon>
                                      </DropdownToggle>
                                      <DropdownMenu end>
                                        <ul className="link-list-opt no-bdr">
                                          <li>
                                            <DropdownItem
                                              tag="a"
                                              href="#edit"
                                              onClick={(ev) => {
                                                ev.preventDefault();
                                                // navigate(`/giftcards-details/${item.id}`);
                                                onEditClick(item.id);
                                                toggle("details");
                                              }}
                                            >
                                              <Icon name="eye"></Icon>
                                              <span>View</span>
                                            </DropdownItem>
                                          </li>
                                          {/* {item.status === "pending" && (
                                            <>
                                              <li>
                                                <DropdownItem
                                                  tag="a"
                                                  href="#edit"
                                                  onClick={(ev) => {
                                                    ev.preventDefault();
                                                    onEditClick(item.id);
                                                    setEditedId(item.id);
                                                  }}
                                                >
                                                  <Icon name="check"></Icon>
                                                  <span>Approve</span>
                                                </DropdownItem>
                                              </li>
                                              <li>
                                                <DropdownItem
                                                  tag="a"
                                                  href="#edit"
                                                  onClick={(ev) => {
                                                    ev.preventDefault();
                                                    onEditClick(item.id);
                                                    setEditedId(item.id);
                                                    setProvider("monnify");
                                                    initiateRequest();
                                                  }}
                                                >
                                                  <Icon name="arrow-to-right"></Icon>
                                                  <span>Initiate Transfer</span>
                                                </DropdownItem>
                                              </li>
                                              <li>
                                                <DropdownItem
                                                  tag="a"
                                                  href="#edit"
                                                  onClick={(ev) => {
                                                    ev.preventDefault();
                                                    onEditClick(item.id);
                                                    setEditedId(item.id);
                                                    setUpdatedStatus("declined");
                                                    updateStatus();
                                                  }}
                                                >
                                                  <Icon name="cross"></Icon>
                                                  <span>Decline</span>
                                                </DropdownItem>
                                              </li>
                                            </>
                                          )} */}
                                          {item.status === "pending" ||
                                            (item.status === "transfer-authorization-failed" && (
                                              <li>
                                                <DropdownItem
                                                  tag="a"
                                                  href="#edit"
                                                  onClick={(ev) => {
                                                    ev.preventDefault();
                                                    onEditClick(item.id);
                                                    setEditedId(item.id);
                                                    setProvider("monnify");
                                                    initiateRequest();
                                                    // setUpdatedStatus("approved");
                                                    // updateStatus();

                                                    // toggle("details");
                                                  }}
                                                >
                                                  <Icon name="arrow-to-right"></Icon>
                                                  <span>Initiate Transfer</span>
                                                </DropdownItem>
                                              </li>
                                            ))}
                                          {item.status === "transfer-initiated" && (
                                            <>
                                              <li>
                                                <DropdownItem
                                                  tag="a"
                                                  href="#edit"
                                                  onClick={(ev) => {
                                                    ev.preventDefault();
                                                    onEditClick(item.id);
                                                    setEditedId(item.id);
                                                    setProvider("monnify");
                                                    toggle("otp");
                                                    // setUpdatedStatus("approved");
                                                    // updateStatus();

                                                    // toggle("details");
                                                  }}
                                                >
                                                  <Icon name="arrow-to-right"></Icon>
                                                  <span>Authorize Transfer</span>
                                                </DropdownItem>
                                              </li>
                                            </>
                                          )}
                                        </ul>
                                      </DropdownMenu>
                                    </UncontrolledDropdown>
                                  </li>
                                </ul>
                              </DataTableRow>
                            </DataTableItem>
                          );
                        })}
                      </DataTableBody>
                      <div className="card-inner">
                        {data?.meta?.total > 0 && (
                          <PaginationComponent
                            itemPerPage={itemsPerPage}
                            totalItems={data?.meta?.total}
                            paginate={paginate}
                            currentPage={Number(currentPage)}
                          />
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="text-center" style={{ paddingBlock: "1rem" }}>
                      <span className="text-silent">No tranaction record found</span>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </Block>
        </Content>

        <Modal isOpen={view.details} toggle={() => onFormCancel()} className="modal-dialog-centered" size="lg">
          <ModalBody>
            <a href="#cancel" className="close">
              {" "}
              <Icon
                name="cross-sm"
                onClick={(ev) => {
                  ev.preventDefault();
                  onFormCancel();
                }}
              ></Icon>
            </a>
            <div className="nk-modal-head">
              <h4 className="nk-modal-title title">Transaction Details</h4>
            </div>
            <div className="nk-tnx-details mt-sm-3">
              <Row className="gy-2">
                <Col lg={4}>
                  <span className="sub-text">Transaction Reference</span>
                  <span className="caption-text">{formData.reference}</span>
                </Col>
                <Col lg={4}>
                  <span className="sub-text">Status</span>
                  <span className="caption-text">
                    <Badge className="badge-sm badge-dot has-bg d-inline-flex" color={statusColor(formData.status)}>
                      <span className="ccap">{formData.status}</span>
                    </Badge>
                  </span>
                </Col>
                {/* <Col lg={4}>
                  <span className="sub-text">Type</span>
                  <span className="caption-text">{formData.type}</span>
                </Col> */}
                <Col lg={4}>
                  <span className="sub-text">Amount</span>
                  <span className="caption-text">{formatter("NGN").format(formData.amount)}</span>
                </Col>

                {/* <Col lg={4}>
                  <span className="sub-text">Total Amount</span>
                  <span className="caption-text">{formatter("NGN").format(formData.totalAmount)}</span>
                </Col> */}

                {/* <Col lg={4}>
                  <span className="sub-text">Fee</span>
                  <span className="caption-text">{formatter("NGN").format(formData.fee)}</span>
                </Col> */}
                <Col>
                  <span className="sub-text">Remark</span>
                  <span className="caption-text ccap">{formData.remark}</span>
                </Col>
                <Col lg={4}>
                  <span className="sub-text">Provider</span>
                  <span className="caption-text ccap">{formData.provider}</span>
                </Col>

                <Row className="mt-2">
                  <h6>Bank Details</h6>
                  <Col lg={4}>
                    <span className="sub-text">Bank Name</span>
                    <span className="caption-text">{formData.bank_name}</span>
                  </Col>
                  <Col lg={4}>
                    <span className="sub-text">Account Number</span>
                    <span className="caption-text">{formData.account_number}</span>
                  </Col>
                  <Col lg={4}>
                    <span className="sub-text">Account Name</span>
                    <span className="caption-text">{formData.account_name}</span>
                  </Col>
                </Row>

                <Row className="mt-2">
                  <h6>{"User"}</h6>
                  <Col lg={4}>
                    <span className="sub-text">Fullname</span>
                    <span className="caption-text">{formData.fullName}</span>
                  </Col>
                  <Col lg={4}>
                    <span className="sub-text">Email</span>
                    <span className="caption-text">{formData.email}</span>
                  </Col>
                  <Col lg={4}>
                    <span className="sub-text">Phone</span>
                    <span className="caption-text">{formData.phone}</span>
                  </Col>
                </Row>
                {/* {formData?.purpose === "transfer" && (
                  <Row className="mt-2">
                    <h6>Receiver</h6>
                    <Col lg={4}>
                      <span className="sub-text">Fullname</span>
                      <span className="caption-text">{formData?.receiverName}</span>
                    </Col>
                    <Col lg={4}>
                      <span className="sub-text">Email</span>
                      <span className="caption-text">{formData?.receiverEmail}</span>
                    </Col>
                    <Col lg={4}>
                      <span className="sub-text">Phone</span>
                      <span className="caption-text">{formData.receiverPhone}</span>
                    </Col>
                  </Row>
                )} */}

                {/* 
                <h6>Bank</h6>
                <Col lg={6}>
                  <span className="sub-text">Account Name</span>
                  <span className="caption-text">{formData.accountName}</span>
                </Col>
                <Col lg={6}>
                  <span className="sub-text">Account Number</span>
                  <span className="caption-text">{formData.accountNumber}</span>
                </Col>
                <Col lg={6}>
                  <span className="sub-text">Bank</span>
                  <span className="caption-text"> {formData.bank}</span>
                </Col> */}
                <Col size="12" className="mt-5">
                  <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                    {formData.status === "pending" && (
                      <>
                        <li>
                          <Button
                            color="primary"
                            size="md"
                            onClick={() => {
                              setUpdatedStatus("approved");
                              updateStatus();
                            }}
                          >
                            Approve via Bank Transfer
                          </Button>
                        </li>
                        <li>
                          <Button
                            color="secondary"
                            size="md"
                            onClick={() => {
                              setProvider("monnify");
                              initiateRequest();
                            }}
                          >
                            Initiate Transfer
                          </Button>
                        </li>
                        <li>
                          <Button color="danger" size="md" type="submit">
                            Decline
                          </Button>
                        </li>
                      </>
                    )}
                    {/* <li>
                      <a
                        href="#cancel"
                        onClick={(ev) => {
                          ev.preventDefault();
                          close();
                        }}
                        className="link link-light"
                      >
                        Cancel
                      </a>
                    </li> */}
                  </ul>
                </Col>
              </Row>
            </div>
          </ModalBody>
        </Modal>

        <OTPModal view={view} onFormCancel={onFormCancel} onFormSubmit={authorize} />
      </React.Fragment>
    </>
  );
};

export default WithdrawalRequest;
