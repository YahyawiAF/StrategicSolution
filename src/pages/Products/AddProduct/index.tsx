import { useState, useEffect, useCallback, useRef } from "react";
import Page from "@components/Page";
import SubPage from "@components/SubPage.tsx";
import ADDForm from "./AddForm";
import { useParams } from "react-router-dom";
import { Get, GetCategoryList } from "~/repositories/product.service";
import { IDefaultValuesProducts as IDefaultValues } from "~/types/insurance";
import SuspenseLoader from "@components/SuspenseLoader";
import { If, Then, Else } from "react-if";

function ProductsPage() {
  const [product, setProduct] = useState<IDefaultValues | null>(null);
  const [listForienKey, setListForienKey] = useState<{ [key: string]: any }>(
    []
  );
  const GetCategoryService = useRef(GetCategoryList);
  const { id } = useParams();

  const getCategoryList = useCallback(async () => {
    GetCategoryService.current().then(
      data => {
        delete data.data.products;
        setListForienKey(data.data);
      },
      error => {
        console.log(error);
      }
    );
  }, [GetCategoryService]);

  const getProduct = useCallback(
    async (id: string) => {
      Get(id).then(
        data => {
          setProduct(data.data[0]);
        },
        error => {
          console.log(error);
        }
      );
    },
    [id]
  );

  useEffect(() => {
    getCategoryList();
  }, []);

  useEffect(() => {
    if (id) {
      getProduct(id);
    }
  }, [id, getProduct]);

  return (
    <>
      <Page>
        <If condition={listForienKey.length === 0}>
          <Then>
            <SuspenseLoader />
          </Then>
          <Else>
            <SubPage title={"Insurance Details"}>
              <h1>Add Insurance Details in here</h1>
              {/* <ADDForm
                listForienKey={listForienKey}
                product={product}
                id={id}
              /> */}
            </SubPage>
          </Else>
        </If>
      </Page>
    </>
  );
}

export default ProductsPage;
