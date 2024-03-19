export function CodePopup({ setSelected, selectedCode }) {
  return (
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
  );
}
