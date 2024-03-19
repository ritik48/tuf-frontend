import { useEffect, useState } from "react";
import { Entry } from "./Entry";

const BACKEND = "http://127.0.0.1:3000";

export function Dashboard() {
  const [entries, setEntries] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [selected, setSelected] = useState(null);
  const selectedCode = selected ? entries.find((e) => e.id === selected) : null;

  function handleSelected(cur) {
    setSelected((id) => (id === cur ? null : cur));
  }

  useEffect(() => {
    async function fetchEntry() {
      try {
        setError("");
        setLoading(true);
        const res = await fetch(BACKEND);
        const data = await res.json();

        setEntries(data.data);
      } catch (error) {
        setError("Cannot fetch the data. Try again");
      } finally {
        setLoading(false);
      }
    }
    fetchEntry();
  }, []);

  if (loading) {
    return (
      <div className="font-seminold my-4 text-center text-xl">
        Fetching entries...{error}
      </div>
    );
  }
  if (error) {
    return (
      <div className="font-seminold my-10 text-center text-xl">{error} 🔴</div>
    );
  }

  return (
    <>
      {selected && (
        <div className="absolute left-1/2 top-20 z-10 flex h-4/5 w-[98%] translate-x-[-50%] flex-col rounded-md border border-gray-600 bg-gray-800 sm:w-1/2">
          <button
            onClick={() => setSelected(null)}
            className="text-md m-2 text-right"
          >
            ❌
          </button>
          <pre className="z-10 h-full overflow-y-scroll bg-gray-800 p-6 text-gray-200 ">
            {selectedCode.source_code}
          </pre>
        </div>
      )}
      <div className="relative mt-10 h-[500px] overflow-x-auto sm:rounded-lg">
        <table
          className={`${
            selected ? "blur-[2px]" : ""
          } mx-auto w-full max-w-5xl border border-gray-900 text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400`}
        >
          <thead className="bg-gray-200 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Username
              </th>
              <th scope="col" className="px-6 py-3">
                Code language
              </th>
              <th scope="col" className="px-6 py-3">
                Stdin
              </th>
              <th scope="col" className="px-6 py-3">
                Output
              </th>
              <th scope="col" className="px-6 py-3">
                Code
              </th>
              <th scope="col" className="px-6 py-3">
                Timestamp
              </th>
            </tr>
          </thead>
          <tbody>
            {entries &&
              entries.map(
                ({
                  username,
                  input,
                  language,
                  source_code,
                  created,
                  output,
                  id,
                }) => (
                  <Entry
                    id={id}
                    username={username}
                    language={language}
                    stdin={input}
                    timestamp={created}
                    code={source_code}
                    output={output}
                    key={created}
                    onSelected={handleSelected}
                  />
                ),
              )}
          </tbody>
        </table>
      </div>
    </>
  );
}
