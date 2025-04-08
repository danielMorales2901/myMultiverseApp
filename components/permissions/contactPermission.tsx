//cameraPermission.tsx
import { useEffect, useState } from 'react';
import { PermisssionLayout } from "./permisssionLayout";
import { getPermissionsAsync, PermissionResponse, requestPermissionsAsync } from 'expo-contacts';


export function ContactPermission() {
    const [permission, setPermission] = useState<PermissionResponse | undefined>(undefined);

    const requestPermission = () => {
      requestPermissionsAsync()
      .then((result)=>{
        setPermission(result);
      });
    }


  useEffect(() => {
    async function getPermissionStatus() {
      let result = await getPermissionsAsync();
      setPermission(result)
    }
    getPermissionStatus();
  }, []);
  
  return (
    <PermisssionLayout
      icon={"people-sharp"}
      title="Contactos"
      granted={permission?.granted || false}
      requestPermission={requestPermission}
    />
  );
}