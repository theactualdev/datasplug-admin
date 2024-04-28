import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { Card, DropdownItem, DropdownMenu, DropdownToggle, Modal, ModalBody, UncontrolledDropdown } from "reactstrap";
import {
  useCreateAnnouncement,
  useDeleteAnnouncement,
  useDispatchAnnouncement,
  useEditAnnouncement,
  useGetAnnouncement,
  useRestoreAnnouncement,
} from "../../../../api/announcement";
import {
  Block,
  BlockBetween,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
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
import Content from "../../../../layout/content/Content";
import Head from "../../../../layout/head/Head";
import { formatDateWithTime } from "../../../../utils/Utils";
import LoadingSpinner from "../../../components/spinner";
import Search from "../tables/Search";
import SortToolTip from "../tables/SortTooltip";
import AddModal from "./AddModal";

const AnnouncementPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [editedId, setEditedId] = useState(null);

  const itemsPerPage = searchParams.get("limit") ?? 100;
  const currentPage = searchParams.get("page") ?? 1;
  const search = searchParams.get("search") ?? "";
  const type = searchParams.get("type") ?? undefined;
  const { isLoading, data } = useGetAnnouncement(currentPage, itemsPerPage);
  const { mutate: createAnnouncement } = useCreateAnnouncement();
  const { mutate: editAnnouncement } = useEditAnnouncement(editedId);
  const { mutate: deleteAnnouncement } = useDeleteAnnouncement(editedId);
  const { mutate: restoreAnnoucement } = useRestoreAnnouncement(editedId);
  const { mutate: dispatchAnnoucement } = useDispatchAnnouncement(editedId);

  // console.log(data);
  const [sm, updateSm] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    body: "",
    target: "",
    userCount: "",
    channels: [],
    failedNote: "",
    dispatchDate: "",
    dateCreated: "",
    status: "",
  });
  const [view, setView] = useState({
    edit: false,
    add: false,
    details: false,
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
    setView({ edit: false, add: false, details: false });
    setTimeout(() => {
      resetForm();
    }, 500);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      body: "",
      target: "",
      userCount: "",
      channels: [],
      failedNote: "",
      dispatchDate: "",
      dateCreated: "",
      status: "",
    });
    // reset({});
  };

  // function that loads the want to editted data
  const onEditClick = (id) => {
    data?.data?.forEach((item) => {
      if (item.id === id) {
        setFormData({
          title: item?.title,
          body: item?.body,
          status: item?.status,
          target: item?.target,
          userCount: item?.user_count,
          failedNote: item?.failed_note ? item.failedNote : "No note",
          channels: item?.channels,
          dateCreated: item?.created_at,
          dispatchDate: item?.dispatch_datetime,
        });
      }
    });
    setEditedId(id);
    setView({ add: false, edit: true });
  };

  const onSubmit = (data) => {
    console.log(data);
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
    } else if (status === "") {
      return "info";
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
    <React.Fragment>
      <Head title="Announcement"></Head>
      <Content>
        <BlockHead size="sm">
          {/* <BlockBetween>
            <BlockHeadContent>
              <BlockTitle>Announcements</BlockTitle>
            </BlockHeadContent>
          </BlockBetween> */}
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle tag="h3" page>
                Announcements{" "}
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
                      <Button color="primary" onClick={() => toggle("add")}>
                        <Icon name="plus"></Icon>
                        <span>Create Announcement</span>
                      </Button>
                    </li>
                  </ul>
                </div>
              </div>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>
        {/* PRODUCT TABLE HERE */}
        <Block>
          <Card>
            <div className="card-inner border-bottom">
              <div className="card-title-group">
                <div className="card-title">
                  <h5 className="title">All Annoucements</h5>
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
                      <UncontrolledDropdown>
                        <DropdownToggle tag="a" className="btn btn-trigger btn-icon dropdown-toggle">
                          <div className="dot dot-primary"></div>
                          <Icon name="filter-alt"></Icon>
                        </DropdownToggle>
                        <DropdownMenu end className="filter-wg dropdown-menu-xl" style={{ overflow: "visible" }}>
                          <div className="dropdown-head">
                            <span className="sub-title dropdown-title">Advanced Filter</span>
                          </div>
                          <div className="dropdown-body dropdown-body-rg">
                            <Row className="gx-6 gy-4">
                              <Col size="12">
                                <div className="form-group">
                                  <label className="overline-title overline-title-alt">Type</label>
                                  {/* <RSelect
                                    options={flightsFilterOptions}
                                    placeholder="Any flight type"
                                    value={filters.status && { label: filters.status, value: filters.status }}
                                    isSearchable={false}
                                    onChange={(e) => setfilters({ ...filters, status: e.label })}
                                  /> */}
                                </div>
                              </Col>
                              <Col size="12">
                                <div className="form-group">
                                  <Button type="button" onClick={filterData} className="btn btn-secondary ">
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
                                // setData(couponsData);
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
                {/* Search component */}
                <Search onSearch={onSearch} setonSearch={setonSearch} placeholder="hotel name" />
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
                          <span className="tb-tnx-head bg-white text-secondary">Title</span>
                        </DataTableRow>
                        <DataTableRow>
                          <span className="tb-tnx-head bg-white text-secondary">Creator</span>
                        </DataTableRow>
                        <DataTableRow size="md">
                          <span className="tb-tnx-head bg-white text-secondary">Channel</span>
                        </DataTableRow>
                        <DataTableRow>
                          <span className="tb-tnx-head bg-white text-secondary">Target</span>
                        </DataTableRow>
                        <DataTableRow>
                          <span className="tb-tnx-head bg-white text-secondary">Target Count</span>
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
                      {data?.data?.map((item) => {
                        return (
                          <DataTableItem key={item.id} className="text-secondary">
                            <DataTableRow size="sm" className="text-primary fw-bold">
                              <span className="title">{item.title}</span>
                            </DataTableRow>
                            <DataTableRow>
                              <span>Super Admin</span>
                            </DataTableRow>

                            <DataTableRow>
                              {item?.channels?.map((item, index) => (
                                <span key={item} className="text-capitalize">
                                  {item}
                                  {index !== 1 && ","}{" "}
                                </span>
                              ))}
                            </DataTableRow>
                            <DataTableRow>
                              <span className="text-capitalize"> {item?.target}</span>
                            </DataTableRow>
                            <DataTableRow>
                              <span>{item.user_count}</span>
                            </DataTableRow>
                            <DataTableRow>
                              <span className="text-capitalize">{item.status}</span>
                            </DataTableRow>
                            <DataTableRow className="tb-odr-action">
                              <div className="tb-odr-btns d-none d-md-inline">
                                <Button
                                  color="primary"
                                  className="btn-sm"
                                  onClick={(ev) => {
                                    onEditClick(item.id);
                                    toggle("details");
                                  }}
                                >
                                  View
                                </Button>

                                <UncontrolledDropdown>
                                  <DropdownToggle
                                    tag="a"
                                    href="#more"
                                    onClick={(ev) => ev.preventDefault()}
                                    className="text-soft dropdown-toggle btn btn-icon btn-trigger ms-1"
                                  >
                                    <Icon name="more-h"></Icon>
                                  </DropdownToggle>
                                  <DropdownMenu end>
                                    <ul className="link-list-plain">
                                      {item.status === "pending" && (
                                        <li>
                                          <DropdownItem
                                            tag="a"
                                            href="#edit"
                                            onClick={(ev) => {
                                              ev.preventDefault();
                                              onEditClick(item.id);
                                              toggle("edit");
                                            }}
                                          >
                                            <Icon name="pen2"></Icon>
                                            <span>Edit</span>
                                          </DropdownItem>
                                        </li>
                                      )}
                                      <li>
                                        <DropdownItem
                                          tag="a"
                                          href="#edit"
                                          onClick={(ev) => {
                                            ev.preventDefault();
                                            setEditedId(item.id);
                                            dispatchAnnoucement();
                                          }}
                                        >
                                          <Icon name="send-alt"></Icon>
                                          <span>Dispatch</span>
                                        </DropdownItem>
                                      </li>{" "}
                                      <li>
                                        <DropdownItem
                                          tag="a"
                                          href="#edit"
                                          onClick={(ev) => {
                                            ev.preventDefault();
                                            setEditedId(item.id);
                                            restoreAnnoucement();
                                          }}
                                        >
                                          <Icon name="reload-alt"></Icon>
                                          <span>Restore</span>
                                        </DropdownItem>
                                      </li>
                                      <li>
                                        <DropdownItem
                                          tag="a"
                                          href="#edit"
                                          onClick={(ev) => {
                                            ev.preventDefault();
                                            setEditedId(item.id);
                                            deleteAnnouncement();
                                          }}
                                        >
                                          <Icon name="trash" className="text-danger"></Icon>
                                          <span className="text-danger">Delete</span>
                                        </DropdownItem>
                                      </li>
                                    </ul>
                                  </DropdownMenu>
                                </UncontrolledDropdown>
                              </div>
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
              <h4 className="nk-modal-title title">Details</h4>
            </div>
            <div className="nk-tnx-details mt-sm-3">
              <Row className="gy-2">
                <Col lg={4}>
                  <span className="sub-text">Title</span>
                  <span className="caption-text text-primary">{formData.title}</span>
                </Col>
                <Col>
                  <span className="sub-text">Body</span>
                  <span className="caption-text">{formData.body}</span>
                </Col>
                <Col lg={4}>
                  <span className="sub-text">Target</span>
                  <span className="caption-text ccap">{formData.target}</span>
                </Col>
                <Col lg={4}>
                  <span className="sub-text">Target Count</span>
                  <span className="caption-text">{formData.userCount}</span>
                </Col>
                <Col lg={4}>
                  <span className="sub-text">Status</span>
                  <span className="caption-text ccap">{formData.status}</span>
                </Col>
                <Col lg={4}>
                  <span className="sub-text">Channels</span>
                  <span className="caption-text">
                    {formData?.channels?.map((item, index) => (
                      <span key={item} className="text-capitalize">
                        {item}
                        {index !== 1 && ","}{" "}
                      </span>
                    ))}
                  </span>
                </Col>
                <Col lg={4}>
                  <span className="sub-text">Date created</span>
                  <span className="caption-text">{formatDateWithTime(formData.dateCreated)}</span>
                </Col>{" "}
                <Col lg={4}>
                  <span className="sub-text">Date dispatch</span>
                  <span className="caption-text">{formatDateWithTime(formData.dispatchDate)}</span>
                </Col>
              </Row>
            </div>
          </ModalBody>
        </Modal>

        <AddModal
          closeModal={onFormCancel}
          formData={formData}
          modal={view.add || view.edit}
          isEdit={view.edit}
          createFunction={createAnnouncement}
          editFunction={editAnnouncement}
        />
      </Content>
    </React.Fragment>
  );
};

export default AnnouncementPage;
