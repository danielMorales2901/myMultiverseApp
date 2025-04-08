//locationPermission.tsx
import { useEffect, useState } from "react";
import { PermisssionLayout } from "./permisssionLayout";
import { useForegroundPermissions } from "expo-location";

export function LocationPermission() {
  const [permission, requestPermission] = useForegroundPermissions()

  return (
    <PermisssionLayout
      icon={"location-outline"}
      title="Ubicación"
      granted={permission?.granted || false}
      requestPermission={requestPermission}
    />
  );
}