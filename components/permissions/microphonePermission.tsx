//cameraPermission.tsx
import { useMicrophonePermissions } from "expo-camera";
import { PermisssionLayout } from "./permisssionLayout";

export function MicrophonePermission() {
    const [permission, requestPermission] = useMicrophonePermissions();
  
  return (
    <PermisssionLayout
      icon={"mic"}
      title="Micrófono"  
      granted={permission?.granted || false}
      requestPermission={requestPermission}
    />
  );
}