import {
  useState,
  useEffect,
  ChangeEvent,
  useRef,
  useCallback,
  lazy,
} from "react";

import Page from "@components/Page";
import { getAllProducts, Delete } from "~/repositories/product.service";
import { IProducts, IPagination } from "~/types";
import { If, Then, Else } from "react-if";
import SuspenseLoader from "@components/SuspenseLoader";

const MainTable = lazy(() => import("@components/Table/MainTable"));

const TABLE_PRODUCTSS_STRUCTURE: Array<string> = [
  "name",
  "sku",
  "type",
  "listprice",
];

const PRODUCT_SHARED_DATA: Record<string, string> = {
  addRoute: "/products/add-product",
  title: "Product List",
};

function ProductPage() {
  const [products, setProducts] = useState<IProducts[]>([]);
  const [pagination, setPagination] = useState<IPagination>({
    page: 0,
    limit: 50,
  });
  const [totalRows, setTotalRows] = useState(0);

  const ServiceRepo = useRef(getAllProducts);
  const ServiceDeleteRepo = useRef(Delete);

  const getAll = useCallback(
    async (pagination: IPagination) => {
      await ServiceRepo.current(pagination).then(
        (response: any) => {
          setProducts(response.data.data);
          setTotalRows(response.data.total);
        },
        (error: any) => {
          console.log(error);
        }
      );
    },
    [ServiceRepo]
  );
  useEffect(() => {
    getAll(pagination);
  }, [pagination, getAll]);

  const handlePageChange = (event: any, newPage: number): void => {
    setPagination(state => ({ ...state, page: newPage }));
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setPagination(state => ({ ...state, limit: parseInt(event.target.value) }));
  };

  const onDeleteProduct = useCallback(
    async (id: number) => {
      await ServiceDeleteRepo.current(id).then(
        async (response: any) => {
          setProducts(response.data.data);
          await getAll(pagination);
        },
        (error: any) => {
          console.log(error);
        }
      );
    },
    [ServiceDeleteRepo, pagination, getAll]
  );
  return (
    <>
      <Page>
        <If condition={products.length === 0}>
          <Then>
            <SuspenseLoader />
          </Then>
          <Else>
            <MainTable
              sharedData={PRODUCT_SHARED_DATA}
              tableRowColumns={TABLE_PRODUCTSS_STRUCTURE}
              pagination={pagination}
              handlePageChange={handlePageChange}
              handleLimitChange={handleLimitChange}
              onDeleteItem={onDeleteProduct}
              itemlist={products}
              basicRoute={"products"}
              totalRows={totalRows}
            />
          </Else>
        </If>
      </Page>
    </>
  );
}

export default ProductPage;
