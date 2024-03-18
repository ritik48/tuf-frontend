import { useEffect, useState } from "react";

export function Home() {
    const [username, setUsername] = useState("");
    const [language, setLanguage] = useState("C++");
    const [stdInput, setStdInput] = useState("");
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState("");

    useEffect(() => {
        const handleKeyDown = () => {
            if (error) setError("");
            if (success) setSuccess("");
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [error, success]);

    async function handleSubmit(e) {
        e.preventDefault();
        if ([username, language, stdInput, code].some((v) => !v)) {
            setError("Every field is required.");
            return;
        }
        try {
            setError("");
            setSuccess("");
            setLoading(true);
            await new Promise((resolve) => setTimeout(resolve, 5000));
            const res = await fetch("http://127.0.0.1:3000/new", {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({
                    username,
                    language,
                    source_code: code,
                    input: stdInput,
                }),
            });
            const data = await res.json();
            if (!res.ok) {
                setError(data.message);
            } else {
                setSuccess(data.message);
            }
        } catch (error) {
            setError("Something went wrong. Please try again");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="bg-gray-100 mt-6 rounded-md border border-gray-200 p-4 max-w-5xl h-[80%] mx-auto flex flex-col">
            <h1 className="text-3xl">Enter details</h1>
            <form className="w-full mt-8 flex flex-col justify-between flex-grow">
                <div className="md:flex gap-10 flex-grow">
                    <div className="space-y-4">
                        <div className="flex flex-col">
                            {error && (
                                <div className="text-md text-red-600 bg-red-100 my-1 rounded-md px-3 py-1 w-fit">
                                    {error}
                                </div>
                            )}
                            {success && (
                                <div className="text-md text-green-800 bg-green-200 my-1 rounded-md px-3 py-1 w-fit">
                                    {success}
                                </div>
                            )}
                            <label htmlFor="username" className="text-lg">
                                Username
                            </label>
                            <input
                                id="username"
                                className="w-96 focus:ring-blue-200 focus:ring focus:border-blue-300  outline-none px-3 py-1.5 rounded-md text-xl border border-gray-500"
                                placeholder="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center gap-4">
                            <label htmlFor="language" className="text-lg">
                                Preferred Language
                            </label>
                            <select
                                id="language"
                                className="focus:ring-blue-200 focus:ring focus:border-blue-300 border outline-none border-gray-500 rounded-md"
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                            >
                                <option value={"C++"}>C++</option>
                                <option value={"Java"}>Java</option>
                                <option value={"Javascript"}>Javascript</option>
                                <option value={"Python"}>Python</option>
                                <option value={"C"}>C</option>
                                <option value={"Go"}>Go</option>
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="stdin" className="text-lg">
                                Stdin
                            </label>
                            <textarea
                                id="stdin"
                                className="w-96 focus:ring-blue-200 focus:ring focus:border-blue-300 h-52 outline-none px-3 py-1.5 rounded-md text-xl border border-gray-500"
                                placeholder="Input"
                                value={stdInput}
                                onChange={(e) => setStdInput(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="code" className="text-lg">
                            Code
                        </label>
                        <textarea
                            id="code"
                            className="focus:ring-blue-200 focus:ring focus:border-blue-300 text-md flex-grow outline-none px-3 py-1.5 rounded-md border border-gray-500"
                            placeholder="Input"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                        />
                    </div>
                </div>
                <div className="">
                    <button
                        onClick={handleSubmit}
                        className="transition-all duration-300 hover:bg-green-900 text-lg bg-green-500 px-4 py-1 rounded-md text-white"
                        disabled={loading}
                    >
                        {loading ? "Submitting" : "Submit"}
                    </button>
                </div>
            </form>
        </div>
    );
}
