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
import {
  useGetWithdrawalTransactions,
  useUpdateWalletDepositAmount,
  useUpdateWithdrawalWalletStatus,
} from "../../../../api/transactions";
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
  Row,
} from "../../../../components/Component";
import ImageContainer from "../../../../components/partials/gallery/GalleryImage";
import { formatDateWithTime, formatter, tableNumbers, truncateText } from "../../../../utils/Utils";
import LoadingSpinner from "../../../components/spinner";
import EditModal from "../requests/edit-modal";
import { FilterOptions } from "../tables/filter-select";
import Search from "../tables/Search";
import SortToolTip from "../tables/SortTooltip";
import { WalletFilterOptions } from "./data";
import { WalletStatsCard } from "./stats-card";
import { WalletAmountStatsCard } from "../giftcards/stats-card";

const WithdrawalTable = ({ type, userId, showStats }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [editedId, setEditedId] = useState(null);
  const [updatedStatus, setUpdatedStatus] = useState();

  const itemsPerPage = searchParams.get("limit") ?? 100;
  const currentPage = searchParams.get("page") ?? 1;
  const search = searchParams.get("search") ?? "";
  const status = searchParams.get("status") ?? "";

  //   const type = searchParams.get("type") ?? undefined;
  // const { isLoading, data, error } = useGetAllProducts(currentPage, itemsPerPage, search, type);
  const { isLoading, data, error } = useGetWithdrawalTransactions(
    currentPage,
    itemsPerPage,
    status,
    search,
    type,
    userId
  );
  // console.log(data);
  // console.log(data?.stat);
  const { mutate: updateAmount } = useUpdateWalletDepositAmount(editedId);
  const { mutate: updateStatus } = useUpdateWithdrawalWalletStatus(editedId, updatedStatus);

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
    discount: "",
    proof: "",
    balanceBefore: "",
    balanceAfter: "",
  });
  const [view, setView] = useState({
    edit: false,
    add: false,
    details: false,
    amount: false,
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
    setView({ edit: false, add: false, details: false, amount: false });
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
      discount: "",
      proof: "",
      balanceBefore: "",
      balanceAfter: "",
    });
    reset({});
  };
  // console.log(formData);
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
          accountName: item?.meta?.account_name,
          accountNumber: item?.meta?.account_number,
          fullName: `${item?.user?.firstname} ${item?.user?.lastname}`,
          email: item?.user?.email,
          phone: `${item?.user?.phone_code}${item?.user?.phone}`,
          totalAmount: item?.total_amount,
          discount: item?.discount,
          proof: item?.proof,
          balanceBefore: item?.balance_before,
          balanceAfter: item?.balance_after,
        });
      }
    });
    setEditedId(id);
    // setView({ add: false, edit: true });
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
      amount: type === "amount" ? true : false,
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

  const statusColor = useCallback((status) => {
    if (status === "pending") {
      return "warning";
    } else if (status === "successful") {
      return "success";
    } else {
      return "danger";
    }
  }, []);

  // const start = (currentPage - 1) * itemsPerPage;

  useEffect(() => {
    reset(formData);
  }, [formData, reset]);

  //scroll off when sidebar shows
  useEffect(() => {
    view.add ? document.body.classList.add("toggle-shown") : document.body.classList.remove("toggle-shown");
  }, [view.add]);
  return (
    <>
      {(type || showStats) && (
        <Row className="mb-5">
          <Col lg={4}>
            <WalletAmountStatsCard data={0} />
          </Col>
          <Col lg={8}>
            <WalletStatsCard data={data?.stat[type]} />
          </Col>
        </Row>
      )}
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
                    <FilterOptions options={WalletFilterOptions} />
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
                      <DataTableRow size="sm">
                        <span className="tb-tnx-head bg-white text-secondary">S/N</span>
                      </DataTableRow>
                      <DataTableRow>
                        <span className="tb-tnx-head bg-white text-secondary">
                          {type === "transfer" ? "Sender" : "Fullname"}
                        </span>
                      </DataTableRow>
                      {type === "transfer" && (
                        <DataTableRow size="sm">
                          <span className="tb-tnx-head bg-white text-secondary">Receiver</span>
                        </DataTableRow>
                      )}
                      <DataTableRow size="sm">
                        <span className="tb-tnx-head bg-white text-secondary">Provider</span>
                      </DataTableRow>
                      <DataTableRow size="sm">
                        <span className="tb-tnx-head bg-white text-secondary">Amount</span>
                      </DataTableRow>
                      <DataTableRow>
                        <span className="tb-tnx-head bg-white text-secondary">Total Amount</span>
                      </DataTableRow>
                      {/* <DataTableRow>
                        <span className="tb-tnx-head bg-white text-secondary">Balance Before</span>
                      </DataTableRow> */}
                      <DataTableRow size="sm">
                        <span className="tb-tnx-head bg-white text-secondary">Balance After</span>
                      </DataTableRow>
                      <DataTableRow size="md">
                        <span className="tb-tnx-head bg-white text-secondary">Purpose</span>
                      </DataTableRow>
                      <DataTableRow size="sm">
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
                          <DataTableRow size="sm">
                            <span className="text-capitalize">
                              {tableNumbers(currentPage, itemsPerPage) + index + 1}
                            </span>
                          </DataTableRow>
                          <DataTableRow className="text-primary fw-bold ccap">
                            <Link to={`/user-details/${item?.user?.id}`} className="title">
                              {truncateText(`${item?.user?.firstname} ${item?.user?.lastname}`, 10)}
                            </Link>
                          </DataTableRow>
                          {type === "transfer" && (
                            <DataTableRow size="sm" className="text-primary fw-bold ccap">
                              <Link to={`/user-details/${item?.meta?.id}`} className="title">
                                {truncateText(`${item?.meta?.firstname} ${item?.meta?.lastname}`, 10)}
                              </Link>
                            </DataTableRow>
                          )}
                          <DataTableRow size="sm">
                            <span className="text-capitalize"> {item?.provider}</span>
                          </DataTableRow>
                          <DataTableRow size="sm">
                            <span>{formatter("NGN").format(item?.amount)}</span>
                          </DataTableRow>

                          <DataTableRow>
                            <span>{formatter("NGN").format(item?.total_amount)}</span>
                          </DataTableRow>

                          {/* <DataTableRow>
                            <span>{item?.balance_before ? formatter("NGN").format(item?.balance_before) : "N/A"}</span>
                          </DataTableRow> */}

                          <DataTableRow size="sm">
                            <span>{item?.balance_after ? formatter("NGN").format(item?.balance_after) : "N/A"}</span>
                          </DataTableRow>

                          <DataTableRow size="sm">
                            <span className="text-capitalize"> {item?.purpose}</span>
                          </DataTableRow>
                          <DataTableRow size="sm">
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
                                      {item.status === "pending" && type === "deposit" ? (
                                        <>
                                          <li>
                                            <DropdownItem
                                              tag="a"
                                              href="#edit"
                                              onClick={(ev) => {
                                                ev.preventDefault();
                                                onEditClick(item.id);
                                                setEditedId(item.id);
                                                toggle("edit");
                                                // setUpdatedStatus("approved");
                                                // updateStatus();

                                                // toggle("details");
                                              }}
                                            >
                                              <Icon name="edit"></Icon>
                                              <span>Edit</span>
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
                                                setUpdatedStatus("approved");
                                                updateStatus();

                                                // toggle("details");
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
                                                setUpdatedStatus("declined");
                                                updateStatus();
                                                // toggle("details");
                                              }}
                                            >
                                              <Icon name="cross"></Icon>
                                              <span>Decline</span>
                                            </DropdownItem>
                                          </li>
                                        </>
                                      ) : null}
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
              <Col sm={4}>
                <span className="sub-text">Transaction Reference</span>
                <span className="caption-text">{formData.reference}</span>
              </Col>
              <Col size={4}>
                <span className="sub-text">Status</span>
                <span className="caption-text">
                  <Badge className="badge-sm badge-dot has-bg d-inline-flex" color={statusColor(formData.status)}>
                    <span className="ccap">{formData.status}</span>
                  </Badge>
                </span>
              </Col>
              <Col size={4}>
                <span className="sub-text">Type</span>
                <span className="caption-text">{formData.type}</span>
              </Col>
              <Col size={4}>
                <span className="sub-text">Amount</span>
                <span className="caption-text">{formatter("NGN").format(formData.amount)}</span>
              </Col>

              <Col size={4}>
                <span className="sub-text">Total Amount</span>
                <span className="caption-text">{formatter("NGN").format(formData.totalAmount)}</span>
              </Col>

              <Col size={4}>
                <span className="sub-text">Fee</span>
                <span className="caption-text">{formatter("NGN").format(formData.fee)}</span>
              </Col>
              <Col size={4}>
                <span className="sub-text">Discount</span>
                <span className="caption-text">{formatter("NGN").format(formData.discount)}</span>
              </Col>
              <Col size={4}>
                <span className="sub-text">Balance Before</span>
                <span className="caption-text">
                  {formData?.balanceBefore ? formatter("NGN").format(formData?.balanceBefore) : "N/A"}
                </span>
              </Col>
              <Col size={4}>
                <span className="sub-text">Balance After</span>
                <span className="caption-text">
                  {formData?.balanceAfter ? formatter("NGN").format(formData?.balanceAfter) : "N/A"}
                </span>
              </Col>
              <Col lg={4}>
                <span className="sub-text">Provider</span>
                <span className="caption-text ccap">{formData.provider}</span>
              </Col>
              <Col>
                <span className="sub-text">Remark</span>
                <span className="caption-text ccap">{formData.remark}</span>
              </Col>

              <Row className="mt-2">
                <h6>{type === "transfer" ? "Sender" : "User"}</h6>
                <Col sm={6} lg={4}>
                  <span className="sub-text">Fullname</span>
                  <span className="caption-text">{formData.fullName}</span>
                </Col>
                <Col sm={6} lg={4}>
                  <span className="sub-text">Phone</span>
                  <span className="caption-text">{formData.phone}</span>
                </Col>
                <Col sm={6}>
                  <span className="sub-text">Email</span>
                  <span className="caption-text">{formData.email}</span>
                </Col>
              </Row>
              {formData?.purpose === "transfer" && (
                <Row className="mt-2">
                  <h6>Receiver</h6>
                  <Col sm={6} lg={4}>
                    <span className="sub-text">Fullname</span>
                    <span className="caption-text">{formData?.receiverName}</span>
                  </Col>

                  <Col sm={4} lg={4}>
                    <span className="sub-text">Phone</span>
                    <span className="caption-text">{formData.receiverPhone}</span>
                  </Col>
                  <Col sm={6}>
                    <span className="sub-text">Email</span>
                    <span className="caption-text">{formData?.receiverEmail}</span>
                  </Col>
                </Row>
              )}

              {/* {formData.status === "pending" && ( */}
              <>
                <h6>Bank</h6>
                <Col sm={6} lg={4}>
                  <span className="sub-text">Account Name</span>
                  <span className="caption-text">{formData.accountName}</span>
                </Col>
                <Col sm={6} lg={4}>
                  <span className="sub-text">Account Number</span>
                  <span className="caption-text">{formData.accountNumber}</span>
                </Col>
                <Col sm={6} lg={4}>
                  <span className="sub-text">Bank</span>
                  <span className="caption-text"> {formData.bank}</span>
                </Col>
              </>
              {/* )} */}
              {formData?.proof && (
                <Col>
                  <h6>Proof</h6>

                  <div style={{ width: "100px", height: "100px", overflow: "hidden" }}>
                    <ImageContainer img={formData.proof} />
                  </div>
                </Col>
              )}
              <Col size="12" className="mt-5">
                <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                  {formData.status === "pending" && formData.type === "withdrawal" ? (
                    <>
                      {/* <li>
                          <Button
                            color="success"
                            size="md"
                            onClick={() => {
                              setProvider("monnify");
                              initiateRequest();
                            }}
                          >
                            Initiate Transfer
                          </Button>
                        </li> */}

                      <li>
                        <Button
                          color="success"
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
                          color="danger"
                          size="md"
                          type="button"
                          onClick={() => {
                            setUpdatedStatus("declined");
                            updateStatus();
                          }}
                        >
                          Decline
                        </Button>
                      </li>

                      {/* <li>
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
                        </li> */}
                    </>
                  ) : null}
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

      <EditModal view={view} formData={formData} onFormSubmit={updateAmount} onFormCancel={onFormCancel} />
    </>
  );
};

export default WithdrawalTable;
