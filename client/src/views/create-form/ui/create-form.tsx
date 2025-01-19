import { EditField } from "@/features/editor";
import { FormConfig } from "../model/types/formConfig";
import { Paper } from "./paper/paper";

// const defaultConfig: FormConfig = {
//   id: "1",
//   data: {
//     title: JSON.parse(
//       '{"type":"doc","content":[{"type":"heading","attrs":{"level":1},"content":[{"type":"text","text":"Hello!"}]}]}',
//     ),
//   }
// };

export default function CreateForm() {
  return (
    <div className="flex flex-col gap-y-4">
      <Paper top>
        <EditField type="heading" />
      </Paper>
    </div>
  );
}
