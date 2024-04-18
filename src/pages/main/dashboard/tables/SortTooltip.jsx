import React from "react";
import { useSearchParams } from "react-router-dom";
import { DropdownItem } from "reactstrap";

const SortToolTip = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const itemsPerPage = searchParams.get("limit") ?? 7;
  const changeLimit = (value) => {
    setSearchParams((searchParams) => {
      searchParams.set("limit", value);
      return searchParams;
    });
  };
  return (
    <>
      <ul className="link-check">
        <li>
          <span>Show</span>
        </li>
        <li className={itemsPerPage === 7 ? "active" : ""}>
          <DropdownItem
            tag="a"
            href="#dropdownitem"
            onClick={(ev) => {
              ev.preventDefault();
              changeLimit(7);
            }}
          >
            7
          </DropdownItem>
        </li>
        <li className={itemsPerPage === 20 ? "active" : ""}>
          <DropdownItem
            tag="a"
            href="#dropdownitem"
            onClick={(ev) => {
              ev.preventDefault();
              changeLimit(20);
            }}
          >
            20
          </DropdownItem>
        </li>
        <li className={itemsPerPage === 50 ? "active" : ""}>
          <DropdownItem
            tag="a"
            href="#dropdownitem"
            onClick={(ev) => {
              ev.preventDefault();
              changeLimit(50);
            }}
          >
            50
          </DropdownItem>
        </li>
        <li className={itemsPerPage === 100 ? "active" : ""}>
          <DropdownItem
            tag="a"
            href="#dropdownitem"
            onClick={(ev) => {
              ev.preventDefault();
            }}
          >
            100
          </DropdownItem>
        </li>
      </ul>
      {/* <ul className="link-check">
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
            //   sortFunc("asc");
            }}
          >
            ASC
          </DropdownItem>
        </li>
      </ul> */}
    </>
  );
};

export default SortToolTip;
