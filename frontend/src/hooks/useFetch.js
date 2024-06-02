import { useEffect, useState } from "react";

export default function useFetch(fetchFunction, selector=null, mutable=false, dependency = []) {
    const [test, setTest] = useState("test");
    const [data, setData] = useState(null);
    const [isFetching, setIsFetching] = useState(true);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetchFunction();
          const selectedData = selector ? response[selector] : response;
          setData(selectedData);
          console.log(selectedData);
          console.log(response);
          setIsFetching(false);
        } catch (error) {
          console.log(error);
        }
      };
  
      fetchData();
    }, dependency);

    if (mutable) {
        return {data, setData, isFetching}
    } else{
        return {data, isFetching, test}
    }
}