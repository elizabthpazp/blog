---
title: "Seguridad"
subtitle: "Passkeys y WebAuthn en 2026: Como implementar autenticacion sin contrasenas en tu web"
description: "Guia completa de Passkeys y WebAuthn nivel 3 en 2026: autenticacion passwordless, llaves FIDO2, biometria, cross-device flow, phishing-resistente y como implementar SimpleWebAuthn en Next.js."
date: "26 julio 2026"
image: "./passkeys-webauthn-2026.svg"
icon: "./passkeys-icon.svg"
language: "js"
---

![passkeys webauthn 2026 autenticacion sin contrasenas](./passkeys-webauthn-2026.svg)

# Passkeys y WebAuthn en 2026:
## Autenticacion sin Contrasenas

26 julio 2026

#### Guia completa de Passkeys y WebAuthn nivel 3 en 2026: autenticacion passwordless, llaves FIDO2, biometria, cross-device flow, phishing-resistente y como implementar SimpleWebAuthn en Next.js.

### Que son Passkeys y por que deberias migrar en 2026?

#### Passkeys es la implementacion de WebAuthn nivel 3 que reemplaza las contrasenas por llaves criptograficas almacenadas en el dispositivo del usuario (iCloud Keychain, Google Password Manager, Windows Hello, llaves hardware FIDO2 como YubiKey). En 2026, el 71% de los navegadores soportan passkeys nativamente y gigantes como Google, Apple, Microsoft, PayPal y GitHub ya lo usan por defecto.

#### Las passkeys son inherentemente phishing-resistentes porque la llave criptografica esta vinculada al dominio del sitio web. Si un atacante clona tu web, el navegador rechaza la passkey. Ademas eliminan contrasenas robadas, reutilizadas y debiles: la superficie de ataque para el equipo de seguridad se reduce un 92% segun el FIDO Alliance 2025.

```javascript
// Primer ejemplo de Passkey registration con SimpleWebAuthn 13 en 2026
import {
  generateRegistrationOptions,
  verifyRegistrationResponse,
} from '@simplewebauthn/server';

// 1. Generar challenge aleatorio
const options = await generateRegistrationOptions({
  rpName: 'Mi App',
  rpID: 'example.com',
  userID: user.id,
  userName: user.email,
  authenticatorSelection: {
    residentKey: 'preferred',  // passkey, no requiere userVerification explicito
    userVerification: 'preferred',
  },
});

// 2. Enviar opciones al cliente (navigator.credentials.create)
// El usuario aprueba con Face ID, Touch ID o llave FIDO2

// 3. Verificar la respuesta y guardar la credencial en tu DB
const verification = await verifyRegistrationResponse({
  response: clientResponse,
  expectedChallenge: options.challenge,
  expectedOrigin: 'https://example.com',
  expectedRPID: 'example.com',
});

if (verification.verified && verification.registrationInfo) {
  await db.passkeys.create({
    userId: user.id,
    credentialId: verification.registrationInfo.credentialID,
    publicKey: verification.registrationInfo.credentialPublicKey,
    counter: verification.registrationInfo.counter,
  });
}
```

### 1. WebAuthn nivel 3 (WebAuthn L3): lo nuevo en 2026

#### WebAuthn L3 (recomendacion W3C 2026) agrego el cross-device flow nativo (hybrid transport via QR + Bluetooth), attestacion mas estricta, y soporte oficial para passkeys multi-dispositivo. Apple, Google y Microsoft ya lo implementan en sus OS.

#### Features clave de WebAuthn L3:
- **Hybrid transport (caBLE v2)**: passkey de iPhone via QR a PC con Bluetooth
- **Conditional UI**: el navegador sugiere passkeys automaticamente en campos username
- **PRF extension**: derivacion de claves para cifrado E2E (Signal-style)
- **Large blob storage**: 4KB por credencial, ideal para encriptar secretos
- **Passkey upgrade**: migracion automatica de contrasenas a passkeys

```typescript
// Conditional UI en 2026 — el navegador autocompleta con passkeys
// Sin esto, el usuario tenia que clickear un boton "Login with passkey"
// Con L3, el campo username se autocompleta con biometria

const conditional = await SimpleWebAuthnBrowser.conditionalMediationAvailable();
if (conditional) {
  // Mostrar opciones inline en el campo username
  const options = await generateAuthenticationOptions({
    rpID: 'example.com',
    userVerification: 'preferred',
  });
  // navigator.credentials.get se ejecuta automaticamente cuando el user toca el campo
}
```

### 2. Implementacion completa en Next.js 16 con SimpleWebAuthn 13

#### SimpleWebAuthn es la libreria mas madura para WebAuthn en Node.js y navegadores. En 2026 cubre L3 completo y maneja los edge cases de cross-device flow.

```typescript
// app/api/auth/passkey/register/route.ts — registro
import { generateRegistrationOptions } from '@simplewebauthn/server';
import { getCurrentUser } from '@/lib/auth';

export async function POST(req: Request) {
  const user = await getCurrentUser(req);
  
  const options = await generateRegistrationOptions({
    rpName: 'Mi App',
    rpID: 'example.com',
    userID: String(user.id),
    userName: user.email,
    userDisplayName: user.name,
    authenticatorSelection: {
      residentKey: 'required',  // passkey obligatorio
      userVerification: 'required',
      authenticatorAttachment: 'platform',  // biometria del dispositivo
    },
    excludeCredentials: user.passkeys.map(p => ({
      id: p.credentialId,
      type: 'public-key',
    })),
  });

  // Guardar challenge en sesion
  await redis.set(`challenge:${user.id}`, options.challenge, { EX: 300 });

  return Response.json(options);
}
```

```typescript
// app/api/auth/passkey/login/route.ts — autenticacion
import { generateAuthenticationOptions } from '@simplewebauthn/server';

export async function POST(req: Request) {
  const { email } = await req.json();
  const user = await db.users.findUnique({ where: { email } });
  
  if (!user || user.passkeys.length === 0) {
    return Response.json({ error: 'No passkey enrolled' }, { status: 404 });
  }

  const options = await generateAuthenticationOptions({
    rpID: 'example.com',
    allowCredentials: user.passkeys.map(p => ({
      id: p.credentialId,
      type: 'public-key',
    })),
    userVerification: 'required',
  });

  await redis.set(`challenge:${user.id}`, options.challenge, { EX: 300 });

  return Response.json(options);
}
```

```tsx
// components/PasskeyButton.tsx — UI con Conditional UI
'use client';
import { startRegistration, startAuthentication, browserSupportsWebAuthn } from '@simplewebauthn/browser';

export function PasskeyButton({ mode, email }: { mode: 'register' | 'login'; email?: string }) {
  if (!browserSupportsWebAuthn()) return <p>Tu navegador no soporta passkeys</p>;

  const handle = async () => {
    try {
      if (mode === 'register') {
        const options = await fetch('/api/auth/passkey/register', { method: 'POST' }).then(r => r.json());
        const credential = await startRegistration({ optionsJSON: options });
        await fetch('/api/auth/passkey/register/verify', {
          method: 'POST',
          body: JSON.stringify(credential),
        });
      } else {
        const options = await fetch('/api/auth/passkey/login', {
          method: 'POST',
          body: JSON.stringify({ email }),
        }).then(r => r.json());
        const credential = await startAuthentication({ optionsJSON: options });
        await fetch('/api/auth/passkey/login/verify', {
          method: 'POST',
          body: JSON.stringify(credential),
        });
      }
    } catch (err) {
      console.error('Passkey error:', err);
    }
  };

  return (
    <button onClick={handle}>
      {mode === 'register' ? '🔑 Crear passkey' : '🔓 Login con passkey'}
    </button>
  );
}
```

### 3. Backup y recuperacion: el reto olvidado de passkeys

#### La preocupacion #1 de los usuarios es perder acceso si cambian de dispositivo. En 2026 hay tres patrones recomendados:

- **iCloud Keychain / Google Password Manager**: sync automatico entre dispositivos del mismo ecosistema
- **Passkey export/import (estandar 2026)**: codificado AES con frase de recuperacion
- **Passkey recovery codes**: 10 codigos de un solo uso estilo 2FA backup

#### Implementacion de recovery codes:

```typescript
// Generar recovery codes al registrar la primera passkey
import { randomBytes } from 'crypto';

function generateRecoveryCodes(count = 10): string[] {
  return Array.from({ length: count }, () => {
    const bytes = randomBytes(8).toString('hex');
    return `${bytes.slice(0, 4)}-${bytes.slice(4, 8)}-${bytes.slice(8, 12)}`;
  });
}

// Hashear antes de guardar (bcrypt cost 12)
async function hashRecoveryCode(code: string): Promise<string> {
  return bcrypt.hash(code, 12);
}

// Usuario usa uno: marcar como consumido (atomic update)
await db.recoveryCodes.update({
  where: { code_hash: await hashRecoveryCode(providedCode) },
  data: { usedAt: new Date() }
});
```

### 4. Migracion desde contrasenas a passkeys en 2026

#### El patron recomendado en 2026 es upgrade progresivo: sigue aceptando contrasenas durante 3-6 meses, sugiere passkeys a usuarios que inicien sesion, y desactiva contrasenas cuando >80% tengan passkey registrada.

```typescript
// Estrategia de migracion hibrida (2026)
async function loginFlow(email: string, password?: string, passkey?: any) {
  const user = await db.users.findUnique({ where: { email } });

  if (passkey) {
    // WebAuthn path — preferente
    return verifyAndLoginPasskey(user, passkey);
  }

  if (password && user.hasPassword) {
    // Legacy path — todavia soportado
    await verifyPassword(password, user.passwordHash);
    
    // Sugerir passkey si no tiene una
    if (user.passkeys.length === 0) {
      await sendUpgradeNudgeEmail(user);
    }
    
    return login(user);
  }

  throw new Error('Invalid credentials');
}
```

### 5. Seguridad y consideraciones avanzadas en 2026

- **User verification obligatorio**: nunca aceptar passkeys sin verificacion biometrica o PIN
- **Challenge unico por sesion**: 300 segundos max, un solo uso
- **HTTPS obligatorio**: WebAuthn requiere TLS (excepto localhost)
- **Rate limiting**: max 5 intentos por IP/email cada 15 minutos
- **Audit logging**: cada evento de auth (registro, login, failure) debe quedar logueado
- **Backup credentials**: ofreces siempre passkeys + recovery codes

### Conclusiones

#### Passkeys en 2026 son el nuevo estandar de autenticacion. Eliminan contrasenas, son phishing-resistentes, funcionan cross-device y la implementacion es sorprendentemente simple con SimpleWebAuthn. Migra tu app este ano: el coste de implementar es bajo, el beneficio en seguridad y UX es inmediato, y la mayoria de tus usuarios ya tienen passkeys listas (Face ID, Touch ID, Windows Hello). El futuro sin contrasenas ya empezo.