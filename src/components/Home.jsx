import { useEffect, useState } from "react";

const BACKEND = "http://127.0.0.1:3000";

export function Home() {
  const [username, setUsername] = useState("");
  const [language, setLanguage] = useState("Cpp");
  const [stdInput, setStdInput] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");
  const [output, setOutput] = useState("");
  const [outputMessage, setOutputMessage] = useState("");

  const formattedOutput = output?.split("\n");

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
    if ([username, language, code].some((v) => !v)) {
      setError("Every field is required.");
      return;
    }
    try {
      setError("");
      setSuccess("");
      setLoading(true);
      setOutput("");
      setOutputMessage("Executing");

      const codeResponse = await fetch(`${BACKEND}/submissions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
          stdin: stdInput,
          language,
        }),
      });
      const submissionData = await codeResponse.json();
      console.log(submissionData);

      setOutputMessage(submissionData.message);
      setOutput(submissionData.stdout);

      const res = await fetch(`${BACKEND}/new`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          username,
          language,
          source_code: code,
          input: stdInput,
          output: submissionData.stdout,
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
    <div className="mx-2 mt-6 flex min-h-[80%] max-w-5xl flex-col rounded-md border border-gray-200 bg-gray-100 p-4 sm:mx-auto">
      <h1 className="text-3xl">Enter details</h1>
      <form className="mt-8 flex w-full flex-grow flex-col justify-between">
        <div className="flex-grow gap-10 space-y-4 md:flex">
          <div className="space-y-4">
            <div className="flex flex-col">
              {error && (
                <div className="text-md my-1 w-fit rounded-md bg-red-100 px-3 py-1 text-red-600">
                  {error}
                </div>
              )}
              {success && (
                <div className="text-md my-1 w-fit rounded-md bg-green-200 px-3 py-1 text-green-800">
                  {success}
                </div>
              )}
              <label htmlFor="username" className="text-lg">
                Username
              </label>
              <input
                id="username"
                className="text-md w-full rounded-md border border-gray-500  px-3 py-1.5 outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 sm:w-96"
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
                className="rounded-md border border-gray-500 outline-none focus:border-blue-300 focus:ring focus:ring-blue-200"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value={"Cpp"}>C++</option>
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
                className="text-md h-36 rounded-md border border-gray-500 px-3 py-1.5 outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 sm:w-96"
                placeholder="Input"
                value={stdInput}
                onChange={(e) => setStdInput(e.target.value)}
              />
            </div>
          </div>
          <div className="w-full">
            <div className="flex w-full flex-col">
              <label htmlFor="code" className="text-lg">
                Code
              </label>
              <textarea
                id="code"
                className="text-md h-96 flex-grow rounded-md border border-gray-500 px-3 py-1.5 outline-none focus:border-blue-300 focus:ring focus:ring-blue-200"
                placeholder="Input"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>
            <div className="mt-2 rounded-md border border-gray-500 p-2">
              <label
                htmlFor="code"
                className="text-md font-semibold leading-[0.7rem] text-gray-600"
              >
                Output
              </label>
              <div
                className={`font-semibold leading-[0.8rem] text-green-500 ${outputMessage !== "Accepted" ? "text-red-500" : ""}`}
              >
                {outputMessage}
              </div>

              {output &&
                formattedOutput.map((outp, i) => (
                  <div key={outp + i}>
                    {outp}
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="">
          <button
            onClick={handleSubmit}
            className={`${
              loading ? "cursor-not-allowed " : ""
            }sm:my-0 my-4 rounded-md bg-green-500 px-4 py-1 text-lg text-white transition-all duration-300 hover:bg-green-900`}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
