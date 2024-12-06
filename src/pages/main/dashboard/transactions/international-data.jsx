import React from "react";
import { BlockBetween, BlockHead, BlockHeadContent, BlockTitle } from "../../../../components/Component";
import Content from "../../../../layout/content/Content";
import Head from "../../../../layout/head/Head";
import { TransactionTable } from "./table";

const InternationalDataTransactionsPage = () => {
  return (
    <React.Fragment>
      <Head title="International Data Transactions"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle>International Data Transactions</BlockTitle>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>
        {/* PRODUCT TABLE HERE */}
        <TransactionTable purpose={"international-data"} />
      </Content>
    </React.Fragment>
  );
};

export default InternationalDataTransactionsPage;
