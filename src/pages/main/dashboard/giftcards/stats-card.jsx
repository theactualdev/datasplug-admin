import React, { useMemo } from "react";
import { Card } from "reactstrap";
import { Icon } from "../../../../components/Component";
import { formatter } from "../../../../utils/Utils";

export const AmountStatsCard = ({ data }) => {
  const total = useMemo(() => {
    if (data) {
      return data?.approved_payable_amount + data?.approved_amount;
    } else {
      return 0;
    }
  }, [data]);
  return (
    <Card>
      <div className="card-inner">
        <ul className="nk-tranx-statistics">
          <li className="item">
            <Icon name="sign-kobo" className="bg-primary-dim"></Icon>
            <div className="info">
              <div className="title">Total Earnings</div>
              <div className="count">{formatter("NGN").format(total)}</div>
            </div>
          </li>
          {/* <li className="item">
            <Icon name="sign-kobo" className="bg-primary-dim"></Icon>
            <div className="info">
              <div className="title">Total Amount</div>
              <div className="count">{formatter("NGN").format(total)}</div>
            </div>
          </li> */}
        </ul>
      </div>
    </Card>
  );
};

export const StatsDetailsCard = ({ data }) => {
  return (
    <Card>
      <div className="card-inner">
        <ul className="nk-tranx-statistics">
          <li className="item">
            <Icon name="check" className="bg-success-dim"></Icon>
            <div className="info">
              <div className="title">Successful</div>
              <div className="count">{data?.approved || 0}</div>
            </div>
          </li>
          <li className="item">
            <Icon name="swap" className="bg-info-dim"></Icon>
            <div className="info">
              <div className="title">Transferred</div>
              <div className="count">{data?.transferred || 0}</div>
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

export const WalletAmountStatsCard = ({ data, successful }) => {
  return (
    <Card>
      <div className="card-inner">
        <ul className="nk-tranx-statistics">
          <li className="item">
            <Icon name="sign-kobo" className="bg-primary-dim"></Icon>
            <div className="info">
              <div className="title">Total Amount</div>
              <div className="count">{formatter("NGN").format(data)}</div>
            </div>
          </li>
          {successful && (
            <li className="item">
              <Icon name="sign-kobo" className="bg-success-dim"></Icon>
              <div className="info">
                <div className="title">Total Successful</div>
                <div className="count">{formatter("NGN").format(successful)}</div>
              </div>
            </li>
          )}
        </ul>
      </div>
    </Card>
  );
};
