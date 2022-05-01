import { useQuery } from "react-query";
import axios from "axios";

const useGetProducts = async () => {

  const { data } = await axios({
    url: '/api/products?productNum=Infinity',
    method: 'GET',
  });
  return data.products;
};

export default function useApi() {
  return useQuery(["products"], useGetProducts);
}