import React from "react";
import { BlockBetween, BlockHead, BlockHeadContent, BlockTitle } from "../../../../components/Component";
import Content from "../../../../layout/content/Content";
import Head from "../../../../layout/head/Head";
import WithdrawalTable from "./table";

const WalletWithdrawalListPage = () => {
  return (
    <React.Fragment>
      <Head title="Withdrawal Transactions"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle>Withdrawal Transactions</BlockTitle>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>
        {/* PRODUCT TABLE HERE */}

        <WithdrawalTable type="withdrawal" />
      </Content>
    </React.Fragment>
  );
};

export default WalletWithdrawalListPage;
