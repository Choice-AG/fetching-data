import "./App.css";
import { fetchData } from "./fetchData";
import { Suspense } from "react";

const apiData = fetchData("https://jsonplaceholder.typicode.com/users");

function App() {
  const data = apiData.read();

  return (
    <div className="App">
      <h1>Fetching data from an API</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <ul>
          {data?.map((user: { id: number; name: string }) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </Suspense>
    </div>
  );
}

export default App;