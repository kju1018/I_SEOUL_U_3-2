import { Notification as NotificationType } from "../../../types";
import { Button } from "./Button";

interface NotificationProps {
  notifications: NotificationType[];
  onClose: (id: string) => void;
}

export const Notification = ({ notifications, onClose }: NotificationProps) => {
  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-50 space-y-2 max-w-sm">
      {notifications.map((notif) => (
        <div
          key={notif.id}
          className={`p-4 rounded-md shadow-md text-white flex justify-between items-center ${
            notif.type === "error" ? "bg-red-600" : notif.type === "warning" ? "bg-yellow-600" : "bg-green-600"
          }`}
        >
          <span className="mr-2">{notif.message}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onClose(notif.id)}
            className="text-white hover:bg-white/20 hover:text-white"
            aria-label="Close notification"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Button>
        </div>
      ))}
    </div>
  );
};
