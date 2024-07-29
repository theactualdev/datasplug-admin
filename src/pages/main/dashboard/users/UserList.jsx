import React, { useCallback, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Badge, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap";
import {
  useFinanceUser,
  useGetAllUsers,
  useMarkAsFraud,
  useUpdateUserStatus,
  useUpdateUserType,
} from "../../../../api/users/user";
import {
  Block,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Button,
  DataTable,
  DataTableBody,
  DataTableHead,
  DataTableItem,
  DataTableRow,
  Icon,
  PaginationComponent,
  UserAvatar,
} from "../../../../components/Component";
import Content from "../../../../layout/content/Content";
import Head from "../../../../layout/head/Head";
import {
  findUpper,
  formatDate,
  formatDateWithTime,
  formatter,
  truncateText,
  tableNumbers,
} from "../../../../utils/Utils";
import LoadingSpinner from "../../../components/spinner";
import Search from "../tables/Search";
import SortToolTip from "../tables/SortTooltip";
import { FilterOptions } from "../tables/filter-select";
import AddModal from "./AddModal";
import { filterStatus, userFilterOptions } from "./UserData";
import UserTypeModal from "./userTypeModal";

const UserList = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [userId, setUserId] = useState(null);

  const itemsPerPage = searchParams.get("limit") ?? 100;
  const currentPage = searchParams.get("page") ?? 1;
  const search = searchParams.get("search") ?? "";
  const status = searchParams.get("status") ?? "";

  const { isLoading, data: users } = useGetAllUsers(currentPage, itemsPerPage, search, status);
  const { mutate: updateUserStatus } = useUpdateUserStatus(userId);
  const { mutate: financeUser } = useFinanceUser(userId);
  const { mutate: updateUserType } = useUpdateUserType(userId);
  const { mutate: markAsFraud } = useMarkAsFraud(userId);
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
      <Head title="User management"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockHeadContent>
            <BlockTitle tag="h3" page>
              Users Lists
            </BlockTitle>
            <BlockDes className="text-soft">
              <p>You have total {users?.meta?.total?.toLocaleString()} users.</p>
            </BlockDes>
          </BlockHeadContent>
        </BlockHead>

        <Block>
          <DataTable className="card-stretch">
            <div className="card-inner position-relative card-tools-toggle">
              <div className="card-title-group">
                <h5 className="title">All Users</h5>
                <div className="card-tools me-n1">
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
                </div>
                {/* Search component */}
                <Search onSearch={onSearch} setonSearch={setonSearch} placeholder="name" />
              </div>
            </div>
            {isLoading ? (
              <LoadingSpinner />
            ) : users?.meta?.total > 0 ? (
              <>
                <DataTableBody compact>
                  <DataTableHead>
                    <DataTableRow size="sm">
                      <span className="tb-tnx-head bg-white text-secondary">S/N</span>
                    </DataTableRow>
                    <DataTableRow>
                      <span className="tb-tnx-head bg-white text-secondary ">User</span>
                    </DataTableRow>
                    <DataTableRow size="sm">
                      <span className="tb-tnx-head bg-white text-secondary">Username</span>
                    </DataTableRow>
                    <DataTableRow size="sm">
                      <span className="tb-tnx-head bg-white text-secondary">Phone</span>
                    </DataTableRow>
                    <DataTableRow>
                      <span className="tb-tnx-head bg-white text-secondary ">Type</span>
                    </DataTableRow>
                    <DataTableRow size="md">
                      <span className="tb-tnx-head bg-white text-secondary">Wallet</span>
                    </DataTableRow>
                    <DataTableRow size="sm">
                      <span className="tb-tnx-head bg-white text-secondary">Date Joined</span>
                    </DataTableRow>
                    <DataTableRow>
                      <span className="tb-tnx-head bg-white text-secondary">Status</span>
                    </DataTableRow>
                    <DataTableRow className="nk-tb-col-tools text-end">
                      <UncontrolledDropdown>
                        <DropdownToggle tag="a" className="btn btn-xs btn-outline-light btn-icon dropdown-toggle">
                          <Icon name="plus"></Icon>
                        </DropdownToggle>
                      </UncontrolledDropdown>
                    </DataTableRow>
                  </DataTableHead>
                  {/*Head*/}
                  {users?.data?.map((item, idx) => {
                    return (
                      <DataTableItem
                        key={idx}
                        // onClick={() => navigate(`/user-details/${item.id}`)}
                        // style={{ cursor: "pointer" }}
                      >
                        <DataTableRow size="sm">
                          <span className="text-capitalize">{tableNumbers(currentPage, itemsPerPage) + idx + 1}</span>
                        </DataTableRow>
                        <DataTableRow>
                          <Link to={`/user-details/${item.id}`}>
                            <div className="user-card">
                              <UserAvatar
                                theme={item?.avatar}
                                className="xs"
                                text={findUpper(`${item?.firstname} ${item?.lastname}`)}
                                image={item?.avatar}
                              />
                              <div className="user-name">
                                <span className="tb-lead ccap">
                                  {item?.firstname} {item?.lastname}{" "}
                                </span>
                                <p className="text-primary fw-normal fs-12px">{truncateText(item.email, 20)}</p>
                              </div>
                            </div>
                          </Link>
                        </DataTableRow>

                        <DataTableRow size="lg">
                          <span className="ccap fs-12px">
                            {item?.username ? truncateText(item?.username, 15) : "Not set"}
                          </span>
                        </DataTableRow>

                        <DataTableRow size="sm">
                          {item.phone ? (
                            <span className="fs-12px">
                              ({item.phone_code}){item.phone}
                            </span>
                          ) : (
                            <span className="fs-12px">Not set</span>
                          )}
                        </DataTableRow>
                        <DataTableRow>
                          <span className="ccap fs-12px">{item?.type}</span>
                        </DataTableRow>
                        <DataTableRow size="sm">
                          <span>{formatter("NGN").format(item?.wallet?.balance)}</span>
                        </DataTableRow>
                        <DataTableRow size="lg">
                          <span className="fs-12px">{formatDateWithTime(item.created_at)}</span>
                        </DataTableRow>
                        <DataTableRow>
                          <span className={`dot bg-${statusColor(item.status)} d-sm-none`}></span>
                          <Badge
                            className="badge-sm badge-dot has-bg d-none d-sm-inline-flex fs-12px"
                            color={statusColor(item.status)}
                          >
                            <span className="ccap fs-12px">{item.status}</span>
                          </Badge>
                        </DataTableRow>
                        <DataTableRow className="nk-tb-col-tools">
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
                                    {item?.status !== "fraudulent" && (
                                      <li
                                        onClick={() => {
                                          setUserId(item.id);
                                          markAsFraud();
                                          // updateUserStatus();
                                        }}
                                      >
                                        <DropdownItem
                                          tag="a"
                                          href="#suspend"
                                          onClick={(ev) => {
                                            ev.preventDefault();
                                          }}
                                        >
                                          <Icon name="report"></Icon>
                                          <span>Flag as Fraud.</span>
                                        </DropdownItem>
                                      </li>
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
                  {users?.meta?.total > 0 && (
                    <PaginationComponent
                      itemPerPage={itemsPerPage}
                      totalItems={users?.meta?.total}
                      paginate={paginate}
                      currentPage={Number(currentPage)}
                    />
                  )}
                </div>
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
      </Content>
    </React.Fragment>
  );
};
export default UserList;
