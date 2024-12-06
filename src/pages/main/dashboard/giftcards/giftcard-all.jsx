import React, { useCallback, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetGiftcardTransactions } from "../../../../api/giftcard";
import { BlockBetween, BlockHead, BlockHeadContent, BlockTitle, Col, Row } from "../../../../components/Component";
import Content from "../../../../layout/content/Content";
import Head from "../../../../layout/head/Head";
import { AmountStatsCard, StatsDetailsCard } from "./stats-card";
import GiftcardTable from "./table";

const AllGiftCardListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const itemsPerPage = searchParams.get("limit") ?? 100;
  const currentPage = searchParams.get("page") ?? 1;
  const search = searchParams.get("search") ?? "";
  const status = searchParams.get("status") ?? "";
  const type = "";
  const { isLoading, data, error } = useGetGiftcardTransactions(currentPage, itemsPerPage, search, status, type);

  return (
    <React.Fragment>
      <Head title="Assets"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle>Giftcard</BlockTitle>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>

        <Row className="mb-5">
          <Col lg={4}>
            <AmountStatsCard data={data?.stat?.sell} />
          </Col>
          <Col lg={8}>
            <StatsDetailsCard data={data?.stat?.sell} />
          </Col>
        </Row>
        {/* PRODUCT TABLE HERE */}
        <GiftcardTable />
      </Content>
    </React.Fragment>
  );
};

export default AllGiftCardListPage;
