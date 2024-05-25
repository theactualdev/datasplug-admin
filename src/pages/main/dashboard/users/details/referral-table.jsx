import React, { useCallback, useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown, Badge } from "reactstrap";
import { useFinanceUser, useGetAllUsers, useUpdateUserStatus, useUpdateUserType } from "../../../../../api/users/user";
import {
  Block,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Button,
  Col,
  DataTable,
  DataTableBody,
  DataTableHead,
  DataTableItem,
  DataTableRow,
  Icon,
  PaginationComponent,
  RSelect,
  Row,
  UserAvatar,
} from "../../../../../components/Component";
import Content from "../../../../../layout/content/Content";
import Head from "../../../../../layout/head/Head";
import { findUpper, formatDateWithTime, formatter, formatDate, truncateText } from "../../../../../utils/Utils";
import LoadingSpinner from "../../../../components/spinner";
import SortToolTip from "../../tables/SortTooltip";
import { filterRole, filterStatus, userFilterOptions } from "../UserData";

import Search from "../../tables/Search";
import { FilterOptions } from "../../tables/filter-select";
import AddModal from "../AddModal";
import UserTypeModal from "../userTypeModal";

const ReferralUserList = ({ list }) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [userId, setUserId] = useState(null);
  //   console.log(list);

  const itemsPerPage = searchParams.get("limit") ?? 100;
  const currentPage = searchParams.get("page") ?? 1;
  const search = searchParams.get("search") ?? "";
  const status = searchParams.get("status") ?? "";

  const { isLoading, data: users } = useGetAllUsers(currentPage, itemsPerPage, search, status);
  const { mutate: updateUserStatus } = useUpdateUserStatus(userId);
  const { mutate: financeUser } = useFinanceUser(userId);
  const { mutate: updateUserType } = useUpdateUserType(userId);
  // console.log(users);

  const [tablesm, updateTableSm] = useState(false);
  const [onSearch, setonSearch] = useState(false);
  // console.log(users);

  const [view, setView] = useState({
    finance: false,
    userType: false,
  });

  const [formData, setFormData] = useState({
    name: "",
    status: "",
    type: "",
    referral_earning_rate: "",
  });

  // function that loads the want to editted data
  const onEditClick = (id) => {
    users?.data?.forEach((item) => {
      if (item.id === id) {
        setFormData({
          name: item?.name,
          status: item?.status,
          type: item?.type,
          referral_earning_rate: item?.referral_earning_rate,
        });
      }
    });
    setUserId(id);
  };

  const onFormSubmit = (data) => {
    let submittedData = {
      ...data,
      type: data.type.value,
    };
    financeUser(submittedData);
    closeModal();
  };

  const onSubmitUserType = (data) => {
    // console.log(data);
    let submittedData = {
      type: data.type,
      referral_earning_rate: data.referral_earning_rate,
    };
    updateUserType(submittedData);
    closeModal();
  };
  const toggleModal = (type) => {
    setView({
      finance: type === "finance" ? true : false,
      userType: type === "userType" ? true : false,
    });
  };

  // function to change to suspend property for an item
  const suspendUser = (id) => {
    // let data = {
    //   id,
    //   status: "blocked",
    // };
    updateUserStatus(data);
  };

  // function to toggle the search option
  const toggle = () => setonSearch(!onSearch);

  // resets forms
  const resetForm = () => {
    setFormData({
      name: "",
      status: "",
    });
  };

  // function to close the form modal
  const closeModal = () => {
    setView({ finance: false, userType: false });
    resetForm();
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
    } else if (status === "active") {
      return "success";
    } else {
      return "danger";
    }
  }, []);

  return (
    <React.Fragment>
      <>
        <Block>
          <DataTable className="card-stretch">
            <div className="card-inner position-relative card-tools-toggle">
              <div className="card-title-group">
                <h5 className="title">All Users</h5>
                {/* <div className="card-tools me-n1">
                  <ul className="btn-toolbar gx-1">
                    <li>
                      <a
                        href="#search"
                        onClick={(ev) => {
                          ev.preventDefault();
                          toggle();
                        }}
                        className="btn btn-icon search-toggle toggle-search"
                      >
                        <Icon name="search"></Icon>
                      </a>
                    </li>
                    <li className="btn-toolbar-sep"></li>
                    <li>
                      <div className="toggle-wrap">
                        <Button
                          className={`btn-icon btn-trigger toggle ${tablesm ? "active" : ""}`}
                          onClick={() => updateTableSm(true)}
                        >
                          <Icon name="menu-right"></Icon>
                        </Button>
                        <div className={`toggle-content ${tablesm ? "content-active" : ""}`}>
                          <ul className="btn-toolbar gx-1">
                            <li className="toggle-close">
                              <Button className="btn-icon btn-trigger toggle" onClick={() => updateTableSm(false)}>
                                <Icon name="arrow-left"></Icon>
                              </Button>
                            </li>
                            <li>
                              <FilterOptions options={userFilterOptions} />
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
                      </div>
                    </li>
                  </ul>
                </div> */}
                {/* Search component */}
                <Search onSearch={onSearch} setonSearch={setonSearch} placeholder="name" />
              </div>
            </div>
            {isLoading ? (
              <LoadingSpinner />
            ) : list?.length > 0 ? (
              <>
                <DataTableBody compact>
                  <DataTableHead>
                    <DataTableRow className="nk-tb-col-check">
                      <div className="custom-control custom-control-sm custom-checkbox notext">S/N</div>
                    </DataTableRow>
                    <DataTableRow>
                      <span className="sub-text ">User</span>
                    </DataTableRow>
                    <DataTableRow>
                      <span className="sub-text ">Username</span>
                    </DataTableRow>
                    <DataTableRow size="sm">
                      <span className="sub-text">Phone</span>
                    </DataTableRow>
                    <DataTableRow>
                      <span className="sub-text ">Type</span>
                    </DataTableRow>

                    {/* <DataTableRow className="nk-tb-col-tools text-end">
                      <UncontrolledDropdown>
                        <DropdownToggle tag="a" className="btn btn-xs btn-outline-light btn-icon dropdown-toggle">
                          <Icon name="plus"></Icon>
                        </DropdownToggle>
                      </UncontrolledDropdown>
                    </DataTableRow> */}
                  </DataTableHead>
                  {/*Head*/}
                  {list?.map((item, idx) => {
                    return (
                      <DataTableItem
                        key={idx}
                        // onClick={() => navigate(`/user-details/${item.id}`)}
                        // style={{ cursor: "pointer" }}
                      >
                        <DataTableRow className="nk-tb-col-check">
                          <div className="custom-control custom-control-sm custom-checkbox notext">{idx + 1}</div>
                        </DataTableRow>
                        <DataTableRow>
                          <Link to={`/user-details/${item.id}`}>
                            <div className="user-card">
                              <UserAvatar
                                theme={item?.avatar}
                                className="xs"
                                text={findUpper(`${item?.referred.firstname} ${item?.referred.lastname}`)}
                                image={item?.avatar}
                              />
                              <div className="user-name">
                                <span className="tb-lead text-primary">
                                  {item?.referred?.firstname} {item?.referred?.lastname}{" "}
                                </span>
                              </div>
                            </div>
                          </Link>
                        </DataTableRow>

                        <DataTableRow size="lg">
                          <span className="fs-12px">{item?.referred?.email || "Not set"}</span>
                        </DataTableRow>

                        <DataTableRow size="sm">
                          {item.referred.phone ? (
                            <span className="fs-12px">
                              ({item?.referred?.phone_code}){item?.referred?.phone}
                            </span>
                          ) : (
                            <span className="fs-12px">Not set</span>
                          )}
                        </DataTableRow>
                        <DataTableRow>
                          <span className="ccap fs-12px">{item?.referred?.type}</span>
                        </DataTableRow>
                        {/* <DataTableRow size="sm">
                          <span>{formatter("NGN").format(item?.wallet?.balance)}</span>
                        </DataTableRow> */}
                        {/* <DataTableRow size="lg">
                          <span className="fs-12px">{formatDate(item.created_at)}</span>
                        </DataTableRow> */}
                        {/* <DataTableRow>
                          <span className={`dot bg-${statusColor(item.status)} d-sm-none`}></span>
                          <Badge
                            className="badge-sm badge-dot has-bg d-none d-sm-inline-flex fs-12px"
                            color={statusColor(item.status)}
                          >
                            <span className="ccap fs-12px">{item.status}</span>
                          </Badge>
                        </DataTableRow> */}
                        {/* <DataTableRow className="nk-tb-col-tools">
                          <ul className="nk-tb-actions gx-1">
                            <li>
                              <UncontrolledDropdown>
                                <DropdownToggle tag="a" className="dropdown-toggle btn btn-icon btn-trigger">
                                  <Icon name="more-h"></Icon>
                                </DropdownToggle>
                                <DropdownMenu end>
                                  <ul className="link-list-opt no-bdr">
                                    <li>
                                      <DropdownItem
                                        tag="a"
                                        href="#view"
                                        onClick={(ev) => {
                                          ev.preventDefault();
                                          navigate(`/user-details/${item.id}`);
                                        }}
                                      >
                                        <Icon name="eye"></Icon>
                                        <span>View user</span>
                                      </DropdownItem>
                                    </li>
                                    <li>
                                      <DropdownItem
                                        tag="a"
                                        href="#view"
                                        onClick={(ev) => {
                                          ev.preventDefault();
                                          setUserId(item.id);
                                          onEditClick(item.id);
                                          toggleModal("finance");
                                        }}
                                      >
                                        <Icon name="tranx-fill"></Icon>
                                        <span>Finance User</span>
                                      </DropdownItem>
                                    </li>
                                    <li>
                                      <DropdownItem
                                        tag="a"
                                        href="#view"
                                        onClick={(ev) => {
                                          ev.preventDefault();
                                          setUserId(item.id);
                                          onEditClick(item.id);
                                          toggleModal("userType");
                                        }}
                                      >
                                        <Icon name="user"></Icon>
                                        <span>Update User Type</span>
                                      </DropdownItem>
                                    </li>

                                    <li className="divider"></li>
                                    <li
                                      onClick={() => {
                                        setUserId(item.id);
                                        updateUserStatus();
                                      }}
                                    >
                                      <DropdownItem
                                        tag="a"
                                        href="#suspend"
                                        onClick={(ev) => {
                                          ev.preventDefault();
                                        }}
                                      >
                                        <Icon name="na"></Icon>
                                        <span>{item.status === "active" ? "Restrict" : "Unrestrict"} User</span>
                                      </DropdownItem>
                                    </li>
                                  </ul>
                                </DropdownMenu>
                              </UncontrolledDropdown>
                            </li>
                          </ul>
                        </DataTableRow> */}
                      </DataTableItem>
                    );
                  })}
                </DataTableBody>
              </>
            ) : (
              <div className="text-center" style={{ paddingBlock: "1rem" }}>
                <span className="text-silent">No users record found</span>
              </div>
            )}
          </DataTable>
        </Block>
        <AddModal
          modal={view.finance}
          formData={formData}
          setFormData={setFormData}
          closeModal={closeModal}
          onSubmit={onFormSubmit}
          filterStatus={filterStatus}
        />

        <UserTypeModal
          modal={view.userType}
          formData={formData}
          setFormData={setFormData}
          closeModal={closeModal}
          onSubmit={onSubmitUserType}
          filterStatus={filterStatus}
        />
        {/* 
        
        <EditModal
          modal={modal.edit}
          formData={editFormData}
          setFormData={setEditFormData}
          closeModal={closeEditModal}
          onSubmit={onEditSubmit}
          filterStatus={filterStatus}
        /> */}
      </>
    </React.Fragment>
  );
};
export default ReferralUserList;
