---
title: "Desarrollo Web"
subtitle: "Software Local-First en 2026: CRDTs con Yjs y Automerge para Apps Offline-First"
description: "Guia completa de software local-first en 2026: CRDTs con Yjs y Automerge 3.0, sincronizacion offline-first entre dispositivos, ElectricSQL, conflict resolution y apps colaborativas sin servidor central."
date: "18 junio 2026"
image: "./local-first-crdt-2026.svg"
icon: "./local-first-icon.svg"
language: "js"
---

![local-first crdt yjs automerge 2026](./local-first-crdt-2026.svg)

# Software Local-First en 2026:
## CRDTs con Yjs y Automerge

18 junio 2026

#### Guia completa de software local-first en 2026: CRDTs con Yjs y Automerge 3.0, sincronizacion offline-first entre dispositivos, ElectricSQL, conflict resolution y apps colaborativas sin servidor central.

### Que es Local-First y por que es la tendencia #1 en 2026?

#### Local-first es una arquitectura donde los datos viven en el dispositivo del usuario y el servidor solo sincroniza. La app funciona offline, los cambios se mergean automaticamente entre dispositivos y el usuario mantiene control total de sus datos. Es lo opuesto a la app SaaS tradicional donde cada click hace un round-trip al servidor.

#### En 2026, gracias a CRDTs (Conflict-free Replicated Data Types) maduros como Yjs y Automerge 3.0, construir apps local-first es tan facil como construir una app React normal. La diferencia es que obtienes offline, multi-device y colaboracion en tiempo real gratis. Empresas como Linear, Notion, Figma, Apple Notes y Vercel ya adoptaron este patron.

```typescript
// Primer ejemplo Local-First con Yjs en 2026
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';

// Estado compartido entre usuarios y dispositivos
const ydoc = new Y.Doc();

// Mapa compartido (se sincroniza automaticamente)
const ymap = ydoc.getMap('tasks');
ymap.set('todo-1', { title: 'Aprender CRDTs', done: false });

// Servidor de sync (opcional, solo retransmite, no es fuente de verdad)
const provider = new WebsocketProvider(
  'wss://sync.example.com',
  'room-1',
  ydoc
);

// Cada cliente puede editar offline y sincroniza al reconectar
ymap.set('todo-1', { title: 'Aprender CRDTs', done: true });
// Yjs mergea automaticamente sin perder cambios
```

### 1. CRDTs: la matematica que hace posible Local-First

#### Un CRDT es una estructura de datos que garantiza convergencia eventual: dos clientes que editan offline, al sincronizar, llegan al mismo estado sin necesidad de un servidor que resuelva conflictos. Yjs usa operaciones commutativas (YATA algorithm), Automerge usa json-patches con timestamps vectoriales.

#### Cual elegir en 2026:
- **Yjs** (mas rapido, ideal para editores de texto, 0.1-2ms por operacion): editor colaborativo, formularios, listas
- **Automerge 3.0** (mas simple, json-like, mejor para grafos y estructuras anidadas): CMS, bases de datos locales, sincronizacion de archivos

```typescript
// Yjs — CRDTs tipo Operaciones (YATA)
// Benchmark: 1M operaciones / segundo en M3
const ydoc = new Y.Doc();
const ytext = ydoc.getText('content');

// Dos usuarios editan el mismo texto offline
// Usuario A: inserta "Hola " en posicion 0
ytext.insert(0, 'Hola ');
// Usuario B: inserta "Mundo" en posicion 0 (mismo tiempo, offline)
ytext.insert(0, 'Mundo');

// Al sincronizar, ambos ven: "Mundo Hola " sin perder nada
// Yjs garantiza convergencia eventual automaticamente
```

```typescript
// Automerge 3.0 — CRDTs tipo JSON
import { next as Automerge } from '@automerge/automerge';

let doc1 = Automerge.init();
let doc2 = Automerge.init();

// Dos usuarios editan el mismo documento offline
doc1 = Automerge.change(doc1, d => {
  d.tasks = [];
  d.tasks.push({ id: '1', title: 'Comprar pan', done: false });
});

doc2 = Automerge.change(doc2, d => {
  d.tasks = [];
  d.tasks.push({ id: '2', title: 'Pagar luz', done: false });
});

// Merge automatico: ambos ven las dos tareas, sin conflicto
const merged = Automerge.merge(doc1, doc2);
console.log(merged.tasks); // [{ id: '1', ... }, { id: '2', ... }]
```

### 2. ElectricSQL: Postgres + Local-First en 2026

#### ElectricSQL es el puente entre Postgres y apps local-first. Define tu schema en Postgres, sincronizas automaticamente al cliente via HTTP/shape queries, y los datos estan disponibles offline-first. En 2026, Electric es compatible con Yjs, Dexie (IndexedDB) y Replicache.

#### Es el patron ideal para SaaS que quiere local-first sin reescribir su backend:

```typescript
// ElectricSQL: Postgres sync hacia el cliente (2026)
import { ShapeStream, Shape } from '@electric-sql/client';

// 1. El servidor expone shapes (subsets de tablas)
const stream = new ShapeStream({
  url: 'https://api.example.com/v1/shape',
  params: { table: 'tasks', user_id: 'me' }
});

// 2. El cliente recibe datos en tiempo real
const shape = new Shape(stream);
shape.subscribe(rows => {
  console.log('Tareas sincronizadas:', rows);
  // Datos disponibles offline via IndexedDB
});

// 3. Para escribir: HTTP POST + optimistic update
await fetch('/api/tasks', {
  method: 'POST',
  body: JSON.stringify({ title: 'Nueva tarea' })
});
// Electric sincroniza automaticamente cuando el servidor responde
```

### 3. Stack completo para una app Local-First en 2026

#### Si empiezas un SaaS en 2026, esta arquitectura te da offline, multi-device y colaboracion sin servidor central complejo:

```yaml
# Stack Local-First recomendado en 2026
frontend:
  framework: React 19 + Next.js 16
  state_sync: Yjs (CRDT) o ElectricSQL (Postgres-sync)
  persistence: IndexedDB (idb-keyval) o SQLite (wa-sqlite)
  offline_ui: React Query + PersistQueryClient
  
backend:
  api: Hono o Next.js Route Handlers
  db: Postgres 17 + ElectricSQL shape server
  sync_transport: WebSocket (Yjs) o Server-Sent Events (Electric)
  
deploy:
  frontend: Vercel (Next.js)
  db_sync: Fly.io o Railway (ElectricSQL)
  cdn: Cloudflare (estaticos)
```

#### Ejemplo completo: editor de notas colaborativo offline-first:

```typescript
// app/notes/[id]/page.tsx — editor local-first con Yjs
'use client';
import { useEffect, useState } from 'react';
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { IndexeddbPersistence } from 'y-indexeddb';

export default function NoteEditor({ id }: { id: string }) {
  const [ydoc] = useState(() => new Y.Doc());
  const [status, setStatus] = useState<'offline' | 'syncing' | 'synced'>('offline');

  useEffect(() => {
    // 1. Persistencia local (offline-first, IndexedDB)
    const persistence = new IndexeddbPersistence(`note-${id}`, ydoc);
    
    // 2. Sync via WebSocket (cuando hay red)
    const provider = new WebsocketProvider(
      process.env.NEXT_PUBLIC_SYNC_URL!,
      `note-${id}`,
      ydoc,
      { connect: true }
    );

    provider.on('status', (e: any) => {
      setStatus(e.connected ? 'synced' : 'offline');
    });

    return () => {
      provider.destroy();
      persistence.destroy();
    };
  }, [id, ydoc]);

  // El editor funciona 100% offline, sync automatico cuando vuelve la red
  return (
    <div>
      <div className="status">
        {status === 'offline' && '📡 Modo offline — cambios guardados localmente'}
        {status === 'synced' && '✅ Sincronizado con la nube'}
      </div>
      {/* TipTap, ProseMirror, Lexical, etc — todos soportan Yjs */}
    </div>
  );
}
```

### 4. Comparativa: Local-First vs Cloud-First en 2026

| Aspecto | Cloud-First (tradicional) | Local-First (2026) |
| --- | --- | --- |
| **Latencia UI** | 100-400ms por click | 0ms (local) |
| **Offline** | No funciona | 100% funcional |
| **Multi-device** | Sync manual via servidor | Automatico via CRDT |
| **Costes servidor** | Alto (DB, cache, queue) | Bajo (solo sync) |
| **Privacidad** | Datos en servidor | Datos en cliente |
| **Colaboracion** | Requiere WebSocket custom | Built-in con Yjs |
| **Complejidad dev** | Media | Media (cambia el patron) |

### 5. Empresas que adoptaron Local-First en 2025-2026

- **Linear**: migraron su UI a local-first en 2025, latencia 0ms, offline total
- **Figma**: usa CRDTs internamente desde 2016 para su editor colaborativo
- **Apple Notes**: sincroniza via CRDTs propietarios entre iCloud
- **Notion**: bases de datos locales con sync diferido en su nuevo motor 2026
- **Replicache**: framework para construir apps local-first en 2026, usado por Figma clones
- **Vercel**: su dashboard usa local-first para el editor de configs

### Conclusiones

#### Local-first en 2026 no es una tecnologia exotica: es el nuevo estandar para apps que priorizan velocidad, privacidad y offline. Con CRDTs maduros como Yjs y Automerge, infraestructura como ElectricSQL y frameworks como Replicache, construir apps local-first es mas facil que nunca. Si tu app SaaS tiene un panel, editor o formulario, vale la pena evaluar migrar a local-first — la mejora en UX es inmediata.