import React, { useCallback, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown, Badge } from "reactstrap";
import {
  useCreateAdmin,
  useGetAllAdmin,
  useUpdateAdmin,
  useUpdateAdminRole,
  useToggleAdminStatus,
} from "../../../../api/users/admin";
import {
  Block,
  BlockBetween,
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
import { findUpper, formatDate } from "../../../../utils/Utils";
import LoadingSpinner from "../../../components/spinner";
import SortToolTip from "../tables/SortTooltip";
import AddModal from "./AddModal";
import EditModal from "./EditModal";
import { filterStatus } from "./adminData";

const AdminList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const itemsPerPage = searchParams.get("limit") ?? 7;
  const currentPage = searchParams.get("page") ?? 1;

  const { data: admin, isLoading } = useGetAllAdmin(currentPage, itemsPerPage);
  const { mutate: addAdmin } = useCreateAdmin();
  const { mutate: updateAdmin } = useUpdateAdmin();
  const [editId, setEditedId] = useState();
  const [roleId, setRoleId] = useState();
  const { mutate: updateAdminRole } = useUpdateAdminRole(editId, roleId);

  // console.log(admin);

  const [sm, updateSm] = useState(false);
  const [tablesm, updateTableSm] = useState(false);
  const [onSearch, setonSearch] = useState(true);
  const [onSearchText, setSearchText] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [modal, setModal] = useState({
    edit: false,
    add: false,
  });
  const { mutate: toggleStatus } = useToggleAdminStatus(editId);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    role: "", //role id
  });
  const [editFormData, setEditFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    role: "",
  });

  const [updateRole, setUpdateRole] = useState(false);
  const [filters, setfilters] = useState({});

  // onChange function for searching name
  const onFilterChange = (e) => {
    setSearchText(e.target.value);
  };

  // function to reset the form
  const resetForm = () => {
    setFormData({
      firstname: "",
      lastname: "",
      email: "",
      role: "",
    });
    setTimeout(() => {
      setUpdateRole(false);
    }, 500);
  };

  const closeModal = () => {
    setModal({ add: false });
    resetForm();
  };

  const closeEditModal = () => {
    setModal({ edit: false });
    resetForm();
  };

  // submit function to add a new item
  const onFormSubmit = (submitData) => {
    // console.log(submitData);
    addAdmin(submitData);
    resetForm();
    setModal({ edit: false }, { add: false });
  };

  // submit function to update a new item
  const onEditSubmit = (submitData) => {
    const { firtname, lastname, email, role } = submitData;
    let submittedData = {
      adminId: editId,
      firtname,
      lastname,
      email,
      role,
    };
    updateAdmin(submittedData);
    setModal({ edit: false });
    resetForm();
  };

  const editRole = () => {
    updateAdminRole();
    setModal({ edit: false });
    resetForm();
  };
  // function that loads the want to editted data
  const onEditClick = (id) => {
    admin?.data?.forEach((item) => {
      if (item?.id === id) {
        setEditFormData({
          name: item.name,
          email: item.email,
          role: item.role?.id,
          phone: item.phone,
        });
        setSelectedRole(item?.role?.title);
        setModal({ edit: true }, { add: false });
      }
    });
  };

  // function to change to suspend property for an item

  // function to toggle the search option
  const toggle = () => setonSearch(!onSearch);

  // Change Page
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
      <Head title="Admin management"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle tag="h3" page>
                Admin List
              </BlockTitle>
            </BlockHeadContent>
            <BlockHeadContent>
              <div className="toggle-wrap nk-block-tools-toggle">
                <Button
                  className={`btn-icon btn-trigger toggle-expand me-n1 ${sm ? "active" : ""}`}
                  onClick={() => updateSm(!sm)}
                >
                  <Icon name="menu-alt-r"></Icon>
                </Button>
                <div className="toggle-expand-content" style={{ display: sm ? "block" : "none" }}>
                  <ul className="nk-block-tools g-3">
                    <li className="nk-block-tools-opt">
                      <Button color="primary" onClick={() => setModal({ add: true })}>
                        <Icon name="plus"></Icon>
                        <span>Create Admin</span>
                      </Button>
                    </li>
                  </ul>
                </div>
              </div>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>

        <Block>
          <DataTable className="card-stretch">
            <div className="card-inner position-relative card-tools-toggle">
              <div className="card-title-group">
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
                                      <Col size="12">
                                        <div className="form-group">
                                          <label className="overline-title overline-title-alt">Role</label>
                                          <RSelect
                                            options={filterStatus}
                                            placeholder="Any Role"
                                            value={filters.role && { label: filters.role, value: filters.role }}
                                            onChange={(e) => setfilters({ ...filters, role: e.value })}
                                          />
                                        </div>
                                      </Col>
                                      <Col size="12">
                                        <div className="form-group" onClick={filterData}>
                                          <Button color="secondary">Filter</Button>
                                        </div>
                                      </Col>
                                    </Row>
                                  </div>
                                  <div className="dropdown-foot between">
                                    <a
                                      href="#reset"
                                      onClick={(ev) => {
                                        ev.preventDefault();
                                        // setData(adminData);
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
              </div>
              <div className={`card-search search-wrap ${!onSearch && "active"}`}>
                <div className="card-body">
                  <div className="search-content">
                    <Button
                      className="search-back btn-icon toggle-search active"
                      onClick={() => {
                        setSearchText("");
                        toggle();
                      }}
                    >
                      <Icon name="arrow-left"></Icon>
                    </Button>
                    <input
                      type="text"
                      className="border-transparent form-focus-none form-control"
                      placeholder="Search by user or email"
                      value={onSearchText}
                      onChange={(e) => onFilterChange(e)}
                    />
                    <Button className="search-submit btn-icon">
                      <Icon name="search"></Icon>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            {isLoading ? (
              <LoadingSpinner />
            ) : admin?.meta?.total > 0 ? (
              <>
                <DataTableBody compact>
                  <DataTableHead>
                    <DataTableRow className="nk-tb-col-check">
                      <span>S/N</span>
                    </DataTableRow>
                    <DataTableRow>
                      <span className="sub-text ">Name</span>
                    </DataTableRow>
                    <DataTableRow size="sm">
                      <span className="sub-text">Email</span>
                    </DataTableRow>
                    <DataTableRow size="sm">
                      <span className="sub-text">Date Joined</span>
                    </DataTableRow>
                    <DataTableRow>
                      <span className="sub-text">Role</span>
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
                  {admin?.data?.map((item, idx) => {
                    return (
                      <DataTableItem key={idx}>
                        <DataTableRow className="nk-tb-col-check">
                          <span>{idx + 1}</span>
                        </DataTableRow>
                        <DataTableRow>
                          {/* <Link to={`${import.meta.env.PUBLIC_URL}/user-details-regular/${item.id}`}> */}
                          <div className="user-card">
                            <UserAvatar
                              theme={item.avatarBg}
                              className="xs"
                              text={findUpper(`${item?.firstname} ${item?.lastname}`)}
                              image={item.image}
                            ></UserAvatar>
                            <div className="user-name">
                              <span className="tb-lead">
                                {item?.firstname} {item?.lastname}
                              </span>
                            </div>
                          </div>
                          {/* </Link> */}
                        </DataTableRow>
                        <DataTableRow size="sm">
                          <span>{item?.email}</span>
                        </DataTableRow>
                        <DataTableRow size="sm">
                          <span>{formatDate(item.created_at)}</span>
                        </DataTableRow>
                        <DataTableRow>
                          <span>{item.role?.name || "All"}</span>
                        </DataTableRow>
                        <DataTableRow>
                          <span
                            className={`dot bg-${item?.status === "active" ? "success" : "warning"} d-sm-none`}
                          ></span>
                          <Badge
                            className="badge-sm badge-dot has-bg d-none d-sm-inline-flex"
                            color={item?.status === "active" ? "success" : "warning"}
                          >
                            <span className="ccap">{item?.status}</span>
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
                                          setUpdateRole(true);
                                          setEditedId(item.id);
                                          onEditClick(item.id);
                                          setSelectedRole(item.role.name || "All");
                                          //   navigate(`/user-details/${item.id}`);
                                        }}
                                      >
                                        <Icon name="exchange"></Icon>
                                        <span>Change role</span>
                                      </DropdownItem>
                                    </li>
                                    {/* <li>
                                      <DropdownItem
                                        tag="a"
                                        href="#view"
                                        onClick={(ev) => {
                                          ev.preventDefault();
                                          setEditedId(item.id);
                                          onEditClick(item.id);

                                          //   navigate(`/user-details/${item.id}`);
                                        }}
                                      >
                                        <Icon name="edit"></Icon>
                                        <span>Edit admin</span>
                                      </DropdownItem>
                                    </li> */}

                                    <li className="divider"></li>
                                    <li>
                                      <DropdownItem
                                        tag="a"
                                        href="#suspend"
                                        onClick={(ev) => {
                                          ev.preventDefault();
                                          setEditedId(item.id);
                                          toggleStatus();
                                        }}
                                      >
                                        <Icon name={item.status === "active" ? "na" : "check"}></Icon>
                                        <span>{item.status === "active" ? "Suspend" : "Activate"} Admin</span>
                                      </DropdownItem>
                                    </li>
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
                  {admin?.totalDocuments > 0 && (
                    <PaginationComponent
                      itemPerPage={itemsPerPage}
                      totalItems={admin?.totalDocuments}
                      paginate={paginate}
                      currentPage={Number(currentPage)}
                    />
                  )}
                </div>
              </>
            ) : (
              <div className="text-center" style={{ paddingBlock: "1rem" }}>
                <span className="text-silent">No records found</span>
              </div>
            )}
          </DataTable>
        </Block>

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
          role={updateRole}
          setFormData={setEditFormData}
          closeModal={closeEditModal}
          onSubmit={editRole}
          filterStatus={filterStatus}
          selectedRole={selectedRole}
          setSelectedRole={setSelectedRole}
          setRoleId={setRoleId}
        />
      </Content>
    </React.Fragment>
  );
};
export default AdminList;
