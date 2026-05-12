import { AlertCircle } from 'lucide-react';
export function ErrorMessage({ title = 'Something went wrong', message }: { title?: string; message?: string }) {
  return (
    <div className="flex items-start gap-3 p-4 border border-line rounded-md bg-surface">
      <div className="w-7 h-7 grid place-items-center rounded-full bg-panel text-danger shrink-0"><AlertCircle size={14}/></div>
      <div>
        <div className="font-medium">{title}</div>
        {message && <div className="text-sm text-muted mt-0.5">{message}</div>}
      </div>
    </div>
  );
}
