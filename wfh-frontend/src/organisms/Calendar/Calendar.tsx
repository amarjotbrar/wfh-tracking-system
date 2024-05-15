import { Calendar, Whisper, Popover } from "rsuite";
import "rsuite/dist/rsuite.min.css";

function getTodoList(date: Date) {
  const day = date.getDate();

  switch (day) {
    case 10:
      return [
      ];
    case 15:
      return [
      ];
    default:
      return [];
  }
}

const OrgCalendar = () => {
  function renderCell(date: Date) {
    const list = getTodoList(date);
    const displayList = list.filter((index) => index < 2);

    if (list.length) {
      const moreCount = list.length - displayList.length;
      const moreItem = (
        <li>
          <Whisper
            placement="top"
            trigger="click"
            speaker={
              <Popover>
              </Popover>
            }
          >
            <a>{moreCount} more</a>
          </Whisper>
        </li>
      );

      return (
        <ul className="calendar-todo-list">
          {displayList.map((index) => (
            <li key={index}>
            </li>
          ))}
          {moreCount ? moreItem : null}
        </ul>
      );
    }

    return null;
  }

  return <Calendar bordered renderCell={renderCell} />;
};

export default OrgCalendar;
