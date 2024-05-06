import React from "react";
import { Card } from "reactstrap";
import { Icon } from "../../../../components/Component";

export const ServicesStatsCard = ({ data }) => {
  return (
    <Card>
      <div className="card-inner">
        <ul className="nk-tranx-statistics">
          <li className="item">
            <Icon name="sort-v" className="bg-primary-dim"></Icon>
            <div className="info">
              <div className="title">Total</div>
              <div className="count">{data?.total || 0}</div>
            </div>
          </li>
          <li className="item">
            <Icon name="check" className="bg-success-dim"></Icon>
            <div className="info">
              <div className="title">Successful</div>
              <div className="count">{data?.successful || 0}</div>
            </div>
          </li>

          <li className="item">
            <Icon name="update" className="bg-warning-dim"></Icon>
            <div className="info">
              <div className="title">Pending</div>
              <div className="count">{data?.pending || 0}</div>
            </div>
          </li>
          <li className="item">
            <Icon name="undo" className="bg-info-dim"></Icon>
            <div className="info">
              <div className="title">Reversed</div>
              <div className="count">{data?.reversed || 0}</div>
            </div>
          </li>
          <li className="item">
            <Icon name="cross" className="bg-danger-dim"></Icon>
            <div className="info">
              <div className="title">Failed</div>
              <div className="count">{data?.failed || 0}</div>
            </div>
          </li>
        </ul>
      </div>
    </Card>
  );
};
