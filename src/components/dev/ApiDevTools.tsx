import { useState, useEffect } from "react";
import { ChevronUp, ChevronDown, X, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ApiLog {
  id: string;
  timestamp: Date;
  method: string;
  url: string;
  requestBody?: unknown;
  status?: number;
  responseBody?: unknown;
  duration?: number;
  error?: string;
}

// Global store for API logs
const apiLogs: ApiLog[] = [];
const listeners: Set<() => void> = new Set();

function notifyListeners() {
  listeners.forEach((fn) => fn());
}

export function addApiLog(log: ApiLog) {
  apiLogs.unshift(log);
  if (apiLogs.length > 50) apiLogs.pop();
  notifyListeners();
}

export function updateApiLog(id: string, updates: Partial<ApiLog>) {
  const log = apiLogs.find((l) => l.id === id);
  if (log) {
    Object.assign(log, updates);
    notifyListeners();
  }
}

function clearLogs() {
  apiLogs.length = 0;
  notifyListeners();
}

// Intercept fetch
const originalFetch = window.fetch;
window.fetch = async function (input, init) {
  const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
  
  // Only log API calls
  if (!url.includes("/api/")) {
    return originalFetch.apply(this, [input, init]);
  }

  const id = crypto.randomUUID();
  const method = init?.method || "GET";
  let requestBody: unknown;

  try {
    if (init?.body) {
      requestBody = JSON.parse(init.body as string);
    }
  } catch {
    requestBody = init?.body;
  }

  addApiLog({
    id,
    timestamp: new Date(),
    method,
    url,
    requestBody,
  });

  const start = performance.now();

  try {
    const response = await originalFetch.apply(this, [input, init]);
    const duration = Math.round(performance.now() - start);

    // Clone response to read body
    const cloned = response.clone();
    let responseBody: unknown;
    try {
      responseBody = await cloned.json();
    } catch {
      responseBody = await cloned.text();
    }

    updateApiLog(id, {
      status: response.status,
      responseBody,
      duration,
    });

    return response;
  } catch (err) {
    updateApiLog(id, {
      error: err instanceof Error ? err.message : "Unknown error",
      duration: Math.round(performance.now() - start),
    });
    throw err;
  }
};

export default function ApiDevTools() {
  const [isOpen, setIsOpen] = useState(false);
  const [logs, setLogs] = useState<ApiLog[]>([...apiLogs]);
  const [selectedLog, setSelectedLog] = useState<ApiLog | null>(null);

  useEffect(() => {
    const update = () => setLogs([...apiLogs]);
    listeners.add(update);
    return () => {
      listeners.delete(update);
    };
  }, []);

  const getStatusColor = (status?: number) => {
    if (!status) return "secondary";
    if (status >= 200 && status < 300) return "default";
    if (status >= 400) return "destructive";
    return "secondary";
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 bg-slate-900 text-slate-100 px-3 py-2 rounded-lg shadow-lg flex items-center gap-2 text-sm font-mono hover:bg-slate-800 transition-colors"
      >
        <ChevronUp className="w-4 h-4" />
        API DevTools
        {logs.length > 0 && (
          <Badge variant="secondary" className="ml-1">
            {logs.length}
          </Badge>
        )}
      </button>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900 text-slate-100 border-t border-slate-700 shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-slate-700 bg-slate-800">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-sm">Gatehouse API DevTools</span>
          <Badge variant="outline" className="text-xs border-slate-600">
            {logs.length} requests
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={clearLogs}
            className="text-slate-400 hover:text-slate-100 hover:bg-slate-700"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="text-slate-400 hover:text-slate-100 hover:bg-slate-700"
          >
            <ChevronDown className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="flex h-64">
        {/* Request list */}
        <ScrollArea className="w-1/2 border-r border-slate-700">
          {logs.length === 0 ? (
            <div className="p-4 text-slate-500 text-sm text-center">
              No API requests yet
            </div>
          ) : (
            <div className="divide-y divide-slate-800">
              {logs.map((log) => (
                <button
                  key={log.id}
                  onClick={() => setSelectedLog(log)}
                  className={`w-full text-left px-3 py-2 hover:bg-slate-800 transition-colors ${
                    selectedLog?.id === log.id ? "bg-slate-800" : ""
                  }`}
                >
                  <div className="flex items-center gap-2 text-xs">
                    <Badge
                      variant={getStatusColor(log.status)}
                      className="font-mono text-[10px] px-1.5"
                    >
                      {log.method}
                    </Badge>
                    <span className="text-slate-400 truncate flex-1 font-mono">
                      {log.url.replace("/api/v1", "")}
                    </span>
                    {log.status && (
                      <Badge
                        variant={getStatusColor(log.status)}
                        className="text-[10px]"
                      >
                        {log.status}
                      </Badge>
                    )}
                    {log.duration && (
                      <span className="text-slate-500 text-[10px]">
                        {log.duration}ms
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] text-slate-600 mt-0.5">
                    {log.timestamp.toLocaleTimeString()}
                  </div>
                </button>
              ))}
            </div>
          )}
        </ScrollArea>

        {/* Detail view */}
        <ScrollArea className="w-1/2 p-3">
          {selectedLog ? (
            <div className="space-y-3 text-xs font-mono">
              <div>
                <div className="text-slate-500 mb-1">URL</div>
                <div className="text-slate-200 break-all">{selectedLog.url}</div>
              </div>

              {selectedLog.requestBody && (
                <div>
                  <div className="text-slate-500 mb-1">Request Body</div>
                  <pre className="bg-slate-800 p-2 rounded text-[10px] overflow-auto text-green-400">
                    {JSON.stringify(selectedLog.requestBody, null, 2)}
                  </pre>
                </div>
              )}

              {selectedLog.responseBody && (
                <div>
                  <div className="text-slate-500 mb-1">Response</div>
                  <pre className="bg-slate-800 p-2 rounded text-[10px] overflow-auto text-blue-400">
                    {JSON.stringify(selectedLog.responseBody, null, 2)}
                  </pre>
                </div>
              )}

              {selectedLog.error && (
                <div>
                  <div className="text-red-500 mb-1">Error</div>
                  <div className="text-red-400">{selectedLog.error}</div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-slate-500 text-sm text-center py-8">
              Select a request to view details
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  );
}
