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
}) {
    const [date, time] = formatDateAndTime(timestamp);

    const formattedStdin = stdin.split("\n");
    return (
        <tr className="bg-white border-b hover:bg-gray-50">
            <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
            >
                {username}
            </th>
            <td className="border px-6 py-4 w-10 text-gray-700 font-semibold">
                {language}
            </td>
            <td className="border px-6 py-4 w-fit text-gray-700 font-semibold">
                {formattedStdin.map((inp, i) => (
                    <div key={inp + i}>
                        {inp.slice(0, 20)}
                        {inp.length > 20 ? "..." : ""}
                    </div>
                ))}
            </td>
            <td className="px-6 flex flex-col gap-4 sm:max-w-96 items-start py-4 text-gray-700 font-semibold">
                <div>{code.slice(0, 100)}</div>

                <button
                    onClick={() => onSelected(id)}
                    className="text-blue-600 hover:underline"
                >
                    Show code
                </button>
            </td>
            <td className="border px-6 py-4 text-right text-gray-700">
                <div>{date}</div>
                <div>{time}</div>
            </td>
        </tr>
    );
}
