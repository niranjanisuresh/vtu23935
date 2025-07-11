export type LogType = "submit" | "redirect" | "error" | "info";

interface LogPayload {
  timestamp: string;
  type: LogType;
  message: string;
  source?: string;
}

const LOG_API_URL = "http://20.244.56.144/evaluation-service/logs"; 

export const logEvent = async (type: LogType, message: string, source?: string) => {
  const token = localStorage.getItem("authToken");

  const payload: LogPayload = {
    timestamp: new Date().toISOString(),
    type,
    message,
    source,
  };

  try {
    const response = await fetch(LOG_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, 
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.warn(`Logging failed: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.warn("Logging error:", error);
  }
};
