import React from "react";
import { BlockBetween, BlockHead, BlockHeadContent, BlockTitle } from "../../../../components/Component";
import Content from "../../../../layout/content/Content";
import Head from "../../../../layout/head/Head";
import WithdrawalTable from "./table";

const AllWalletTransactionListPage = () => {
  return (
    <React.Fragment>
      <Head title="Wallet Transactions"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle>Withdrawal Transactions</BlockTitle>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>
        {/* PRODUCT TABLE HERE */}

        <WithdrawalTable />
      </Content>
    </React.Fragment>
  );
};

export default AllWalletTransactionListPage;
