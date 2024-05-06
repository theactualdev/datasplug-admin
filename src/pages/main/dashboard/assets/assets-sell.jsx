import React, { useCallback, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Badge, Card, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap";
import { useGetAssetsTransactions } from "../../../../api/assets";
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
import { formatDateWithTime, formatter } from "../../../../utils/Utils";
import LoadingSpinner from "../../../components/spinner";
import Search from "../tables/Search";
import SortToolTip from "../tables/SortTooltip";
import { FilterOptions } from "../tables/filter-select";
import { assetFilterOptions } from "./data";
import { StatsCard, StatsDetailsCard } from "./stats-card";

const AssetSellPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const itemsPerPage = searchParams.get("limit") ?? 100;
  const currentPage = searchParams.get("page") ?? 1;
  const search = searchParams.get("search") ?? "";
  const status = searchParams.get("status") ?? "";
  const type = "sell";
  const { isLoading, data, error } = useGetAssetsTransactions(currentPage, itemsPerPage, search, status, type);
  //   console.log(data);
  const [view, setView] = useState({
    edit: false,
    add: false,
    details: false,
  });
  const [onSearch, setonSearch] = useState(false);

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
    } else if (status === "success") {
      return "success";
    } else if (status === "transferred") {
      return "info";
    } else {
      return "danger";
    }
  }, []);

  //scroll off when sidebar shows
  // useEffect(() => {
  //   view.add ? document.body.classList.add("toggle-shown") : document.body.classList.remove("toggle-shown");
  // }, [view.add]);

  return (
    <React.Fragment>
      <Head title="Assets"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle>Assets</BlockTitle>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>
        <Row className="mb-5">
          <Col lg={4}>
            <StatsCard data={data?.stat?.sell} />
          </Col>
          <Col lg={8}>
            <StatsDetailsCard data={data?.stat?.sell} />
            {/* <StatsCard title={"Stats 2"} value={2} /> */}
          </Col>
        </Row>
        {/* PRODUCT TABLE HERE */}
        <Block>
          <Card>
            <div className="card-inner border-bottom">
              <div className="card-title-group">
                <div className="card-title">
                  <h5 className="title">Assets Transactions</h5>
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
                      <FilterOptions options={assetFilterOptions} />
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
                <Search onSearch={onSearch} setonSearch={setonSearch} placeholder="reference" />
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
                          <span className="tb-tnx-head bg-white text-secondary">Reference No</span>
                        </DataTableRow>
                        <DataTableRow size="md">
                          <span className="tb-tnx-head bg-white text-secondary">Amount</span>
                        </DataTableRow>
                        <DataTableRow>
                          <span className="tb-tnx-head bg-white text-secondary">Date</span>
                        </DataTableRow>
                        <DataTableRow>
                          <span className="tb-tnx-head bg-white text-secondary">Type</span>
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
                              <span>{index + 1}</span>
                            </DataTableRow>
                            <DataTableRow size="sm" className="text-primary fw-bold">
                              <Link to={`/user-details/${item?.user?.id}`} className="title">
                                {item?.user?.firstname} {item?.user?.lastname}
                              </Link>
                            </DataTableRow>
                            <DataTableRow>
                              <span>{item.reference}</span>
                            </DataTableRow>
                            <DataTableRow>
                              <span>{formatter("NGN").format(item.payable_amount)}</span>
                            </DataTableRow>
                            <DataTableRow>
                              <span>{formatDateWithTime(item.created_at)}</span>
                            </DataTableRow>

                            {/* <DataTableRow size="md" className="tnx-desc">
                              <span>{formatDate(item.startDate)}</span> - <span>{formatDate(item.endDate)}</span>
                            </DataTableRow> */}
                            <DataTableRow>
                              <span className="ccap"> {item.trade_type}</span>
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
                                              navigate(`/assets-details/${item.id}`);
                                              // onEditClick(item.id);
                                            }}
                                          >
                                            <Icon name="eye"></Icon>
                                            <span>View</span>
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
                    <span className="text-silent">No Transaction found</span>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </Block>
      </Content>
    </React.Fragment>
  );
};

export default AssetSellPage;
