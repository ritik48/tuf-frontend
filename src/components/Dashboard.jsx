import { useState } from "react";
import { Entry } from "./Entry";
import { CodePopup } from "./CodePopup";
import { useEntry } from "../hooks/useEntry";

export function Dashboard() {
  const { entries, loading, error } = useEntry();

  const [selected, setSelected] = useState(null);
  const selectedCode = selected ? entries.find((e) => e.id === selected) : null;

  function handleSelected(cur) {
    setSelected((id) => (id === cur ? null : cur));
  }

  if (loading) {
    return (
      <div className="text-gray-200 font-seminold my-4 text-center text-xl">
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
        <CodePopup setSelected={setSelected} selectedCode={selectedCode} />
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
