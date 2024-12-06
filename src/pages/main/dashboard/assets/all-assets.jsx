import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetAssetsTransactions } from "../../../../api/assets";
import { BlockBetween, BlockHead, BlockHeadContent, BlockTitle, Row, Col } from "../../../../components/Component";
import Content from "../../../../layout/content/Content";
import Head from "../../../../layout/head/Head";
import AssetsTable from "./table";
import { StatsCard, StatsDetailsCard } from "./stats-card";

const AllAssetPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const itemsPerPage = searchParams.get("limit") ?? 100;
  const currentPage = searchParams.get("page") ?? 1;
  const search = searchParams.get("search") ?? "";
  const status = searchParams.get("status") ?? "";
  const type = "";
  const { isLoading, data, error } = useGetAssetsTransactions(currentPage, itemsPerPage, search, status, type);

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
          </Col>
        </Row>
        {/* PRODUCT TABLE HERE */}
        <AssetsTable type={type} />
      </Content>
    </React.Fragment>
  );
};

export default AllAssetPage;
