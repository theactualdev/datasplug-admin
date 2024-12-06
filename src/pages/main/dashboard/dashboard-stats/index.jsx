import { useGetAllTransactions, useGetWithdrawalTransactions } from "../../../../api/transactions";
import { WalletAmountStatsCard } from "../giftcards/stats-card";
import { WalletStatsCard } from "../wallet/stats-card";
import { Row, Col, Icon } from "../../../../components/Component";
import { ServicesStatsCard } from "../transactions/stats-card";
import { Card } from "reactstrap";
import { formatter } from "../../../../utils/Utils";
import { useGetGiftcardTransactions } from "../../../../api/giftcard";
import { useGetAssetsTransactions } from "../../../../api/assets";

export function WalletStatsSection() {
  const { isLoading, data } = useGetWithdrawalTransactions();
  return (
    <Row className="g-gs">
      <Col lg={5}>
        <WalletAmountStatsCard
          data={data?.stat["all"]?.total?.amount || 0}
          successful={data?.stat["all"]?.successful?.amount || 0}
        />
      </Col>
      <Col lg={7}>
        <WalletStatsCard data={data?.stat["all"]} />
      </Col>
    </Row>
  );
}

export function ServicesStatsSection() {
  const { isLoading, data } = useGetAllTransactions();
  return (
    <Row className="g-gs">
      <Col lg={5}>
        <WalletAmountStatsCard
          data={data?.stat["all"]?.total?.amount || 0}
          successful={data?.stat["all"]?.successful?.amount || 0}
        />
      </Col>
      <Col lg={7}>
        <ServicesStatsCard data={data?.stat ? data?.stat["all"] : null} />
      </Col>
    </Row>
  );
}

export function AllServicesStats() {
  const { isLoading, data } = useGetAllTransactions();
  const { isLoading: giftcardLoading, data: giftcardData } = useGetGiftcardTransactions();
  const { isLoading: assetLoading, data: assetData } = useGetAssetsTransactions();
  //   console.log(assetData?.stat);
  return (
    <Row className="g-gs">
      <Col lg={6}>
        <Card className="h-100">
          <div className="card-inner">
            <div className="card-title-group mb-2">
              <div className="card-title">
                <h6 className="title">All Services Statistics</h6>
              </div>
            </div>

            <ul className="nk-store-statistics">
              <li className="item">
                <div className="info">
                  <div className="title">Total Airtime Sold</div>
                  <div className="count">
                    {formatter("NGN").format(data?.stat["airtime"]?.total?.amount ?? 0)} (
                    <span className="text-soft">{data?.stat["airtime"]?.total?.count}</span>)
                  </div>
                </div>
                <Icon name="bag" className="bg-primary-dim"></Icon>
              </li>
              <li className="item">
                <div className="info">
                  <div className="title">Total International Airtime Sold</div>
                  <div className="count">
                    {formatter("NGN").format(data?.stat["international-airtime"]?.total?.amount ?? 0)} (
                    <span className="text-soft">{data?.stat["international-airtime"]?.total?.count}</span>)
                  </div>
                </div>
                <Icon name="users" className="bg-info-dim"></Icon>
              </li>
              <li className="item">
                <div className="info">
                  <div className="title">Total Data Sold </div>
                  <div className="count">
                    {formatter("NGN").format(data?.stat["data"]?.total?.amount ?? 0)} (
                    <span className="text-soft">{data?.stat["data"]?.total?.count}</span>)
                  </div>
                </div>
                <Icon name="box" className="bg-pink-dim"></Icon>
              </li>
              <li className="item">
                <div className="info">
                  <div className="title">Total International Data Sold</div>
                  <div className="count">
                    {formatter("NGN").format(data?.stat["international-data"]?.total?.amount ?? 0)} (
                    <span className="text-soft">{data?.stat["international-data"]?.total?.count}</span>)
                  </div>
                </div>
                <Icon name="server" className="bg-purple-dim"></Icon>
              </li>
              <li className="item">
                <div className="info">
                  <div className="title">Total Betting Topup</div>
                  <div className="count">
                    {formatter("NGN").format(data?.stat["betting"]?.total?.amount ?? 0)} (
                    <span className="text-soft">{data?.stat["betting"]?.total?.count}</span>)
                  </div>
                </div>
                <Icon name="server" className="bg-purple-dim"></Icon>
              </li>
              <li className="item">
                <div className="info">
                  <div className="title">Cable tv Sold</div>
                  <div className="count">
                    {formatter("NGN").format(data?.stat["tv"]?.total?.amount ?? 0)} (
                    <span className="text-soft">{data?.stat["tv"]?.total?.count}</span>)
                  </div>
                </div>
                <Icon name="server" className="bg-purple-dim"></Icon>
              </li>
            </ul>
          </div>
        </Card>
      </Col>

      <Col lg={6}>
        <Card className="h-100">
          <div className="card-inner">
            <div className="card-title-group mb-2">
              <div className="card-title">
                <h6 className="title">All Services Statistics</h6>
              </div>
            </div>

            <ul className="nk-store-statistics">
              <li className="item">
                <div className="info">
                  <div className="title">Total Electricity Sold</div>
                  <div className="count">
                    {formatter("NGN").format(data?.stat["electricity"]?.total?.amount ?? 0)} (
                    <span className="text-soft">{data?.stat["electricity"]?.total?.count}</span>)
                  </div>
                </div>
                <Icon name="bag" className="bg-primary-dim"></Icon>
              </li>
              <li className="item">
                <div className="info">
                  <div className="title">Total Education Sold</div>
                  <div className="count">
                    {formatter("NGN").format(data?.stat["education"]?.total?.amount ?? 0)} (
                    <span className="text-soft">{data?.stat["education"]?.total?.count}</span>)
                  </div>
                </div>
                <Icon name="users" className="bg-info-dim"></Icon>
              </li>
              <li className="item">
                <div className="info">
                  <div className="title">Total Giftcards Sales </div>
                  <div className="count">
                    {formatter("NGN").format(0 ?? 0)} (
                    <span className="text-soft">{giftcardData?.stat?.sell?.total ?? 0}</span>)
                  </div>
                </div>
                <Icon name="box" className="bg-pink-dim"></Icon>
              </li>
              <li className="item">
                <div className="info">
                  <div className="title">Total Crypto Sold</div>
                  <div className="count">
                    {formatter("NGN").format(0 ?? 0)} (
                    <span className="text-soft">{assetData?.stat.buy?.total ?? 0}</span>)
                  </div>
                </div>
                <Icon name="server" className="bg-purple-dim"></Icon>
              </li>
              <li className="item">
                <div className="info">
                  <div className="title">Total Crypto Purchases</div>
                  <div className="count">
                    {formatter("NGN").format(0 ?? 0)} (
                    <span className="text-soft">{assetData?.stat.sell?.total ?? 0}</span>)
                  </div>
                </div>
                <Icon name="server" className="bg-purple-dim"></Icon>
              </li>
              <li className="item">
                <div className="info">
                  <div className="title">Total Flights Sold</div>
                  <div className="count">
                    {formatter("NGN").format(data?.stat["flights"]?.total?.amount ?? 0)} (
                    <span className="text-soft">{data?.stat["flights"]?.total?.count ?? 0}</span>)
                  </div>
                </div>
                <Icon name="server" className="bg-purple-dim"></Icon>
              </li>
            </ul>
          </div>
        </Card>
      </Col>
    </Row>
  );
}
