function formatDateAndTime(dateString) {
  const date = new Date(dateString);
  const optionsDate = { day: "2-digit", month: "long", year: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", optionsDate);

  const optionsTime = { hour: "2-digit", minute: "2-digit" };
  const formattedTime = date
    .toLocaleDateString("en-US", optionsTime)
    .split(",")[1];

  return [formattedDate, formattedTime];
}

export function Entry({
  id,
  username,
  stdin,
  language,
  code,
  timestamp,
  onSelected,
  output,
}) {
  const [date, time] = formatDateAndTime(timestamp);

  const formattedStdin = stdin.split("\n");
  const formattedOutput = output.split("\n");

  return (
    <tr className="border-b bg-white hover:bg-gray-50 w-full">
      <th
        scope="row"
        className="whitespace-nowrap px-6 py-4 font-medium text-gray-900"
      >
        {username}
      </th>
      <td className="whitespace-nowrap border px-6 py-4 font-semibold text-gray-700">
        {language}
      </td>
      <td className="w-fit border px-6 py-4 font-semibold text-gray-700">
        {formattedStdin.map((inp, i) => (
          <div key={inp + i}>
            {inp.slice(0, 20)}
            {inp.length > 20 ? "..." : ""}
          </div>
        ))}
      </td>
      <td className="border px-6 py-4 font-semibold text-gray-700">
        {formattedOutput.map((outp, i) => (
          <div key={outp + i}>
            {outp.slice(0, 20)}
            {outp.length > 20 ? "..." : ""}
          </div>
        ))}
      </td>
      <td className="flex flex-col items-start gap-4 px-6 py-4 font-semibold text-gray-700">
        <div>{code.slice(0, 100)}</div>

        <button
          onClick={() => onSelected(id)}
          className="text-blue-600 hover:underline"
        >
          Show code
        </button>
      </td>
      <td className="border px-6 py-4 text-right text-gray-700 w-[20%]">
        <div>{date}</div>
        <div>{time}</div>
      </td>
    </tr>
  );
}
