import "./App.css";
import { useFetch } from "./useFetch";

function App() {
  const { data, loading, error, handleCancelRequest } = useFetch(
    "https://jsonplaceholder.typicode.com/users"
  );

  return (
    <div className="App">
      <h1>Fetching data from an API</h1>
      <button onClick={handleCancelRequest}>Cancel request</button>
      <div className="card">
        <ul>
          {error && <li>Error: {error}</li>}
          {loading && <li>Loading...</li>}
          {data?.map((user: { id: number; name: string }) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
