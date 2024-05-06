import React from "react";
import { BlockBetween, BlockHead, BlockHeadContent, BlockTitle } from "../../../../components/Component";
import Content from "../../../../layout/content/Content";
import Head from "../../../../layout/head/Head";
import { TransactionTable } from "./table";

const AirtimeTransactionsPage = () => {
  return (
    <React.Fragment>
      <Head title="Airtime Transactions"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle>Airtime Transactions</BlockTitle>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>
        {/* PRODUCT TABLE HERE */}
        <TransactionTable purpose={"airtime"} />
      </Content>
    </React.Fragment>
  );
};

export default AirtimeTransactionsPage;
