import React from "react";
import { BlockBetween, BlockHead, BlockHeadContent, BlockTitle } from "../../../../components/Component";
import Content from "../../../../layout/content/Content";
import Head from "../../../../layout/head/Head";
import { TransactionTable } from "./table";

const DataTransactionsPage = () => {
  return (
    <React.Fragment>
      <Head title="Data Transactions"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle>Data Transactions</BlockTitle>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>
        {/* PRODUCT TABLE HERE */}
        <TransactionTable purpose={"data"} />
      </Content>
    </React.Fragment>
  );
};

export default DataTransactionsPage;
