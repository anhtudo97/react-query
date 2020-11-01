import { useQuery } from "react-query";
import { ReactQueryDevtools } from "react-query-devtools";
import axios from "axios";

const Pokemon = () => {
  const queryInfor = useQuery(
    "pokemon",
    async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // if (true) {
      //   throw new Error("Test error");
      // }
      return axios
        .get("https://pokeapi.co/api/v2/pokemon")
        .then((res) => res.json());
    },
    {
      // not updaing when you refocus on window
      refetchOnWindowFocus: false,

      // timeout reupdating date on window
      staleTime: 5000,

      // time to cache data on local use react-query
      cacheTime: 5000
    }
  );

  console.log(queryInfor);

  return queryInfor.isLoading ? (
    "loading ... "
  ) : queryInfor.isError ? (
    queryInfor.error.message
  ) : (
    <div>
      {queryInfor.data?.map((result) => {
        return <div key={result.name}>{result.name}</div>;
      })}
      <br />
      {queryInfor.isFetching ? "Updating" : null}
    </div>
  );
};

export default function App() {
  <div>
    <Pokemon />
    <ReactQueryDevtools />
  </div>;
}

export default App;
