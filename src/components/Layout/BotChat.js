import { FcAssistant } from "react-icons/fc";
import { IconContext } from "react-icons";

export default function BotChat(props) {
  return (
    <IconContext.Provider value={{ size: "2em" }}>
      <div className={props.className}>
        <FcAssistant />
      </div>
    </IconContext.Provider>
  );
}
