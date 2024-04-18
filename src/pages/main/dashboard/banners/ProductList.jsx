import React, { Suspense } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetAllProducts } from "../../../../api/product/products";
import { Block, BlockBetween, BlockHead, BlockHeadContent, BlockTitle } from "../../../../components/Component";
import Content from "../../../../layout/content/Content";
import Head from "../../../../layout/head/Head";
import LoadingSpinner from "../../../components/spinner";
import ProductTable from "../tables/ProductTable";

const BannersPage = () => {
  const [searchParams] = useSearchParams();

  const itemsPerPage = searchParams.get("limit") ?? 7;
  const currentPage = searchParams.get("page") ?? 1;
  const search = searchParams.get("search") ?? "";
  const type = searchParams.get("type") ?? undefined;
  const { isLoading, data, error } = useGetAllProducts(currentPage, itemsPerPage, search, type);

  return (
    <React.Fragment>
      <Head title="Banners"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle>Products</BlockTitle>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>
        {/* PRODUCT TABLE HERE */}
        <Block>
          <Suspense fallback={<LoadingSpinner />}>
            <ProductTable
              tableData={error ? [] : data}
              loading={isLoading}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
            />
          </Suspense>
        </Block>
      </Content>
    </React.Fragment>
  );
};

export default BannersPage;
