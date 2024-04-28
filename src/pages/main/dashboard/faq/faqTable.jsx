import React, { useCallback, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Badge, DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap";
import {
  Button,
  Col,
  DataTable,
  DataTableBody,
  DataTableHead,
  DataTableItem,
  DataTableRow,
  Icon,
  PaginationComponent,
  PreviewAltCard,
  RSelect,
  Row,
} from "../../../../components/Component";
import ProductH from "../../../../images/product/h.png";
import LoadingSpinner from "../../../components/spinner";
import SortToolTip from "../tables/SortTooltip";
import { faqStatusType } from "./faqData";
import { formatDateWithTime } from "../../../../utils/Utils";

const FaqTable = ({ faqTitle, data, headers, dataKeys, isLoading, defaultData, action: Action }) => {
  const [onSearch, setonSearch] = useState(false);
  const [onSearchText, setSearchText] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();
  const itemsPerPage = searchParams.get("limit") ? Number(searchParams.get("limit")) : 100;
  const currentPage = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  const [filters, setfilters] = useState({});

  //paginate
  const paginate = (pageNumber) => {
    setSearchParams((searchParams) => {
      searchParams.set("page", pageNumber);
      return searchParams;
    });
  };
  // function to filter catelog
  const onFilterChange = (e) => {
    setSearchText(e.target.value);
  };

  // function to filter data
  const filterData = useCallback(() => {
    return;
  }, [filters]);

  return (
    <DataTable className="is-compact">
      <div className="card-inner">
        <div className="card-title-group">
          <div className="card-title">
            <h5 className="title">All {faqTitle}</h5>
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
                            <label className="overline-title overline-title-alt">Status</label>
                            <RSelect
                              options={faqStatusType}
                              placeholder="Any Status"
                              value={filters.status && { label: filters.status, value: filters.status }}
                              isSearchable={false}
                              onChange={(e) => setfilters({ ...filters, status: e.value })}
                            />
                          </div>
                        </Col>

                        <Col size="12">
                          <div className="form-group">
                            <Button type="button" onClick={filterData} className="btn btn-secondary">
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
                          setData(defaultData);
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
                placeholder={`Search by name`}
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
      ) : (
        <>
          <DataTableBody bodyclass="nk-tb-tnx">
            <DataTableHead className="nk-tb-item">
              <DataTableRow className="nk-tb-col-check">
                <span>S/N</span>
              </DataTableRow>
              {headers.map((header, idx) => (
                <DataTableRow key={idx}>
                  <span className="tb-tnx-head bg-white text-secondary">{header}</span>
                </DataTableRow>
              ))}

              <DataTableRow className="nk-tb-col-tools">
                <ul className="nk-tb-actions gx-1 my-n1">
                  <li>
                    <UncontrolledDropdown>
                      <DropdownToggle tag="a" className="btn btn-trigger dropdown-toggle disabled btn-icon me-n1">
                        <Icon name="more-h"></Icon>
                      </DropdownToggle>
                    </UncontrolledDropdown>
                  </li>
                </ul>
              </DataTableRow>
            </DataTableHead>

            {data?.length > 0
              ? data.map((item, idx) => (
                  <DataTableItem key={item.id}>
                    <DataTableRow className="nk-tb-col-check">
                      <span>{idx + 1}</span>
                    </DataTableRow>
                    {dataKeys.map((key, idx) => {
                      if (item.image && key === "name")
                        return (
                          <DataTableRow key={idx}>
                            <span className="tb-product">
                              <img
                                src={item.image ? item.image : ProductH}
                                alt="product"
                                className="thumb d-none d-lg-inline-flex"
                              />
                              <span className="title">{item.name}</span>
                            </span>
                          </DataTableRow>
                        );
                      if (key === "status")
                        return (
                          <DataTableRow key={idx}>
                            <span
                              className={`dot bg-${item.status === "active" ? "success" : "warning"} d-sm-none`}
                            ></span>
                            <Badge
                              className="badge-sm badge-dot has-bg d-none d-sm-inline-flex"
                              color={item.status === "active" ? "success" : "warning"}
                            >
                              <span style={{ textTransform: "capitalize" }}>{item.status}</span>
                            </Badge>
                          </DataTableRow>
                        );

                      if (key === "faq_category")
                        return (
                          <DataTableRow key={idx}>
                            <span>{item.faq_category?.name}</span>
                          </DataTableRow>
                        );

                      if (key === "created_at")
                        return (
                          <DataTableRow key={idx}>
                            <span>{formatDateWithTime(item.created_at)}</span>
                          </DataTableRow>
                        );

                      return (
                        <DataTableRow key={idx}>
                          <span>{item[key]}</span>
                        </DataTableRow>
                      );
                    })}
                    {Action && (
                      <DataTableRow className="nk-tb-col-tools">
                        <Action id={item.id} status={item.status} />
                      </DataTableRow>
                    )}
                  </DataTableItem>
                ))
              : null}
          </DataTableBody>
          <PreviewAltCard>
            {data?.length > 0 ? (
              <PaginationComponent
                itemPerPage={itemsPerPage}
                totalItems={data.length}
                paginate={paginate}
                currentPage={currentPage}
              />
            ) : (
              <div className="text-center">
                <span className="text-silent">No {faqTitle} found</span>
              </div>
            )}
          </PreviewAltCard>
        </>
      )}
    </DataTable>
  );
};

export default FaqTable;
