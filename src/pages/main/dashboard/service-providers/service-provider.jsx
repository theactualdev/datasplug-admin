import React, { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import NoIcon from "../../../../images/no-image-icon.png";
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
  RSelect,
  Row,
} from "../../../../components/Component";
import Content from "../../../../layout/content/Content";
import Head from "../../../../layout/head/Head";
import { formatDateWithTime, formatDate } from "../../../../utils/Utils";
import FaqTable from "../faq/faqTable";
import {
  useCreateProviders,
  useDeleteProviders,
  useGetProviders,
  useToggleProviders,
  useUpdateProviderProduct,
  useUpdateProviders,
  useGetRoutes,
} from "../../../../api/service-providers";
import SortToolTip from "../tables/SortTooltip";
import Search from "../tables/Search";
import LoadingSpinner from "../../../components/spinner";
import { useUploadImages, generateSignature } from "../../../../api/uploadimage";
import Dropzone from "react-dropzone";
import EditProductTypes from "./edit-product-types";

const ServiceProviders = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const itemsPerPage = searchParams.get("limit") ?? 100;
  const currentPage = searchParams.get("page") ?? 1;
  const search = searchParams.get("search") ?? "";

  const [editId, setEditedId] = useState();
  const [onSearch, setonSearch] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [files, setFiles] = useState([]);

  // const { isLoading, data: faqs } = useGetFaqs();
  // const { isLoading, data: accounts } = useGetSystemAccount(currentPage, itemsPerPage);
  const { isLoading, data: providers } = useGetProviders(currentPage, itemsPerPage);
  const { mutate: addProvider } = useCreateProviders();
  const { mutate: updateProvider } = useUpdateProviders(editId);
  const { mutate: deleteProvider } = useDeleteProviders(editId);
  const { mutate: updateStatus } = useToggleProviders(editId);
  const { mutate: updateProduct } = useUpdateProviderProduct(editId);
  const { data } = useGetRoutes();
  // console.log(data);
  // console.log(providers);

  // console.log(accounts);

  const [formData, setFormData] = useState({
    name: "",
    logo: "",
    active: false,
    product_type: [],
    created_at: "",
  });

  const [view, setView] = useState({
    add: false,
    details: false,
    edit: false,
    logo: false,
    types: false,
  });

  // toggle function to view order details

  const toggle = (type) => {
    setView({
      add: type === "add" ? true : false,
      details: type === "details" ? true : false,
      edit: type === "edit" ? true : false,
      logo: type === "logo" ? true : false,
      types: type === "types" ? true : false,
    });
  };

  // resets forms
  const resetForm = () => {
    setFormData({
      name: "",
      logo: "",
      active: false,
      product_type: [],
      created_at: "",
    });
  };

  // Submits form data
  const onFormSubmit = (form) => {
    // console.log(form);
    let submittedData = {
      question: form.question,
      answer: form.answer,
      faq_category_id: form.categoryId,
    };
    if (view.add) {
      addProvider(submittedData);
    } else {
      updateProvider(submittedData);
    }

    setView({ add: false, details: false, edit: false, logo: false, types: false });
    resetForm();
  };

  // function that loads the want to editted data
  const onEditClick = (id) => {
    // console.log(id);
    providers?.data?.forEach((item) => {
      if (item.id === id) {
        setFormData({
          name: item?.name,
          logo: item?.logo,
          active: item?.active,
          product_type: item?.product_type,
          created_at: item?.created_at,
        });
      }
    });
    setEditedId(id);
  };

  useEffect(() => {
    reset(formData);
  }, [formData]);

  // function to close the form modal
  const onFormCancel = () => {
    setView({ add: false, details: false, edit: false, logo: false, types: false });
    resetForm();
  };

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

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onImageUpload = (data) => {
    const image = data?.url;
    console.log("Image uploaded");
    setUploadedImages((prev) => [...prev, image]);
  };

  // console.log(uploadedImages);

  const bulkImageUpload = async (image) => {
    const { token, expire, signature } = await generateSignature();

    const formData = new FormData();
    formData.append("publicKey", import.meta.env.VITE_APP_IMAGEKIT_PUBLIC_KEY);
    formData.append("file", image);
    formData.append("fileName", image?.name);
    formData.append("useUniqueFileName", "true");
    formData.append("expire", expire);
    formData.append("token", token);
    formData.append("signature", signature);
    upload(formData);
  };

  const uploadImageToImageKit = async () => {
    files.forEach((image) => {
      return bulkImageUpload(image);
    });
  };

  // handles ondrop function of dropzone
  const handleDropChange = (acceptedFiles) => {
    if (files.length === 1) {
      return;
    }
    let selectedFile = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    setFiles([...files, ...selectedFile]);
  };

  const removeImage = (e, name) => {
    e.stopPropagation();
    let newFiles = files.filter((item) => item.name !== name);
    setFiles(newFiles);
  };

  //api function to upload images
  const { isLoading: uploading, mutate: upload, isSuccess: uploaded } = useUploadImages(onImageUpload);
  return (
    <React.Fragment>
      <Head title="Service Providers"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page>Service Providers</BlockTitle>
            </BlockHeadContent>
            {/* <BlockHeadContent>
              <div className="toggle-wrap nk-block-tools-toggle">
                <Button
                  className="toggle btn-icon d-md-none"
                  color="primary"
                  onClick={() => {
                    toggle("add");
                  }}
                >
                  <Icon name="plus"></Icon>
                </Button>
                <Button
                  className="toggle d-none d-md-inline-flex"
                  color="primary"
                  onClick={() => {
                    toggle("add");
                  }}
                >
                  <Icon name="plus"></Icon>
                  <span>Add Provider</span>
                </Button>
              </div>
            </BlockHeadContent> */}
          </BlockBetween>
        </BlockHead>

        <Block>
          <Card>
            <div className="card-inner border-bottom">
              <div className="card-title-group">
                <div className="card-title">
                  <h5 className="title">All Service providers</h5>
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
                                // setfilters({});
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
                ) : providers?.meta?.total > 0 ? (
                  <>
                    <DataTableBody className="is-compact">
                      <DataTableHead className="tb-tnx-head bg-white fw-bold text-secondary">
                        <DataTableRow size="sm">
                          <span className="tb-tnx-head bg-white text-secondary">Provider Name</span>
                        </DataTableRow>
                        <DataTableRow>
                          <span className="tb-tnx-head bg-white text-secondary">Product Type</span>
                        </DataTableRow>
                        <DataTableRow>
                          <span className="tb-tnx-head bg-white text-secondary">Service Count</span>
                        </DataTableRow>
                        <DataTableRow>
                          <span className="tb-tnx-head bg-white text-secondary">Date Added</span>
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
                      {providers?.data?.map((item, idx) => {
                        return (
                          <DataTableItem key={item.id} className="text-secondary">
                            <DataTableRow>
                              <span className="tb-product">
                                <img
                                  src={item.logo ? item.logo : NoIcon}
                                  alt={"provider logo for " + item.name}
                                  className="thumb d-none d-lg-inline-flex"
                                />
                                <span className="title">{item.name}</span>
                              </span>
                            </DataTableRow>

                            {/* <DataTableRow>
                              <span className="text-capitalize"> {item?.purpose}</span>
                            </DataTableRow> */}
                            <DataTableRow>
                              {item?.product_type?.map((type, index) => {
                                if (index <= 1) {
                                  return (
                                    <span key={index} className="ccap pe-1">
                                      {type}
                                    </span>
                                  );
                                }
                              })}
                              {item?.product_type?.length > 2 && <span>& {item?.product_type?.length - 2} more.</span>}
                            </DataTableRow>
                            <DataTableRow>
                              <span className="text-capitalize"> {item?.service_count}</span>
                            </DataTableRow>
                            <DataTableRow>
                              <span>{formatDate(item.created_at)}</span>
                            </DataTableRow>
                            <DataTableRow>
                              <span className={`dot bg-${item.active ? "success" : "warning"} d-sm-none`}></span>
                              <Badge
                                className="badge-sm badge-dot has-bg d-none d-sm-inline-flex"
                                color={item.active ? "success" : "warning"}
                              >
                                <span className="ccap">{item.active ? "active" : "inactive"}</span>
                              </Badge>
                            </DataTableRow>

                            <DataTableRow className="tb-odr-action">
                              <div className="tb-odr-btns d-none d-md-inline">
                                <Button
                                  color="primary"
                                  className="btn-sm"
                                  onClick={(ev) => {
                                    navigate(`/service-providers/${item.id}`);
                                  }}
                                >
                                  View services
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
                                      <li>
                                        <DropdownItem
                                          tag="a"
                                          href="#"
                                          onClick={(ev) => {
                                            ev.preventDefault();
                                            setEditedId(item.id);
                                            onEditClick(item.id);
                                            toggle("logo");
                                          }}
                                        >
                                          <Icon name="edit"></Icon>
                                          <span>Edit logo</span>
                                        </DropdownItem>
                                      </li>
                                      <li>
                                        <DropdownItem
                                          tag="a"
                                          href="#"
                                          onClick={(ev) => {
                                            ev.preventDefault();
                                            setEditedId(item.id);
                                            onEditClick(item.id);
                                            toggle("types");
                                          }}
                                        >
                                          <Icon name="unarchive"></Icon>
                                          <span>Update products</span>
                                        </DropdownItem>
                                      </li>
                                      <li>
                                        <DropdownItem
                                          tag="a"
                                          href="#"
                                          onClick={(ev) => {
                                            ev.preventDefault();
                                            setEditedId(item.id);
                                            onEditClick(item.id);
                                            toggle("details");
                                          }}
                                        >
                                          <Icon name="eye"></Icon>
                                          <span>View Details</span>
                                        </DropdownItem>
                                      </li>
                                      <li>
                                        <DropdownItem
                                          tag="a"
                                          href="#"
                                          onClick={(ev) => {
                                            ev.preventDefault();
                                            onEditClick(item.id);
                                            updateStatus();
                                          }}
                                        >
                                          <Icon name={item.active ? "cross" : "check"}></Icon>
                                          <span>{item.active ? "Deactivate" : "Activate"}</span>
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
                      {providers?.meta?.total > 0 && (
                        <PaginationComponent
                          itemPerPage={itemsPerPage}
                          totalItems={providers?.meta?.total}
                          paginate={paginate}
                          currentPage={Number(currentPage)}
                        />
                      )}
                    </div>
                  </>
                ) : (
                  <div className="text-center" style={{ paddingBlock: "1rem" }}>
                    <span className="text-silent">No Provider record found</span>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </Block>

        {/* ADD CATEGORIES */}
        <Modal isOpen={view.add || view.edit} toggle={() => onFormCancel()} className="modal-dialog-centered" size="md">
          <ModalBody className="bg-white rounded">
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
            <div className="p-2">
              <h5 className="title">{view.add ? "Add" : "Edit"} Account</h5>
              <div className="mt-4">
                <form onSubmit={handleSubmit(onFormSubmit)}>
                  <Row className="g-3">
                    <Col md="12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="bank_code">
                          Bank ID
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            {...register("bank_code", {
                              required: "This field is required",
                            })}
                            onChange={(e) => setFormData({ ...formData, bank_code: e.target.value })}
                            value={formData.bank_code}
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
                          {errors.account_number && <span className="invalid">{errors.account_number.message}</span>}
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
                      <Button color="primary" type="submit">
                        <Icon className="plus"></Icon>
                        <span>{view.add ? "Add" : "Verify"} Account</span>
                      </Button>
                    </Col>
                  </Row>
                </form>
              </div>
            </div>
          </ModalBody>
        </Modal>

        <EditProductTypes
          modal={view.types}
          closeModal={() => onFormCancel()}
          data={providers?.data}
          formData={formData}
          editFunction={updateProvider}
        />
        {/* Update logo */}
        <Modal isOpen={view.logo} toggle={() => onFormCancel()} className="modal-dialog-centered" size="md">
          <ModalBody className="bg-white rounded">
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
            <div className="p-2">
              <h5 className="title"> Edit Logo</h5>
              <div className="mt-4">
                <form onSubmit={handleSubmit(onFormSubmit)}>
                  <Row className="g-3">
                    <Col>
                      <div>
                        <Dropzone multiple onDrop={(acceptedFiles) => handleDropChange(acceptedFiles)}>
                          {({ getRootProps, getInputProps }) => (
                            <section>
                              <div
                                {...getRootProps()}
                                className="dropzone upload-zone small bg-lighter my-2 dz-clickable bg-white"
                              >
                                <input {...getInputProps()} />
                                {files.length === 0 && <p>Drag 'n' drop some files here, or click to select files</p>}
                                {files.map((file) => (
                                  <div
                                    key={file.name}
                                    style={{
                                      position: "relative",
                                    }}
                                    className="dz-preview dz-processing dz-image-preview dz-error dz-complete"
                                  >
                                    <div className="dz-image">
                                      <img src={file.preview} alt="preview" style={{ objectFit: "cover" }} />
                                    </div>

                                    <div
                                      role="button"
                                      onClick={(e) => removeImage(e, file.name)}
                                      style={{
                                        position: "absolute",
                                        top: 0,
                                        right: 0,
                                        zIndex: 50,
                                        paddingInline: "0.25rem",
                                        paddingBlock: "0.05rem",
                                        backgroundColor: "whitesmoke",
                                        borderRadius: "9999px",
                                        cursor: "pointer",
                                      }}
                                    >
                                      <Icon name="cross" style={{ cursor: "pointer" }} />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </section>
                          )}
                        </Dropzone>
                        {!uploaded && (
                          <Button
                            disabled={uploading}
                            color="primary"
                            size="md"
                            type="button"
                            onClick={uploadImageToImageKit}
                          >
                            {uploading ? "Uploading" : "Upload"}
                          </Button>
                        )}
                      </div>
                    </Col>

                    {uploaded && (
                      <Col size="12">
                        <Button color="primary" type="submit">
                          <Icon className="plus"></Icon>
                          <span>{view.add ? "Add" : "Verify"} Account</span>
                        </Button>
                      </Col>
                    )}
                  </Row>
                </form>
              </div>
            </div>
          </ModalBody>
        </Modal>

        {/* View */}
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
            <div className="p-2">
              <div className="nk-modal-head">
                <h5 className="title">View Provider</h5>
                <div>
                  <img src={formData.logo} alt="logo" />
                </div>
              </div>
              <div className="mt-4">
                <Row className="gy-3">
                  <Col>
                    <span className="sub-text">Provider Name</span>
                    <span className="caption-text text-primary">{formData.name}</span>
                  </Col>
                  <Col>
                    <span className="sub-text">Product Type</span>
                    <span className="caption-text">
                      {formData.product_type?.map((item, index) => (
                        <span className="ccap pe-1" key={index}>
                          {item}
                        </span>
                      ))}
                    </span>
                  </Col>
                  <Col lg={6}>
                    <span className="sub-text">Provider Status</span>
                    <span className={`caption-text ${formData.active ? "text-success" : "text-warning"}`}>
                      {formData.active ? "Active" : "Inactive"}
                    </span>
                  </Col>

                  <Col lg={6}>
                    <span className="sub-text">Date Created</span>
                    <span className="caption-text">{formatDateWithTime(formData.created_at)}</span>
                  </Col>
                </Row>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </Content>
    </React.Fragment>
  );
};

export default ServiceProviders;
