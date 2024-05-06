import React from "react";
import { BlockBetween, BlockHead, BlockHeadContent, BlockTitle } from "../../../../components/Component";
import Content from "../../../../layout/content/Content";
import Head from "../../../../layout/head/Head";
import { TransactionTable } from "./table";

const BettingTransactionsPage = () => {
  return (
    <React.Fragment>
      <Head title="Betting Transactions"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle>Betting Transactions</BlockTitle>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>
        {/* PRODUCT TABLE HERE */}
        <TransactionTable purpose={"betting"} />
      </Content>
    </React.Fragment>
  );
};

export default BettingTransactionsPage;
