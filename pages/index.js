import { useQuery } from "react-query";
import axios from "axios";

const HomePage = () => {
  const queryInfor = useQuery("pokemon", async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // if (true) {
    //   throw new Error("Test error");
    // }
    return axios
      .get("https://pokeapi.co/api/v2/pokemon")
      .then((res) => res.json());
  });

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
    </div>
  );
};

export default HomePage;
