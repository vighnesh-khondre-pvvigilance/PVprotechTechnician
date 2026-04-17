import { createContext, useContext, useState } from "react";
import { workData } from "../data/work";

const WorkContext = createContext<any>(null);

export function WorkProvider({ children }: any) {
  const [pending, setPending] = useState(workData);
  const [history, setHistory] = useState([]);

  const completeTask = (taskId: string, report: any) => {
    const task = pending.find((x) => x.id === taskId);

    if (!task) return;

    const updatedPending = pending.filter(
      (x) => x.id !== taskId
    );

    const completed = {
      ...task,
      ...report,
      status: "Completed",
      completedDate: new Date().toISOString(),
    };

    setPending(updatedPending);
    setHistory([completed, ...history]);
  };

  return (
    <WorkContext.Provider
      value={{
        pending,
        history,
        completeTask,
      }}
    >
      {children}
    </WorkContext.Provider>
  );
}

export const useWork = () =>
  useContext(WorkContext);