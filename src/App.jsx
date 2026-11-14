import { useState } from "react";
const App = () => {

  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [repo, setRepo] = useState([]);

  async function searchUser(e) {
    e.preventDefault();
    try {
      setLoading(true)
      let url = `https://api.github.com/users/${encodeURIComponent(username)}`;
      const res = await fetch(url);
      const data = await res.json();
      setUser(data);
      console.log(data);

      let url2 = `https://api.github.com/users/${encodeURIComponent(username)}/repos`;
      const a = await fetch(url2);
      const b = await a.json();
      setRepo(b);
      console.log(b)


    }
    catch (err) { setError(err.message) }
    finally { setLoading(false) }
  }

  return (<>
    <form onSubmit={searchUser}>
      <input type="search" value={username}
        onChange={(e) => setUsername(e.target.value)} />
      <button type="submit">Search</button>
    </form>

    <h1>Github Profile Viewer</h1>
    {user &&
      <div>
        <img src={user.avatar_url} alt="" />
        <a href={user.html_url}>View GitHub profile</a>
        <h2>{user.followers}</h2>
        <h2>{user.name}</h2>
        <h2>{user.login}</h2>
      </div>
    }
    {repo.map((val) => (
      <div>
        <a href="">{val.name}</a>
      </div>
    ))}


  </>)
}
export default App