import { useEffect, useState } from "react";
import { Entry } from "./Entry";

const BACKEND = "http://127.0.0.1:3000";

export function Dashboard() {
    const [entries, setEntries] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [selected, setSelected] = useState(null);
    const selectedCode = selected
        ? entries.find((e) => e.id === selected)
        : null;

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
            <div className="text-center text-xl font-seminold my-4">
                Fetching entries...{error}
            </div>
        );
    }
    if (error) {
        return (
            <div className="text-center text-xl font-seminold my-10">
                {error} 🔴
            </div>
        );
    }

    return (
        <>
            {selected && (
                <div className="z-10 bg-gray-800 flex flex-col w-[98%] sm:w-1/2 left-1/2 h-4/5 rounded-md border border-gray-600 translate-x-[-50%] top-20 absolute">
                    <button
                        onClick={() => setSelected(null)}
                        className="text-right text-md m-2"
                    >
                        ❌
                    </button>
                    <pre className="bg-gray-800 text-gray-200 z-10 h-full overflow-y-scroll p-10 ">
                        {selectedCode.source_code}
                    </pre>
                </div>
            )}
            <div className="mt-10 relative overflow-x-auto sm:rounded-lg h-[500px]">
                <table
                    className={`${
                        selected ? "blur-[2px]" : ""
                    } w-full border border-gray-900 max-w-5xl mx-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400`}
                >
                    <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
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
                                    id,
                                }) => (
                                    <Entry
                                        id={id}
                                        username={username}
                                        language={language}
                                        stdin={input}
                                        timestamp={created}
                                        code={source_code}
                                        key={created}
                                        onSelected={handleSelected}
                                    />
                                )
                            )}
                    </tbody>
                </table>
            </div>
        </>
    );
}
