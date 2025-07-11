type LogLevel = "info" | "error" | "debug" | "warn";

interface LogEntry {
  stack: "frontend";
  level: LogLevel;
  package: string;
  message: boolean;
  timestamp: string;
}

export const logEvent = (
  level: LogLevel,
  message: boolean,
  pkg: string
): void => {
  const entry: LogEntry = {
    stack: "frontend",
    level,
    package: pkg,
    message,
    timestamp: new Date().toISOString()
  };

  try {
    const existingLogs: LogEntry[] = JSON.parse(localStorage.getItem("logger.json") || "[]");
    existingLogs.push(entry);
    localStorage.setItem("logger.json", JSON.stringify(existingLogs));
  } catch (error) {
    console.warn("Logger.json write failed:", error);
  }
};
