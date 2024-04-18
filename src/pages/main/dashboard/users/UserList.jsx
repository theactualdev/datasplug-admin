import React, { useCallback, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap";
import { useGetAllUsers, useUpdateUserStatus } from "../../../../api/users/user";
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
} from "../../../../components/Component";
import Content from "../../../../layout/content/Content";
import Head from "../../../../layout/head/Head";
import { findUpper, formatDateWithTime } from "../../../../utils/Utils";
import LoadingSpinner from "../../../components/spinner";
import SortToolTip from "../tables/SortTooltip";
import { filterRole, filterStatus } from "./UserData";
import Search from "../tables/Search";
const UserList = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const itemsPerPage = searchParams.get("limit") ?? 7;
  const currentPage = searchParams.get("page") ?? 1;
  const search = searchParams.get("search") ?? "";

  const { isLoading, data: users } = useGetAllUsers(currentPage, itemsPerPage, search);
  const { mutate: updateUserStatus } = useUpdateUserStatus();

  const [tablesm, updateTableSm] = useState(false);
  const [onSearch, setonSearch] = useState(true);

  const [filters, setfilters] = useState({});

  // function to change to suspend property for an item
  const suspendUser = (id) => {
    let data = {
      id,
      status: "blocked",
    };
    updateUserStatus(data);
  };

  // function to toggle the search option
  const toggle = () => setonSearch(!onSearch);

  // Change Page
  //paginate
  const paginate = (pageNumber) => {
    setSearchParams((searchParams) => {
      searchParams.set("page", pageNumber);
      return searchParams;
    });
  };

  // function to filter data
  const filterData = useCallback(() => {
    return;
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
              <p>You have total {users?.totalDocuments?.toLocaleString()} users.</p>
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
                              <UncontrolledDropdown>
                                <DropdownToggle tag="a" className="btn btn-trigger btn-icon dropdown-toggle">
                                  <div className="dot dot-primary"></div>
                                  <Icon name="filter-alt"></Icon>
                                </DropdownToggle>
                                <DropdownMenu
                                  end
                                  className="filter-wg dropdown-menu-xl"
                                  style={{ overflow: "visible" }}
                                >
                                  <div className="dropdown-head">
                                    <span className="sub-title dropdown-title">Filter Users</span>
                                  </div>
                                  <div className="dropdown-body dropdown-body-rg">
                                    <Row className="gx-6 gy-3">
                                      <Col size="6">
                                        <div className="form-group">
                                          <label className="overline-title overline-title-alt">Role</label>
                                          <RSelect
                                            options={filterRole}
                                            placeholder="Any Role"
                                            value={filters.role && { label: filters.role, value: filters.role }}
                                            onChange={(e) => setfilters({ ...filters, role: e.value })}
                                          />
                                        </div>
                                      </Col>
                                      <Col size="6">
                                        <div className="form-group">
                                          <label className="overline-title overline-title-alt">Status</label>
                                          <RSelect
                                            options={filterStatus}
                                            placeholder="Any Status"
                                            value={filters.status && { label: filters.status, value: filters.status }}
                                            onChange={(e) => setfilters({ ...filters, status: e.value })}
                                          />
                                        </div>
                                      </Col>
                                      <Col size="12">
                                        <div className="form-group">
                                          <Button color="secondary" onClick={filterData}>
                                            Filter
                                          </Button>
                                        </div>
                                      </Col>
                                    </Row>
                                  </div>
                                  <div className="dropdown-foot between">
                                    <a
                                      href="#reset"
                                      onClick={(ev) => {
                                        ev.preventDefault();
                                        // setData(userData);
                                        setfilters({});
                                      }}
                                      className="clickable"
                                    >
                                      Reset Filter
                                    </a>
                                    <a
                                      href="#save"
                                      onClick={(ev) => {
                                        ev.preventDefault();
                                      }}
                                    >
                                      Save Filter
                                    </a>
                                  </div>
                                </DropdownMenu>
                              </UncontrolledDropdown>
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
            ) : users?.totalDocuments > 0 ? (
              <>
                <DataTableBody compact>
                  <DataTableHead>
                    <DataTableRow className="nk-tb-col-check">
                      <div className="custom-control custom-control-sm custom-checkbox notext">S/N</div>
                    </DataTableRow>
                    <DataTableRow>
                      <span className="sub-text ">User</span>
                    </DataTableRow>
                    <DataTableRow size="md">
                      <span className="sub-text">Role</span>
                    </DataTableRow>
                    <DataTableRow size="sm">
                      <span className="sub-text">Email</span>
                    </DataTableRow>
                    <DataTableRow size="sm">
                      <span className="sub-text">Date Joined</span>
                    </DataTableRow>
                    <DataTableRow>
                      <span className="sub-text">Status</span>
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
                      <DataTableItem key={idx}>
                        <DataTableRow className="nk-tb-col-check">
                          <div className="custom-control custom-control-sm custom-checkbox notext">{idx + 1}</div>
                        </DataTableRow>
                        <DataTableRow>
                          {/* <Link to={`${import.meta.env.PUBLIC_URL}/user-details-regular/${item.id}`}> */}
                          <div className="user-card">
                            <UserAvatar
                              theme={item?.avatar}
                              className="xs"
                              text={findUpper(`${item?.firstName} ${item?.lastName}`)}
                              image={item?.profilePicture}
                            />
                            <div className="user-name">
                              <span className="tb-lead">
                                {item?.firstName} {item?.lastName}{" "}
                              </span>
                            </div>
                          </div>
                          {/* </Link> */}
                        </DataTableRow>
                        <DataTableRow size="md">
                          <span className="text-capitalize">{item.role}</span>
                        </DataTableRow>
                        <DataTableRow size="sm">
                          <span>{item.email}</span>
                        </DataTableRow>
                        <DataTableRow size="lg">
                          <span>{formatDateWithTime(item.createdAt)}</span>
                        </DataTableRow>
                        <DataTableRow>
                          <span
                            className={`tb-status text-${
                              item.status === "active" ? "success" : item.status === "pending" ? "warning" : "danger"
                            } text-capitalize`}
                          >
                            {item.status}
                          </span>
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
                                    {item.status !== "Suspend" && (
                                      <React.Fragment>
                                        <li className="divider"></li>
                                        <li onClick={() => suspendUser(item.id)}>
                                          <DropdownItem
                                            tag="a"
                                            href="#suspend"
                                            onClick={(ev) => {
                                              ev.preventDefault();
                                            }}
                                          >
                                            <Icon name="na"></Icon>
                                            <span>Suspend User</span>
                                          </DropdownItem>
                                        </li>
                                      </React.Fragment>
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
                  {users?.totalDocuments > 0 && (
                    <PaginationComponent
                      itemPerPage={itemsPerPage}
                      totalItems={users?.totalDocuments}
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
        {/* 
        <AddModal
          modal={modal.add}
          formData={formData}
          setFormData={setFormData}
          closeModal={closeModal}
          onSubmit={onFormSubmit}
          filterStatus={filterStatus}
        />
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
