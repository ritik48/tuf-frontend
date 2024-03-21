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
      <div className="font-seminold my-4 text-center text-xl text-gray-200">
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

      <h1 className="mt-8 px-2 py-2 text-gray-300 sm:mx-auto sm:w-[90%] sm:text-2xl">
        Submissions
      </h1>

      <div className="relative m-2 flex h-[500px] flex-col items-start justify-start overflow-x-auto px-2 sm:mx-auto sm:w-[90%] sm:rounded-lg">
        <table
          className={`${
            selected ? "blur-[2px]" : ""
          } relative mx-auto w-full overflow-x-scroll border-gray-900 text-left text-sm text-gray-500 rtl:text-right`}
        >
          <thead className="sticky inset-x-0 top-0 bg-[#171a18] text-xs uppercase text-gray-200">
            <tr className="">
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
          <tbody className="">
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
