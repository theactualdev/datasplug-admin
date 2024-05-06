import { DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap";
import { Button, Col, Icon, RSelect, Row } from "../../../../components/Component";
import { objectToQueryString } from "../../../../utils/Utils";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { useState } from "react";

export const filterProductStatus = [
  { value: "active", label: "active" },
  { value: "pending", label: "pending" },
  { value: "inactive", label: "inactive" },
  { value: "deleted", label: "deleted" },
];

// const filterOptions = [
//   {
//     name: "status",
//     options: [
//       { value: "active", label: "active" },
//       { value: "pending", label: "pending" },
//       { value: "inactive", label: "inactive" },
//       { value: "deleted", label: "deleted" },
//     ],
//   },
//   {
//     name: "type",
//     options: [
//       { value: "buy", label: "Buy" },
//       { value: "sell", label: "Sell" },
//     ],
//   },
// ];

export const FilterOptions = ({ options = [] }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [filters, setfilters] = useState({});

  // function to filter data
  const filterData = () => {
    if (Object.keys(filters).length === 0) {
      return;
    }

    const filterQuries = objectToQueryString(filters);
    navigate(`${pathname}?${filterQuries}`, { replace: true });
    toggle();
  };

  const resetFilter = () => {
    let params = new URLSearchParams(searchParams);
    let keys = [];
    for (const key of searchParams.keys()) {
      keys.push(key);
    }

    options.forEach((item) => {
      if (keys.includes(item.name)) {
        params.delete(item.name);
      }
    });

    navigate(`${pathname}?${params}`, { replace: true });
    setfilters({});
    toggle();
  };

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <UncontrolledDropdown isOpen={isOpen} toggle={toggle}>
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
            {options.map((item, index) => (
              <Col key={index} size={options.length <= 1 ? "12" : "6"}>
                <div className="form-group">
                  <label className="overline-title overline-title-alt">{item?.name}</label>
                  <RSelect
                    options={item.options}
                    placeholder={`Any ${item.name}`}
                    value={filters[item.name] && { label: filters[item.name], value: filters[item.name] }}
                    isSearchable={false}
                    onChange={(e) => setfilters({ ...filters, [item.name]: e.value })}
                  />
                </div>
              </Col>
            ))}
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
              resetFilter();
            }}
            className="clickable"
          >
            Reset Filter
          </a>
        </div>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};
