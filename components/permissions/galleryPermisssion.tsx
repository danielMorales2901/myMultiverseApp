//galleryPermission.tsx
import * as MediaLibrary from 'expo-media-library';
import { PermisssionLayout } from './permisssionLayout';

export function GalleryPermission() {
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

  return (
    <PermisssionLayout
      icon={"images-outline"}
      title="Galeria"
      granted={permissionResponse?.granted || false}
      requestPermission={requestPermission}
    />
  );
}
