import React from "react";
import { Block, BlockBetween, BlockHead, BlockHeadContent, BlockTitle, Col, Row } from "../../../components/Component";
import StoreStatistics from "../../../components/partials/default/StoreStatistics";
import RecentOrders from "../../../components/partials/default/recent-orders/RecentOrders";
import TopProducts from "../../../components/partials/default/top-products/TopProducts";
import AverageOrder from "../../../components/partials/e-commerce/average-order/AverageOrder";
import Customer from "../../../components/partials/e-commerce/customers/Customer";
import Orders from "../../../components/partials/e-commerce/orders/Orders";
import TotalSales from "../../../components/partials/e-commerce/total-sales/TotalSales";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
import { WalletStatsSection, ServicesStatsSection, AllServicesStats } from "./dashboard-stats";
const Dashboard = () => {
  return (
    <React.Fragment>
      <Head title="Dashboard"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page>Dashboard</BlockTitle>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>

        <Block>
          <Row className="g-gs">
            <Col>
              <h5 className="mb-4">Total Wallet Transactions</h5>
              <WalletStatsSection />
            </Col>
            <Col>
              <h5 className="mb-4">Total Services Transactions</h5>
              <ServicesStatsSection />
            </Col>

            <Col>
              <h5 className="mb-4">All Services Statistics</h5>
              <AllServicesStats />
            </Col>
            {/* <Col xxl="4">
              <Row className="g-gs">
                <Col xxl="12" md="6">
                  <Orders />
                </Col>
                <Col xxl="12" md="6">
                  <Customer />
                </Col>
              </Row>
            </Col> */}
            {/* <Row className="g-gs">
              <Col xxl="3" sm="6">
                <DataCard
                  title="Today's Order"
                  percentChange={"4.63"}
                  up={true}
                  // chart={<DefaultOrderChart />}
                  amount={"1975"}
                />
              </Col>
              <Col xxl="3" sm="6">
                <DataCard
                  title="Today's Revenue"
                  percentChange={"2.63"}
                  up={false}
                  chart={<DefaultRevenueChart />}
                  amount={"$2293"}
                />
              </Col>
              <Col xxl="3" sm="6">
                <DataCard
                  title="Today's Customers"
                  percentChange={"4.63"}
                  up={true}
                  chart={<DefaultCustomerChart />}
                  amount={"847"}
                />
              </Col>
              <Col xxl="3" sm="6">
                <DataCard
                  title="Today's Visitors"
                  percentChange={"2.63"}
                  up={false}
                  chart={<DefaultVisitorChart />}
                  amount={"23,485"}
                />
              </Col>
            </Row> */}
            {/* 
            <Col xxl="8">
              <RecentOrders />
            </Col>
            <Col xxl="4" md="6">
              <TopProducts />
            </Col>
            <Col xxl="3" md="6">
              <StoreStatistics />
            </Col> */}
            {/* <Col xxl="5" lg="6">
              <TrafficSources />
            </Col>
            <Col xxl="4" lg="6">
              <StoreVisitors />
            </Col> */}
          </Row>
        </Block>
      </Content>
    </React.Fragment>
  );
};

export default Dashboard;
