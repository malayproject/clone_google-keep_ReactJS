import { NotificationManager } from "react-notifications";

export const createNotification = (type) => {
  return () => {
    switch (type) {
      case "NOTE_CREATED":
        NotificationManager.info("Note created", "", 3000);
        break;
      case "NOTE_UPDATED":
        NotificationManager.info("Note updated", "", 3000);
        break;
      case "NOTE_COPIED":
        NotificationManager.info("Note copied", "", 3000);
        break;
      case "NOTE_RESTORED":
        NotificationManager.info("Note restored", "", 3000);
        break;
      case "NOTE_ARCHIVED":
        NotificationManager.info("Note archived", "", 3000);
        break;
      case "NOTE_UNARCHIVED":
        NotificationManager.info("Note unarchived", "", 3000);
        break;
      case "NOTE_DELETED":
        NotificationManager.info("Note deleted", "", 3000);
        break;
      case "NOTE_DELETED_FOREVER":
        NotificationManager.info("Note deleted permanently", "", 3000);
        break;
      case "NOTE_PINNED":
        NotificationManager.info("Note pinned", "", 3000);
        break;
      case "NOTE_UNPINNED":
        NotificationManager.info("Note unpinned", "", 3000);
        break;
    }
  };
};
