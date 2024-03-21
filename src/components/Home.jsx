import { useState } from "react";
import { executeCode, submitEntry } from "../api/api";
import { useKeyPress } from "../hooks/useKeyPress";
import { FaPlay } from "react-icons/fa";
import { MdError } from "react-icons/md";

export function Home() {
  const [username, setUsername] = useState("");
  const [language, setLanguage] = useState("Cpp");
  const [stdInput, setStdInput] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [executing, setExecuting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");
  const [output, setOutput] = useState("");
  const [outputMessage, setOutputMessage] = useState("");

  const formattedOutput = output?.split("\n");

  useKeyPress("keydown", () => {
    if (error) setError("");
    if (success) setSuccess("");
  });

  async function executeCodeFunction(e) {
    e.preventDefault();
    if ([code, stdInput].some((v) => !v)) {
      setError("Code and Input are required.");
      return;
    }
    try {
      setError("");
      setExecuting(true);
      setOutput("");
      setOutputMessage("Executing");

      // exceute code and get the output
      const submissionData = await executeCode(code, stdInput, language);

      setOutputMessage(submissionData.message);
      setOutput(submissionData.stdout);

      return submissionData.stdout;
    } catch (error) {
      setError("Something went wrong. Please try again");
    } finally {
      setExecuting(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if ([username, language, code, stdInput].some((v) => !v)) {
      setError("Every field is required.");
      return;
    }

    // if user clicks on submit but didn't execute the code earlier, then execute it before submitting
    let codeOutput = output;
    if (!codeOutput) {
      codeOutput = await executeCodeFunction(e);
    }

    try {
      setError("");
      setSuccess("");
      setLoading(true);

      const data = await submitEntry(
        username,
        language,
        code,
        stdInput,
        codeOutput,
      );
      if (!data.ok) {
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
    <div className="mx-2 my-2 flex flex-col rounded-md text-gray-200 sm:mx-auto sm:w-4/5">
      <form className="flex flex-grow flex-col justify-between">
        <div className="flex-grow gap-1 space-y-2 sm:space-y-0 md:flex">
          <div className="flex flex-col gap-4 rounded-md border border-[#393d3a] bg-[#171a18] p-4">
            <div className="flex flex-col">
              <label htmlFor="username" className="text-lg">
                Username
              </label>
              <input
                id="username"
                className="text-md w-full rounded-md border border-gray-700 bg-[#272a28]  px-3 py-1.5 outline-none focus:ring-2 focus:ring-[#3d7f9c] sm:w-96"
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
                className="rounded-md border border-gray-700 bg-[#272a28] outline-none focus:ring-2 focus:ring-[#3d7f9c]"
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
                className="text-md h-36 rounded-md border border-gray-700 bg-[#272a28] px-3 py-1.5 outline-none focus:ring-2 focus:ring-[#3d7f9c] sm:w-96"
                placeholder="Input"
                value={stdInput}
                onChange={(e) => setStdInput(e.target.value)}
              />
            </div>
            {error && (
              <div className="text-md my-2 flex w-fit items-center gap-2 rounded-md px-3 py-1 text-red-500">
                <div>
                  <MdError />
                </div>
                <div> {error}</div>
              </div>
            )}
            {success && (
              <div className="text-md my-2 flex w-fit items-center gap-2 rounded-md px-3 py-1 text-green-500">
                <div>
                  <MdError />
                </div>
                <div> {success}</div>
              </div>
            )}
            <div className="mt-auto flex space-x-[1px]">
              <button
                onClick={handleSubmit}
                className={`${
                  loading ? "cursor-not-allowed " : ""
                }sm:my-0 my-4 rounded-l-sm bg-green-800 px-4 py-1 text-lg text-white transition-all duration-300 hover:bg-green-500`}
                disabled={loading || executing}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
              <button
                onClick={executeCodeFunction}
                className={`${
                  loading ? "cursor-not-allowed " : ""
                }sm:my-0 my-4 rounded-r-sm  bg-[#3f4240]  px-4 py-1 text-lg text-white transition-all duration-300 hover:bg-[#626462]`}
                disabled={executing || loading}
              >
                <div className="flex items-center gap-1">
                  <span>{executing ? "Executing..." : "Run"}</span>
                  <FaPlay size={14} />
                </div>
              </button>
            </div>
          </div>
          <div className="w-full flex gap-2 flex-col rounded-md border border-[#393d3a] bg-[#171a18] p-4">
            <div className="flex flex-grow w-full flex-col">
              <label htmlFor="code" className="text-lg">
                Code
              </label>
              <textarea
                id="code"
                className="text-md h-96 flex-grow rounded-md border border-gray-700 bg-[#272a28] px-3 py-1.5 outline-none focus:ring-2 focus:ring-[#3d7f9c]"
                placeholder="Input"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>
            <div className="rounded-md mt-auto border border-gray-700 p-2">
              <label
                htmlFor="code"
                className="text-md font-semibold leading-[0.7rem] text-gray-200"
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
                  <div key={outp + i}>{outp}</div>
                ))}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
