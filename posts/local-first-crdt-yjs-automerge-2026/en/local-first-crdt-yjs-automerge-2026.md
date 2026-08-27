---
title: "Web Development"
subtitle: "Local-First Software in 2026: CRDTs with Yjs and Automerge for Offline-First Apps"
description: "Complete guide to local-first software in 2026: CRDTs with Yjs and Automerge 3.0, offline-first sync between devices, ElectricSQL, conflict resolution and collaborative apps without a central server."
date: "18 June 2026"
image: "./local-first-crdt-2026.svg"
icon: "./local-first-icon.svg"
language: "js"
---

![local-first crdt yjs automerge 2026](./local-first-crdt-2026.svg)

# Local-First Software in 2026:
## CRDTs with Yjs and Automerge

18 June 2026

#### Complete guide to local-first software in 2026: CRDTs with Yjs and Automerge 3.0, offline-first sync between devices, ElectricSQL, conflict resolution and collaborative apps without a central server.

### What is Local-First and why is it the #1 trend in 2026?

#### Local-first is an architecture where data lives on the user's device and the server only syncs. The app works offline, changes merge automatically across devices and the user keeps total control of their data. It is the opposite of the traditional SaaS app where every click makes a round-trip to the server.

#### In 2026, thanks to mature CRDTs (Conflict-free Replicated Data Types) like Yjs and Automerge 3.0, building local-first apps is as easy as building a normal React app. The difference is that you get offline, multi-device and real-time collaboration for free. Companies like Linear, Notion, Figma, Apple Notes and Vercel have already adopted this pattern.

```typescript
// First Local-First example with Yjs in 2026
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';

// Shared state across users and devices
const ydoc = new Y.Doc();

// Shared map (auto-synced)
const ymap = ydoc.getMap('tasks');
ymap.set('todo-1', { title: 'Learn CRDTs', done: false });

// Sync server (optional, just relays, not source of truth)
const provider = new WebsocketProvider(
  'wss://sync.example.com',
  'room-1',
  ydoc
);

// Each client can edit offline and syncs when reconnected
ymap.set('todo-1', { title: 'Learn CRDTs', done: true });
// Yjs merges automatically without losing changes
```

### 1. CRDTs: the math that makes Local-First possible

#### A CRDT is a data structure that guarantees eventual convergence: two clients editing offline, when they sync, reach the same state without needing a server to resolve conflicts. Yjs uses commutative operations (YATA algorithm), Automerge uses json-patches with vector timestamps.

#### Which to choose in 2026:
- **Yjs** (faster, ideal for text editors, 0.1-2ms per operation): collaborative editor, forms, lists
- **Automerge 3.0** (simpler, json-like, better for graphs and nested structures): CMS, local databases, file sync

```typescript
// Yjs — Operations CRDTs (YATA)
// Benchmark: 1M operations / second on M3
const ydoc = new Y.Doc();
const ytext = ydoc.getText('content');

// Two users edit the same text offline
// User A: inserts "Hello " at position 0
ytext.insert(0, 'Hello ');
// User B: inserts "World" at position 0 (same time, offline)
ytext.insert(0, 'World');

// When syncing, both see: "World Hello " without losing anything
// Yjs guarantees eventual convergence automatically
```

```typescript
// Automerge 3.0 — JSON-like CRDTs
import { next as Automerge } from '@automerge/automerge';

let doc1 = Automerge.init();
let doc2 = Automerge.init();

// Two users edit the same document offline
doc1 = Automerge.change(doc1, d => {
  d.tasks = [];
  d.tasks.push({ id: '1', title: 'Buy bread', done: false });
});

doc2 = Automerge.change(doc2, d => {
  d.tasks = [];
  d.tasks.push({ id: '2', title: 'Pay electricity', done: false });
});

// Automatic merge: both see both tasks, no conflict
const merged = Automerge.merge(doc1, doc2);
console.log(merged.tasks); // [{ id: '1', ... }, { id: '2', ... }]
```

### 2. ElectricSQL: Postgres + Local-First in 2026

#### ElectricSQL is the bridge between Postgres and local-first apps. Define your schema in Postgres, sync automatically to the client via HTTP/shape queries, and data is available offline-first. In 2026, Electric is compatible with Yjs, Dexie (IndexedDB) and Replicache.

#### It is the ideal pattern for SaaS that wants local-first without rewriting their backend:

```typescript
// ElectricSQL: Postgres sync to the client (2026)
import { ShapeStream, Shape } from '@electric-sql/client';

// 1. Server exposes shapes (subsets of tables)
const stream = new ShapeStream({
  url: 'https://api.example.com/v1/shape',
  params: { table: 'tasks', user_id: 'me' }
});

// 2. Client receives data in real time
const shape = new Shape(stream);
shape.subscribe(rows => {
  console.log('Synced tasks:', rows);
  // Data available offline via IndexedDB
});

// 3. To write: HTTP POST + optimistic update
await fetch('/api/tasks', {
  method: 'POST',
  body: JSON.stringify({ title: 'New task' })
});
// Electric syncs automatically when the server responds
```

### 3. Complete stack for a Local-First app in 2026

#### If you start a SaaS in 2026, this architecture gives you offline, multi-device and collaboration without a complex central server:

```yaml
# Recommended Local-First stack in 2026
frontend:
  framework: React 19 + Next.js 16
  state_sync: Yjs (CRDT) or ElectricSQL (Postgres-sync)
  persistence: IndexedDB (idb-keyval) or SQLite (wa-sqlite)
  offline_ui: React Query + PersistQueryClient
  
backend:
  api: Hono or Next.js Route Handlers
  db: Postgres 17 + ElectricSQL shape server
  sync_transport: WebSocket (Yjs) or Server-Sent Events (Electric)
  
deploy:
  frontend: Vercel (Next.js)
  db_sync: Fly.io or Railway (ElectricSQL)
  cdn: Cloudflare (static)
```

#### Complete example: offline-first collaborative notes editor:

```typescript
// app/notes/[id]/page.tsx — local-first editor with Yjs
'use client';
import { useEffect, useState } from 'react';
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { IndexeddbPersistence } from 'y-indexeddb';

export default function NoteEditor({ id }: { id: string }) {
  const [ydoc] = useState(() => new Y.Doc());
  const [status, setStatus] = useState<'offline' | 'syncing' | 'synced'>('offline');

  useEffect(() => {
    // 1. Local persistence (offline-first, IndexedDB)
    const persistence = new IndexeddbPersistence(`note-${id}`, ydoc);
    
    // 2. Sync via WebSocket (when there is network)
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

  // Editor works 100% offline, auto-sync when network returns
  return (
    <div>
      <div className="status">
        {status === 'offline' && '📡 Offline mode — changes saved locally'}
        {status === 'synced' && '✅ Synced with the cloud'}
      </div>
      {/* TipTap, ProseMirror, Lexical, etc — all support Yjs */}
    </div>
  );
}
```

### 4. Comparison: Local-First vs Cloud-First in 2026

| Aspect | Cloud-First (traditional) | Local-First (2026) |
| --- | --- | --- |
| **UI latency** | 100-400ms per click | 0ms (local) |
| **Offline** | Does not work | 100% functional |
| **Multi-device** | Manual sync via server | Automatic via CRDT |
| **Server costs** | High (DB, cache, queue) | Low (sync only) |
| **Privacy** | Data on server | Data on client |
| **Collaboration** | Requires custom WebSocket | Built-in with Yjs |
| **Dev complexity** | Medium | Medium (pattern changes) |

### 5. Companies that adopted Local-First in 2025-2026

- **Linear**: migrated their UI to local-first in 2025, 0ms latency, full offline
- **Figma**: uses CRDTs internally since 2016 for its collaborative editor
- **Apple Notes**: syncs via proprietary CRDTs across iCloud
- **Notion**: local databases with deferred sync in their new 2026 engine
- **Replicache**: framework to build local-first apps in 2026, used by Figma clones
- **Vercel**: their dashboard uses local-first for the configs editor

### Conclusions

#### Local-first in 2026 is not an exotic technology: it is the new standard for apps that prioritize speed, privacy and offline. With mature CRDTs like Yjs and Automerge, infrastructure like ElectricSQL and frameworks like Replicache, building local-first apps is easier than ever. If your SaaS app has a panel, editor or form, it is worth evaluating migrating to local-first — the UX improvement is immediate.