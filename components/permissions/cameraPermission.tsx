//cameraPermission.tsx
import { useCameraPermissions } from "expo-camera";
import { PermisssionLayout } from "./permisssionLayout";

export function CameraPermission() {
  const [permission, requestPermission] = useCameraPermissions();

  return (
    <PermisssionLayout
      icon={"camera-outline"}
      title="Cámara"
      granted={permission?.granted || false}
      requestPermission={requestPermission}
    />
  );
}