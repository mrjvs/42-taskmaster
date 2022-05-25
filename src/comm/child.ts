import { ChildProcess, execFile } from "child_process";
import { resolve, join } from "path";

export function startDaemonAsChild(): Promise<ChildProcess> {
  return new Promise((res, reject) => {
    const pathToFile = resolve(join(__dirname, "../taskmasterd.js"));
    const child = execFile("node", [pathToFile]);
    child.on("spawn", () => {
      res(child);
    });
    child.on("error", (err) => {
      reject(err);
    });
  });
}
