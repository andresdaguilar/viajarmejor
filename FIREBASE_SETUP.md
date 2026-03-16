# Configuración de Firebase Firestore

Si no ves los datos en Firebase, seguí esta checklist en orden:

---

## 1. ¿Creaste la base de datos Firestore?

1. Entrá a [Firebase Console](https://console.firebase.google.com)
2. Seleccioná el proyecto **viajar-mejor**
3. En el menú lateral: **Build** → **Firestore Database**
4. Si dice "Crear base de datos", hacé clic y creala
5. Elegí una ubicación (ej: `southamerica-east1` para Argentina)
6. **Importante:** Si te pregunta el modo, elegí **"Modo de prueba"** por 30 días (permite leer/escribir). Después podés cambiar a reglas personalizadas.

---

## 2. Reglas de seguridad (la causa más común)

En Firestore → pestaña **Reglas**, reemplazá **todo** el contenido por las reglas de abajo (sección "Reglas completas") y hacé clic en **Publicar**.

---

## 3. Colección "reservas"

No hace falta crearla manualmente. Se crea automáticamente cuando se guarda el primer documento.

---

## 4. Variables de entorno

Verificá que `.env.local` tenga todas las variables `NEXT_PUBLIC_FIREBASE_*` y **reiniciá el servidor** (`npm run dev`) después de cualquier cambio.

---

## 5. Cómo verificar

1. Abrí la consola del navegador (F12) → pestaña **Console**
2. Andá a `/reservar`, completá el paso 1 (plan) y paso 2 (datos)
3. Hacé clic en "Continuar al pago"
4. Si hay error, verás `[Firebase] Error al guardar reserva:` con el detalle
5. Si funciona, verás `[Reserva] Guardada en Firestore: [id]`

---

## Errores frecuentes

| Error | Solución |
|-------|----------|
| `PERMISSION_DENIED` / `Missing or insufficient permissions` | Reglas de Firestore (paso 2). Publicá las reglas. |
| `[Firebase] No se pudo inicializar` | Variables de entorno faltantes o servidor no reiniciado. |
| No aparece ningún mensaje | Abrí la consola antes de enviar el form. |

---

## Panel de administración (/admin)

### Habilitar Google Sign-In

1. Firebase Console → Authentication → Sign-in method
2. Habilitá **Google**
3. Agregá `localhost` y `viajarmejor.travel` en dominios autorizados

### Emails autorizados

Solo pueden acceder al panel:
- viajarmejor.travel@gmail.com
- andresd.aguilar@gmail.com

---

## Reglas completas (copiá y pegá en Firestore → Reglas)

**Reemplazá todo** el contenido de las reglas por esto y hacé clic en **Publicar**:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /reservas/{document=**} {
      allow create: if true;
      allow read: if request.auth != null &&
        (request.auth.token.email == 'viajarmejor.travel@gmail.com' ||
         request.auth.token.email == 'andresd.aguilar@gmail.com');
      allow update, delete: if false;
    }
    match /viajes/{document=**} {
      allow create, read, update, delete: if request.auth != null &&
        (request.auth.token.email == 'viajarmejor.travel@gmail.com' ||
         request.auth.token.email == 'andresd.aguilar@gmail.com');
    }
    match /viajePreparar/{token} {
      allow create: if request.auth != null &&
        (request.auth.token.email == 'viajarmejor.travel@gmail.com' ||
         request.auth.token.email == 'andresd.aguilar@gmail.com');
      allow read, update: if true;
    }
  }
}
```

**Índices:** Si aparecen errores al cargar:
- **reservas**: La query usa `orderBy("createdAt")`. Si falla, la app intenta sin orden (y ordena en memoria).
- **viajePreparar**: Creá el índice en Firebase Console → Firestore → Índices, o ejecutá `firebase deploy --only firestore:indexes`. El archivo `firestore.indexes.json` lo define.

**Qué hace cada parte:**
- `reservas`: Cualquiera puede **crear** (el formulario público). Solo los admins pueden **leer**.
- `viajes`: Solo los admins pueden crear, leer, actualizar y eliminar.
- `viajePreparar`: Admins crean el link. Cualquiera con el link puede **leer** y **actualizar** (el usuario completa el formulario).
