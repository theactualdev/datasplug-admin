import React, { useCallback, useEffect, useMemo, useState } from "react";
import DatePicker from "react-datepicker";
import {
  orderData,
  filterCoin,
  filterProductType,
  filterPaymentmethod,
  filterStatus,
  filterType,
} from "../order/OrderData";
import {
  DataTableHead,
  DataTableItem,
  DataTableRow,
  Icon,
  TooltipComponent,
  PaginationComponent,
  PreviewAltCard,
  DataTableBody,
  DataTable,
  RSelect,
  Button,
  Row,
  Col,
} from "../../../../components/Component";
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem, ModalBody, Modal, Badge } from "reactstrap";
import { useForm } from "react-hook-form";
import { getDateStructured } from "../../../../utils/Utils";
import { useNavigate } from "react-router";
const OrderTable = ({ title = "All Orders" }) => {
  const navigate = useNavigate();
  const [data, setData] = useState(orderData);
  const [onSearch, setonSearch] = useState(false);
  const [filters, setfilters] = useState({});
  const [formData, setFormData] = useState({
    id: null,
    orderId: "",
    date: new Date(),
    status: "Delivered",
    customer: "",
    purchased: "",
    location: "",
    total: "",
    check: false,
  });
  const [view, setView] = useState({
    add: false,
    details: false,
  });
  const [onSearchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(7);
  const [sort, setSortState] = useState("");

  // Sorting data
  const sortFunc = (params) => {
    let defaultData = data;
    if (params === "asc") {
      let sortedData = defaultData.sort((a, b) => a.date.localeCompare(b.date));
      setData([...sortedData]);
    } else if (params === "dsc") {
      let sortedData = defaultData.sort((a, b) => b.date.localeCompare(a.date));
      setData([...sortedData]);
    }
  };

  // Changing state value when searching name
  // usecallback here
  useEffect(() => {
    if (onSearchText !== "") {
      const filteredObject = orderData.filter((item) => {
        return item.orderId.includes(onSearchText);
      });
      setData([...filteredObject]);
    } else {
      setData([...orderData]);
    }
  }, [onSearchText]);

  // toggle function to view order details
  const toggle = (type) => {
    setView({
      add: type === "add" ? true : false,
      details: type === "details" ? true : false,
    });
  };

  // selects all the orders
  const selectorCheck = (e) => {
    let newData;
    newData = data.map((item) => {
      item.check = e.currentTarget.checked;
      return item;
    });
    setData([...newData]);
  };

  // resets forms
  const resetForm = () => {
    setFormData({
      id: null,
      orderId: "",
      date: new Date(),
      status: "Delivered",
      customer: "",
      purchased: "",
      total: "",
      check: false,
    });
  };

  // Submits form data
  const onFormSubmit = (form) => {
    const { customer, purchased, total } = form;
    let submittedData = {
      id: data.length + 1,
      orderId: "95981",
      date: getDateStructured(formData.date),
      status: formData.status,
      customer: customer,
      purchased: purchased,
      total: total,
      check: false,
    };
    setData([submittedData, ...data]);
    setView({ add: false, details: false });
    resetForm();
  };

  useEffect(() => {
    reset(formData);
  }, [formData]);

  // function to load detail data
  const loadDetail = (id) => {
    let index = data.findIndex((item) => item.id === id);
    setFormData(data[index]);
  };

  // OnChange function to get the input data
  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // selects one product
  const onSelectChange = (e, id) => {
    let newData = data;
    let index = newData.findIndex((item) => item.id === id);
    newData[index].check = e.currentTarget.checked;
    setData([...newData]);
  };

  // onChange function for searching name
  const onFilterChange = (e) => {
    setSearchText(e.target.value);
  };

  // function to filter data
  const filterData = useCallback(() => {
    if (Object.keys(filters).length === 0) {
      return;
    }
    let newData = orderData.filter((item) => {
      return Object.keys(filters).every((key) => {
        return filters[key] === item[key];
      });
    });
    setData([...newData]);
  }, [filters]);

  // function to close the form modal
  const onFormCancel = () => {
    setView({ add: false, details: false });
    resetForm();
  };

  // function to change to approve property for an item
  const markAsDelivered = (id) => {
    let newData = data;
    let index = newData.findIndex((item) => item.id === id);
    newData[index].status = "Delivered";
    setData([...newData]);
  };

  // function to delete a Order
  const deleteOrder = (id) => {
    let defaultData = data;
    defaultData = defaultData.filter((item) => item.id !== id);
    setData([...defaultData]);
  };

  // function to delete the seletected item
  const selectorDeleteOrder = () => {
    let newData;
    newData = data.filter((item) => item.check !== true);
    setData([...newData]);
  };

  // function to change the complete property of an item
  const selectorMarkAsDelivered = () => {
    let newData;
    newData = data.map((item) => {
      if (item.check === true) item.status = "Delivered";
      return item;
    });
    setData([...newData]);
  };

  // Get current list, pagination
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Status Colors
  const statusColor = useCallback(
    (status) => {
      if (status === "Pending" || status === "In Process" || status === "In Transit") {
        return "warning";
      } else if (status === "Confirmed" || status === "Shipped") {
        return "info";
      } else if (status === "Delivered") {
        return "success";
      } else {
        return "danger";
      }
    },
    [currentItems]
  );

  return (
    <React.Fragment>
      <DataTable className="card-stretch is-compact">
        <div className="card-inner">
          <div className="card-title-group">
            <div className="card-title">
              <h5 className="title">{title}</h5>
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
                        {/* <div className="dropdown">
                              <Button size="sm" className="btn-icon">
                                <Icon name="more-h"></Icon>
                              </Button>
                            </div> */}
                      </div>
                      <div className="dropdown-body dropdown-body-rg">
                        <Row className="gx-6 gy-4">
                          <Col size="6">
                            <div className="form-group">
                              <label className="overline-title overline-title-alt">Type</label>
                              <RSelect
                                options={filterProductType}
                                placeholder="Product Type"
                                // onChange={(e) => setfilters({ ...filters, status: e.value })}
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
                                isSearchable={false}
                                onChange={(e) => setfilters({ ...filters, status: e.label })}
                              />
                            </div>
                          </Col>
                          {/* <Col size="6">
                                <div className="form-group">
                                  <label className="overline-title overline-title-alt">Pay Currency</label>
                                  <RSelect options={filterCoin} placeholder="Any coin" />
                                </div>
                              </Col>
                              <Col size="6">
                                <div className="form-group">
                                  <label className="overline-title overline-title-alt">Method</label>
                                  <RSelect options={filterPaymentmethod} placeholder="Any Method" />
                                </div>
                              </Col> */}

                          {/* <Col size="6">
                                <div className="form-group">
                                  <div className="custom-control custom-control-sm custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="includeDel" />
                                    <label className="custom-control-label" htmlFor="includeDel">
                                      {" "}
                                      Including Deleted
                                    </label>
                                  </div>
                                </div>
                              </Col> */}

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
                            setData(orderData);
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
                      <ul className="link-check">
                        <li>
                          <span>Show</span>
                        </li>
                        <li className={itemPerPage === 10 ? "active" : ""}>
                          <DropdownItem
                            tag="a"
                            href="#dropdownitem"
                            onClick={(ev) => {
                              ev.preventDefault();
                              setItemPerPage(10);
                            }}
                          >
                            10
                          </DropdownItem>
                        </li>
                        <li className={itemPerPage === 15 ? "active" : ""}>
                          <DropdownItem
                            tag="a"
                            href="#dropdownitem"
                            onClick={(ev) => {
                              ev.preventDefault();
                              setItemPerPage(15);
                            }}
                          >
                            15
                          </DropdownItem>
                        </li>
                      </ul>
                      <ul className="link-check">
                        <li>
                          <span>Order</span>
                        </li>
                        <li className={sort === "dsc" ? "active" : ""}>
                          <DropdownItem
                            tag="a"
                            href="#dropdownitem"
                            onClick={(ev) => {
                              ev.preventDefault();
                              setSortState("dsc");
                              sortFunc("dsc");
                            }}
                          >
                            DESC
                          </DropdownItem>
                        </li>
                        <li className={sort === "asc" ? "active" : ""}>
                          <DropdownItem
                            tag="a"
                            href="#dropdownitem"
                            onClick={(ev) => {
                              ev.preventDefault();
                              setSortState("asc");
                              sortFunc("asc");
                            }}
                          >
                            ASC
                          </DropdownItem>
                        </li>
                      </ul>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </li>
              </ul>
            </div>
            <div className={`card-search search-wrap ${onSearch && "active"}`}>
              <div className="search-content">
                <Button
                  onClick={() => {
                    setSearchText("");
                    setonSearch(false);
                  }}
                  className="search-back btn-icon toggle-search"
                >
                  <Icon name="arrow-left"></Icon>
                </Button>
                <input
                  type="text"
                  className="border-transparent form-focus-none form-control"
                  placeholder="Search by Order Id"
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
        <DataTableBody bodyclass="nk-tb-tnx">
          <DataTableHead className="nk-tb-item">
            <DataTableRow className="nk-tb-col-check">
              <div className="custom-control custom-control-sm custom-checkbox notext">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="pid-all"
                  onChange={(e) => selectorCheck(e)}
                />
                <label className="custom-control-label" htmlFor="pid-all"></label>
              </div>
            </DataTableRow>
            {/* <DataTableRow>
                  <span className="sub-text">Order</span>
                </DataTableRow>
                <DataTableRow size="md">
                  <span className="sub-text">Date</span>
                </DataTableRow>
                <DataTableRow>
                  <span className="sub-text">Status</span>
                </DataTableRow>
                <DataTableRow size="sm">
                  <span className="sub-text">Customer</span>
                </DataTableRow>
                <DataTableRow size="md">
                  <span className="sub-text">Purchased</span>
                </DataTableRow>
                <DataTableRow>
                  <span className="sub-text">Total</span>
                </DataTableRow> */}

            {/* TABLE HEADING */}
            <DataTableRow>
              <span className="sub-text">Order</span>
            </DataTableRow>
            <DataTableRow size="md">
              <span className="sub-text">Buyer name</span>
            </DataTableRow>
            <DataTableRow>
              <span className="sub-text">Phone</span>
            </DataTableRow>
            <DataTableRow size="sm">
              <span className="sub-text">Location</span>
            </DataTableRow>
            <DataTableRow>
              <span className="sub-text">Status</span>
            </DataTableRow>
            <DataTableRow size="md">
              <span className="sub-text">Items</span>
            </DataTableRow>
            <DataTableRow>
              <span className="sub-text">Order Date</span>
            </DataTableRow>
            <DataTableRow className="nk-tb-col-tools">
              <ul className="nk-tb-actions gx-1 my-n1">
                <li>
                  <UncontrolledDropdown>
                    <DropdownToggle tag="a" className="btn btn-trigger dropdown-toggle btn-icon me-n1">
                      <Icon name="more-h"></Icon>
                    </DropdownToggle>
                    <DropdownMenu end>
                      <ul className="link-list-opt no-bdr">
                        <li>
                          <DropdownItem
                            tag="a"
                            href="#markasdone"
                            onClick={(ev) => {
                              ev.preventDefault();
                              selectorMarkAsDelivered();
                            }}
                          >
                            <Icon name="truck"></Icon>
                            <span>Mark As Delivered</span>
                          </DropdownItem>
                        </li>
                        <li>
                          <DropdownItem
                            tag="a"
                            href="#remove"
                            onClick={(ev) => {
                              ev.preventDefault();
                              selectorDeleteOrder();
                            }}
                          >
                            <Icon name="trash"></Icon>
                            <span>Remove Orders</span>
                          </DropdownItem>
                        </li>
                      </ul>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </li>
              </ul>
            </DataTableRow>
          </DataTableHead>

          {currentItems.length > 0
            ? currentItems.map((item) => (
                <DataTableItem key={item.id}>
                  <DataTableRow className="nk-tb-col-check">
                    <div className="custom-control custom-control-sm custom-checkbox notext">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        defaultChecked={item.check}
                        id={item.id + "pid-all"}
                        key={Math.random()}
                        onChange={(e) => onSelectChange(e, item.id)}
                      />
                      <label className="custom-control-label" htmlFor={item.id + "pid-all"}></label>
                    </div>
                  </DataTableRow>
                  <DataTableRow>
                    <a href="#id" onClick={(ev) => ev.preventDefault()}>
                      #{item.orderId}
                    </a>
                  </DataTableRow>
                  <DataTableRow size="sm">
                    <span className="tb-sub">{item.customer}</span>
                  </DataTableRow>
                  <DataTableRow>
                    <span className="tb-sub">{item.phone}</span>
                  </DataTableRow>
                  <DataTableRow size="md">
                    <span className="tb-sub">{item.location}</span>
                  </DataTableRow>
                  <DataTableRow>
                    <span className={`dot bg-${item.status === "Delivered" ? "success" : "warning"} d-sm-none`}></span>
                    <Badge
                      className="badge-sm badge-dot has-bg d-none d-sm-inline-flex"
                      color={statusColor(item.status)}
                    >
                      {item.status}
                    </Badge>
                  </DataTableRow>

                  <DataTableRow size="md">
                    <span className="tb-sub text-primary">{item.purchased}</span>
                  </DataTableRow>

                  <DataTableRow size="md">
                    <span>{item.date}</span>
                  </DataTableRow>
                  <DataTableRow className="nk-tb-col-tools">
                    <ul className="nk-tb-actions gx-1">
                      {item.status !== "Delivered" && (
                        <li className="nk-tb-action-hidden" onClick={() => markAsDelivered(item.id)}>
                          <TooltipComponent
                            tag="a"
                            containerClassName="btn btn-trigger btn-icon"
                            id={"delivery" + item.id}
                            icon="truck"
                            direction="top"
                            text="Mark as Delivered"
                          />
                        </li>
                      )}
                      <li
                        className="nk-tb-action-hidden"
                        onClick={() => {
                          loadDetail(item.id);
                          toggle("details");
                        }}
                      >
                        <TooltipComponent
                          tag="a"
                          containerClassName="btn btn-trigger btn-icon"
                          id={"view" + item.id}
                          icon="eye"
                          direction="top"
                          text="Quick View"
                        />
                      </li>
                      <li>
                        <UncontrolledDropdown>
                          <DropdownToggle tag="a" className="btn btn-icon dropdown-toggle btn-trigger">
                            <Icon name="more-h"></Icon>
                          </DropdownToggle>
                          <DropdownMenu end>
                            <ul className="link-list-opt no-bdr">
                              <li>
                                <DropdownItem
                                  tag="a"
                                  href="#orderdetails"
                                  onClick={(ev) => {
                                    ev.preventDefault();
                                    navigate(`${import.meta.env.PUBLIC_URL}/order-details/${item.id}`);
                                  }}
                                >
                                  <Icon name="eye"></Icon>
                                  <span>Order Details</span>
                                </DropdownItem>
                              </li>
                              {item.status !== "Delivered" && (
                                <li>
                                  <DropdownItem
                                    tag="a"
                                    href="#dropdown"
                                    onClick={(ev) => {
                                      ev.preventDefault();
                                      markAsDelivered(item.id);
                                    }}
                                  >
                                    <Icon name="truck"></Icon>
                                    <span>Mark as Delivered</span>
                                  </DropdownItem>
                                </li>
                              )}
                              <li>
                                <DropdownItem
                                  tag="a"
                                  href="#dropdown"
                                  onClick={(ev) => {
                                    ev.preventDefault();
                                    // deleteOrder(item.id);
                                  }}
                                >
                                  <Icon name="exchange-v"></Icon>
                                  <span>Change Status</span>
                                </DropdownItem>
                              </li>
                            </ul>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </li>
                    </ul>
                  </DataTableRow>
                </DataTableItem>
              ))
            : null}
        </DataTableBody>
        <PreviewAltCard>
          {data.length > 0 ? (
            <PaginationComponent
              itemPerPage={itemPerPage}
              totalItems={data.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          ) : (
            <div className="text-center">
              <span className="text-silent">No orders found</span>
            </div>
          )}
        </PreviewAltCard>
      </DataTable>

      <Modal isOpen={view.add} toggle={() => onFormCancel()} className="modal-dialog-centered" size="lg">
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
            <h5 className="title">Add Order</h5>
            <div className="mt-4">
              <form onSubmit={handleSubmit(onFormSubmit)}>
                <Row className="g-3">
                  <Col md="12">
                    <div className="form-group">
                      <label className="form-label" htmlFor="customer">
                        Customer Name
                      </label>
                      <div className="form-control-wrap">
                        <input
                          type="text"
                          className="form-control"
                          {...register("customer", {
                            required: "This field is required",
                          })}
                          onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
                          value={formData.customer}
                        />
                        {errors.customer && <span className="invalid">{errors.customer.message}</span>}
                      </div>
                    </div>
                  </Col>
                  <Col md="6">
                    <div className="form-group">
                      <label className="form-label" htmlFor="date">
                        Date of order
                      </label>
                      <div className="form-control-wrap">
                        <DatePicker
                          selected={formData.date}
                          className="form-control"
                          onChange={(date) => setFormData({ ...formData, date: date })}
                        />
                        {errors.date && <span className="invalid">{errors.date.message}</span>}
                      </div>
                    </div>
                  </Col>
                  <Col md="6">
                    <div className="form-group">
                      <label className="form-label" htmlFor="purchased">
                        Purchased Product
                      </label>
                      <div className="form-control-wrap">
                        <input
                          type="text"
                          className="form-control"
                          {...register("purchased", { required: "This is required" })}
                          value={formData.purchased}
                          onChange={(e) => setFormData({ ...formData, purchased: e.target.value })}
                        />
                        {errors.purchased && <span className="invalid">{errors.purchased.message}</span>}
                      </div>
                    </div>
                  </Col>
                  <Col md="6">
                    <div className="form-group">
                      <label className="form-label" htmlFor="total">
                        Total Price
                      </label>
                      <div className="form-control-wrap">
                        <input
                          type="number"
                          className="form-control"
                          {...register("total", { required: "This is required" })}
                          value={formData.total}
                          onChange={(e) => setFormData({ ...formData, total: e.target.value })}
                        />
                        {errors.total && <span className="invalid">{errors.total.message}</span>}
                      </div>
                    </div>
                  </Col>
                  <Col md="6">
                    <div className="form-group">
                      <label className="form-label" htmlFor="status">
                        Status
                      </label>
                      <div className="form-control-wrap">
                        <RSelect
                          name="status"
                          options={[
                            { value: "On Hold", label: "On Hold" },
                            { value: "Delivered", label: "Delivered" },
                          ]}
                          onChange={(e) => setFormData({ ...formData, status: e.value })}
                          value={{ value: formData.status, label: formData.status }}
                        />
                      </div>
                    </div>
                  </Col>

                  <Col size="12">
                    <Button color="primary" type="submit">
                      <Icon className="plus"></Icon>
                      <span>Add Order</span>
                    </Button>
                  </Col>
                </Row>
              </form>
            </div>
          </div>
        </ModalBody>
      </Modal>

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
          <div className="nk-tnx-details mt-sm-3">
            <div className="nk-modal-head mb-3">
              <h5 className="title">Order Details</h5>
            </div>
            <Row className="gy-3">
              <Col lg={6}>
                <span className="sub-text">Order Id</span>
                <span className="caption-text">{formData.orderId}</span>
              </Col>
              <Col lg={6}>
                <span className="sub-text">Status</span>
                <span className={`dot bg-${formData.status === "Delivered" ? "success" : "warning"} d-sm-none`}></span>
                <Badge
                  className="badge-sm badge-dot has-bg d-none d-sm-inline-flex"
                  color={statusColor(formData.status)}
                >
                  {formData.status}
                </Badge>
              </Col>
              <Col lg={6}>
                <span className="sub-text">Customer</span>
                <span className="caption-text">{formData.customer}</span>
              </Col>
              <Col lg={6}>
                <span className="sub-text">Purchased Product</span>
                <span className="caption-text">{formData.purchased}</span>
              </Col>
              <Col lg={6}>
                <span className="sub-text">Total Price</span>
                <span className="caption-text">N{formData.total}</span>
              </Col>
            </Row>
          </div>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default OrderTable;
