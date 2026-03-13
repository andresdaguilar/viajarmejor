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

En Firestore → pestaña **Reglas**, reemplazá todo por:

```javascript
c
```

Hacé clic en **Publicar**. Esto permite que el formulario **cree** documentos en `reservas`, pero solo vos podés leerlos desde la consola.

**Si usaste "modo de prueba"** al crear la DB, las reglas temporales permiten todo. Si ya vencieron los 30 días, tenés que poner las reglas de arriba.

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
