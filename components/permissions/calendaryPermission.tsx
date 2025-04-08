import { PermisssionLayout } from "./permisssionLayout";
import { useCalendarPermissions } from "expo-calendar";


export function CalendaryPermission() {
  const [permission, requestPermission] = useCalendarPermissions();
  return (
    <PermisssionLayout
      icon="calendar"
      title="Calendario"
      granted={permission?.granted || false}
      requestPermission={requestPermission}
    />
  );
}