---
title: "Seguridad"
subtitle: "8 prompts para validar la seguridad de tu app hecha con IA antes de lanzar"
description: "La IA construye rapido pero tambien deja puertas abiertas rapido. 8 prompts listos para copiar y pegar que convierten a tu IA en auditor de seguridad: secretos expuestos, RLS, IDOR, validacion, rate limiting, pagos y checklist final."
date: "23 septiembre 2026"
image: "./prompts-seguridad-app-ia.svg"
icon: "./prompts-seguridad-icon.svg"
language: "js"
---

![prompts para validar la seguridad de tu app hecha con IA](./prompts-seguridad-app-ia.svg)

# Valida la seguridad de tu app
## 8 prompts antes de lanzar

23 septiembre 2026

#### La IA construye rapido pero tambien deja puertas abiertas rapido. 8 prompts listos para copiar y pegar que convierten a tu IA en auditor de seguridad: secretos expuestos, RLS, IDOR, validacion, rate limiting, pagos y checklist final.

### Por que tu app hecha con IA necesita esta revision

#### Cuando le pides a una IA que construya rapido, ella optimiza para que funcione, no para que sea segura. El resultado es siempre el mismo: API keys en el frontend, tablas de Supabase sin reglas, endpoints que no verifican dueño y validacion solo en el formulario. Todo eso funciona en tu demo y falla en produccion.

#### Estos 8 prompts de seguridad convierten a tu IA (Claude, ChatGPT, Cursor) en un auditor. Usalos dentro de tu proyecto para que pueda leer tu codigo de verdad.

### Como usar esta guia

#### Corre un prompt a la vez. No le pidas que arregle todo de golpe: primero que te de la lista de problemas, revisala tu, y despues pidele que arregle uno por uno. Empieza por el prompt 1, que es el error mas comun y el mas grave.

- Trabaja siempre dentro de tu proyecto, no en un chat vacio.
- Exige archivo y linea en cada hallazgo.
- Arregla primero lo que toca dinero y datos de otros usuarios.

### 1. Llaves y secretos expuestos

#### El error numero uno: API keys de OpenAI, Stripe o de la base de datos metidas en el frontend. Cualquiera abre el navegador, las ve y las usa con tu tarjeta. La regla es simple: lo que esta en el cliente es publico, aunque creas que esta escondido.

```
Revisa todo mi proyecto buscando secretos expuestos: API keys,
tokens, contraseñas o credenciales de base de datos.

Para cada hallazgo dime:
1. Archivo y linea
2. Si ese codigo corre en el cliente o en el servidor
3. Que tan grave es si alguien lo encuentra
4. Como moverlo a una variable de entorno en el servidor

Revisa tambien si el .env esta en .gitignore y si hay variables
con prefijo NEXT_PUBLIC_, VITE_ o EXPO_PUBLIC_ que no deberian
ser publicas. No cambies nada todavia, solo el reporte.
```

### 2. Reglas de la base de datos

#### Si usas Supabase o Firebase, tu base de datos esta expuesta a internet. Sin reglas, cualquier usuario puede leer o borrar los datos de todos con la anon key publica y una peticion directa, sin pasar por tu app.

```
Analiza la seguridad de mi base de datos (Supabase RLS o
Firebase Security Rules).

1. Lista cada tabla o coleccion y dime si tiene reglas activadas
2. Para cada una, explica en simple quien puede leer, crear,
   editar y borrar
3. Señala donde un usuario pueda ver o modificar datos de otro
4. Propon las reglas corregidas con el minimo acceso necesario

Asume que un atacante tiene la anon key publica y puede hacer
peticiones directas sin pasar por mi app.
```

### 3. Puede un usuario ver datos de otro

#### Se llama IDOR y es muy comun: cambias `/api/orders/123` por `/api/orders/124` y ves el pedido de otra persona. Pasa cuando el endpoint verifica que iniciaste sesion pero no verifica que ese recurso sea tuyo.

```
Revisa cada endpoint, API route o server action de mi proyecto.

Para cada uno verifica:
- ¿Pide que el usuario haya iniciado sesion?
- ¿Comprueba que el recurso PERTENECE a quien lo pide?
- ¿Usa un userId que viene del cliente en vez de la sesion?

Dame una tabla: ruta, metodo, pide login (si/no),
valida dueño (si/no), riesgo. Despues explica como explotaria
un atacante el caso mas grave.
```

### 4. Validacion de lo que envia el usuario

#### Nunca confies en lo que llega del formulario. La validacion del frontend es para la experiencia. La del servidor es la que te protege. Sin ella entran inyecciones SQL, XSS y archivos que no deberian entrar.

```
Busca donde mi app recibe datos del usuario: formularios, query
params, body de APIs, subida de archivos.

Para cada uno dime:
1. Si se valida en el servidor, no solo en el frontend
2. Riesgo de inyeccion SQL, XSS o inyeccion de comandos
3. Si los archivos validan tipo y tamaño

Propon validacion con Zod (o la libreria del proyecto) para
los casos de mayor riesgo.
```

```javascript
// Ejemplo: lo que la IA deberia proponerte en el servidor
import { z } from 'zod';

const CreateOrderSchema = z.object({
  productId: z.string().uuid(),
  quantity: z.number().int().min(1).max(10),
  // El userId NUNCA viene del cliente: sale de la sesion
});

export async function createOrder(input: unknown, userId: string) {
  const data = CreateOrderSchema.parse(input);
  return { ...data, userId }; // dueño siempre del servidor
}
```

### 5. Proteccion contra abuso y costos

#### Si tu app llama a una API de IA, un bot puede hacer miles de peticiones y dejarte una factura de cientos de dolares en una noche. Login, registro y recuperar contraseña necesitan el mismo trato.

```
Detecta mis endpoints costosos o sensibles: llamadas a APIs de IA,
envio de emails o SMS, login, registro, recuperar contraseña.

Para cada uno dime si tiene rate limiting y como se podria abusar.
Despues propon rate limiting para mi stack y limites de uso por
usuario. Dame el codigo listo para pegar.
```

### 6. Pagos y webhooks

#### El acceso premium nunca se activa porque el frontend lo diga. Si el cliente decide quien es premium, cualquiera abre la consola y se vuelve premium gratis. La verdad esta en el servidor y en el webhook firmado del proveedor.

```
Revisa mi flujo de pagos y suscripciones (Stripe, RevenueCat o similar).

1. ¿Donde se decide si un usuario es premium? ¿Se puede falsificar?
2. ¿Los webhooks verifican la firma del proveedor?
3. ¿Que pasa si el mismo webhook llega dos veces?
4. ¿Que pasa si hay reembolso o se cancela la suscripcion?

Explica cada riesgo con un ejemplo de como alguien obtendria
premium gratis.
```

### 7. Autenticacion y sesiones

```
Audita la autenticacion de mi app:

- ¿Las contraseñas se manejan con un proveedor seguro o con
  bcrypt/argon2, nunca en texto plano?
- ¿Los tokens y sesiones expiran? ¿Donde se guardan en el cliente?
- ¿El flujo de "olvide mi contraseña" revela si un email existe?
- ¿Las rutas protegidas se validan en el servidor o solo se
  ocultan en el frontend?
- ¿Cerrar sesion invalida la sesion de verdad?

Ordena los hallazgos del mas grave al menos grave, con archivo
y linea en cada uno.
```

### 8. Revision final antes de lanzar

#### Usalo como checklist cada vez que publiques una version nueva.

```
Actua como un experto en seguridad auditando mi app antes del
lanzamiento. Revisa el proyecto completo y dame:

1. Un puntaje del 1 al 10 y por que
2. Los 5 problemas mas graves, por riesgo real, no teorico
3. Dependencias con vulnerabilidades (corre npm audit o equivalente)
4. Headers de seguridad faltantes: CSP, HSTS, X-Frame-Options
5. Errores que muestran datos internos: stack traces, queries
6. Plan de accion: que arreglo hoy, que esta semana y que espera

Explicalo para alguien que no es experto en seguridad.
```

### Preguntas frecuentes

#### Mi IA puede equivocarse auditando?

#### Si. Estos 8 prompts encuentran los problemas mas comunes, pero no reemplazan una auditoria profesional si manejas pagos a escala o datos sensibles. Usalos como primera capa, no como unica.

#### Que arreglo primero si todo sale mal?

#### Secretos expuestos y reglas de base de datos. Son los que permiten robar dinero y datos hoy mismo. Despues IDOR y pagos.

#### Cada cuanto repito la revision final?

#### En cada version que publiques. El prompt 8 esta pensado como checklist de lanzamiento, no como tarea de una sola vez.

### Conclusiones

#### Corre estos prompts de seguridad para apps IA antes de lanzar: primero secretos y base de datos, despues endpoints, validacion, abuso, pagos y autenticacion. La IA te ayuda a construir rapido, estos prompts evitan que tambien dejes puertas abiertas rapido.
