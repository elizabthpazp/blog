---
title: "Security"
subtitle: "Passkeys & WebAuthn in 2026: How to Implement Passwordless Authentication in Your Web"
description: "Complete guide to Passkeys and WebAuthn Level 3 in 2026: passwordless authentication, FIDO2 keys, biometrics, cross-device flow, phishing-resistant and how to implement SimpleWebAuthn in Next.js."
date: "26 July 2026"
image: "./passkeys-webauthn-2026.svg"
icon: "./passkeys-icon.svg"
language: "js"
---

![passkeys webauthn 2026 passwordless authentication](./passkeys-webauthn-2026.svg)

# Passkeys & WebAuthn in 2026:
## Passwordless Authentication

26 July 2026

#### Complete guide to Passkeys and WebAuthn Level 3 in 2026: passwordless authentication, FIDO2 keys, biometrics, cross-device flow, phishing-resistant and how to implement SimpleWebAuthn in Next.js.

### What are Passkeys and why should you migrate in 2026?

#### Passkeys are the WebAuthn Level 3 implementation that replaces passwords with cryptographic keys stored on the user's device (iCloud Keychain, Google Password Manager, Windows Hello, hardware FIDO2 keys like YubiKey). In 2026, 71% of browsers support passkeys natively and giants like Google, Apple, Microsoft, PayPal and GitHub already use it by default.

#### Passkeys are inherently phishing-resistant because the cryptographic key is bound to the site's domain. If an attacker clones your site, the browser rejects the passkey. They also eliminate stolen, reused and weak passwords: the attack surface for the security team shrinks by 92% according to the FIDO Alliance 2025.

```javascript
// First Passkey registration example with SimpleWebAuthn 13 in 2026
import {
  generateRegistrationOptions,
  verifyRegistrationResponse,
} from '@simplewebauthn/server';

// 1. Generate random challenge
const options = await generateRegistrationOptions({
  rpName: 'My App',
  rpID: 'example.com',
  userID: user.id,
  userName: user.email,
  authenticatorSelection: {
    residentKey: 'preferred',  // passkey, no explicit userVerification required
    userVerification: 'preferred',
  },
});

// 2. Send options to the client (navigator.credentials.create)
// User approves with Face ID, Touch ID or FIDO2 key

// 3. Verify the response and store the credential in your DB
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

### 1. WebAuthn Level 3 (WebAuthn L3): new in 2026

#### WebAuthn L3 (W3C Recommendation 2026) added native cross-device flow (hybrid transport via QR + Bluetooth), stricter attestation, and official support for multi-device passkeys. Apple, Google and Microsoft have already implemented it in their OS.

#### Key WebAuthn L3 features:
- **Hybrid transport (caBLE v2)**: iPhone passkey via QR to PC with Bluetooth
- **Conditional UI**: browser suggests passkeys automatically in username fields
- **PRF extension**: key derivation for E2E encryption (Signal-style)
- **Large blob storage**: 4KB per credential, ideal for encrypting secrets
- **Passkey upgrade**: automatic migration of passwords to passkeys

```typescript
// Conditional UI in 2026 — browser autofills with passkeys
// Without this, the user had to click a "Login with passkey" button
// With L3, the username field autofills with biometrics

const conditional = await SimpleWebAuthnBrowser.conditionalMediationAvailable();
if (conditional) {
  // Show inline options in the username field
  const options = await generateAuthenticationOptions({
    rpID: 'example.com',
    userVerification: 'preferred',
  });
  // navigator.credentials.get runs automatically when user touches the field
}
```

### 2. Full implementation in Next.js 16 with SimpleWebAuthn 13

#### SimpleWebAuthn is the most mature library for WebAuthn in Node.js and browsers. In 2026 it covers L3 completely and handles the cross-device flow edge cases.

```typescript
// app/api/auth/passkey/register/route.ts — registration
import { generateRegistrationOptions } from '@simplewebauthn/server';
import { getCurrentUser } from '@/lib/auth';

export async function POST(req: Request) {
  const user = await getCurrentUser(req);
  
  const options = await generateRegistrationOptions({
    rpName: 'My App',
    rpID: 'example.com',
    userID: String(user.id),
    userName: user.email,
    userDisplayName: user.name,
    authenticatorSelection: {
      residentKey: 'required',  // passkey mandatory
      userVerification: 'required',
      authenticatorAttachment: 'platform',  // device biometrics
    },
    excludeCredentials: user.passkeys.map(p => ({
      id: p.credentialId,
      type: 'public-key',
    })),
  });

  // Store challenge in session
  await redis.set(`challenge:${user.id}`, options.challenge, { EX: 300 });

  return Response.json(options);
}
```

```typescript
// app/api/auth/passkey/login/route.ts — authentication
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
// components/PasskeyButton.tsx — UI with Conditional UI
'use client';
import { startRegistration, startAuthentication, browserSupportsWebAuthn } from '@simplewebauthn/browser';

export function PasskeyButton({ mode, email }: { mode: 'register' | 'login'; email?: string }) {
  if (!browserSupportsWebAuthn()) return <p>Your browser does not support passkeys</p>;

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
      {mode === 'register' ? '🔑 Create passkey' : '🔓 Login with passkey'}
    </button>
  );
}
```

### 3. Backup and recovery: the forgotten passkey challenge

#### The #1 user concern is losing access when switching devices. In 2026 there are three recommended patterns:

- **iCloud Keychain / Google Password Manager**: automatic sync across devices in the same ecosystem
- **Passkey export/import (2026 standard)**: AES-encrypted with recovery passphrase
- **Passkey recovery codes**: 10 single-use codes like 2FA backup

#### Recovery codes implementation:

```typescript
// Generate recovery codes when registering the first passkey
import { randomBytes } from 'crypto';

function generateRecoveryCodes(count = 10): string[] {
  return Array.from({ length: count }, () => {
    const bytes = randomBytes(8).toString('hex');
    return `${bytes.slice(0, 4)}-${bytes.slice(4, 8)}-${bytes.slice(8, 12)}`;
  });
}

// Hash before storing (bcrypt cost 12)
async function hashRecoveryCode(code: string): Promise<string> {
  return bcrypt.hash(code, 12);
}

// User uses one: mark as consumed (atomic update)
await db.recoveryCodes.update({
  where: { code_hash: await hashRecoveryCode(providedCode) },
  data: { usedAt: new Date() }
});
```

### 4. Migrating from passwords to passkeys in 2026

#### The recommended pattern in 2026 is progressive upgrade: keep accepting passwords for 3-6 months, suggest passkeys to logged-in users, and disable passwords when >80% have a passkey enrolled.

```typescript
// Hybrid migration strategy (2026)
async function loginFlow(email: string, password?: string, passkey?: any) {
  const user = await db.users.findUnique({ where: { email } });

  if (passkey) {
    // WebAuthn path — preferred
    return verifyAndLoginPasskey(user, passkey);
  }

  if (password && user.hasPassword) {
    // Legacy path — still supported
    await verifyPassword(password, user.passwordHash);
    
    // Suggest passkey if user has none
    if (user.passkeys.length === 0) {
      await sendUpgradeNudgeEmail(user);
    }
    
    return login(user);
  }

  throw new Error('Invalid credentials');
}
```

### 5. Security and advanced considerations in 2026

- **Mandatory user verification**: never accept passkeys without biometric or PIN verification
- **Unique challenge per session**: 300 seconds max, single use
- **HTTPS mandatory**: WebAuthn requires TLS (except localhost)
- **Rate limiting**: max 5 attempts per IP/email every 15 minutes
- **Audit logging**: every auth event (register, login, failure) must be logged
- **Backup credentials**: always offer passkeys + recovery codes

### Conclusions

#### Passkeys in 2026 are the new authentication standard. They eliminate passwords, are phishing-resistant, work cross-device and implementation is surprisingly simple with SimpleWebAuthn. Migrate your app this year: the cost of implementing is low, the benefit in security and UX is immediate, and most of your users already have passkeys ready (Face ID, Touch ID, Windows Hello). The passwordless future has already started.