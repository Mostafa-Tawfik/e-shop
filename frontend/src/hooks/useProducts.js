import { useQuery } from "react-query";
import axios from "axios";

const useProducts = async () => {

  const { data } = await axios({
    url: '/api/products?productNum=Infinity',
    method: 'GET',
  });
  return data.products.slice(0).reverse();
};

export default function useApi() {
  return useQuery(["products"], useProducts, {
    refetchOnMount: false,
    refetchOnWindowFocus: false
  });
}