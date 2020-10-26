import { useQuery } from "react-query";
import axios from "axios";

const HomePage = () => {
  const queryInfor = useQuery("pokemon", () =>
    axios.get("https://pokeapi.co/api/v2/pokemon").then((res) => res.json())
  );

  console.log(queryInfor);

  return <div>Welcome to Next.js!</div>;
};

export default HomePage; 
