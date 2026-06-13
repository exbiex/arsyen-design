# Arsyen — Local Infra: Container Naming & Port Allocation

> One map so the four repos' dev stacks **coexist without collisions**. Each repo
> gets (a) a distinct Compose **project name** (so container names are namespaced)
> and (b) a distinct **host-port lane**. Container ports stay standard; only the
> host-side mapping differs.

## Convention
- Every `docker-compose.yml` pins `name: <project>` (so the project is stable
  regardless of the folder it's run from). Containers become `<project>-<svc>-N`
  (or an explicit `container_name: <project>-<svc>`).
- Host ports are parameterized with `${VAR:-default}` so any repo can be nudged
  via its `.env` without editing the compose.

## Allocation map

| Repo | Compose project | Postgres | Redis | MinIO API / console | Search / mail | App·API host ports |
|---|---|---|---|---|---|---|
| **arsyen-platform** | `arsyen` | **5432** | **6379** | **9000 / 9001** | meili 7700 · mailpit 1025/8025 | Go API **8080**, Flutter web preview **8081**, Next web **3000** |
| **arsyen-research-platform** | `arsyen-research` | **5433** | **6380** | **9002 / 9003** | — | reserve **3100–3199** for its Node apps |
| **arsyen-canvas-engine** | `arsyen-canvas` | 5434 | 6381 | 9004 / 9005 | — | dev servers **3200–3299** |
| **arsyen-generative-engine** | `arsyen-generative` | 5435 | 6382 | 9006 / 9007 | — | services **3300–3399** |

Rows 1–2 are **live today**; rows 3–4 are **reserved** for when those repos add a
compose (use these defaults so nothing collides).

## State (2026-06-13)
- ✅ Platform (`arsyen`) and research (`arsyen-research`) project names + container
  names are already namespaced.
- ✅ Research had Postgres→5433 / Redis→6380, but its **MinIO defaulted to 9000/9001
  — collided with the platform**. Fixed: research MinIO now defaults to **9002/9003**.
- ✅ Named volumes are namespaced (`arsyen-research-pgdata`, etc.); platform uses
  `minio-data` (project-scoped) + `./data/*` bind mounts.

## Watch-outs (verify when those apps come online)
- **Web dev-server port 3000:** the platform's Next `web` uses 3000; make sure
  research/canvas Node apps don't also grab 3000 — assign from their reserved lane.
- **CORS:** the platform Go API only allows `http://localhost:3000` and `:8081`
  (`deploy/.env` `CORS_ORIGINS`); any new web origin must be added there.
- **Optional consistency:** the platform Compose project is `arsyen` (not
  `arsyen-platform`). Renaming it to `arsyen-platform` would match the repo, but
  re-creates the stack (the `./data/postgres` bind-mount survives; the `minio-data`
  named volume is re-created and re-seeded by `minio-init`). Left as `arsyen` for now.

## How to run a repo's stack
```
cd <repo>/<dir-with-compose> && docker compose up -d      # project name is pinned
docker compose -p <project> ps                            # inspect just that stack
docker compose -p <project> down                          # stop just that stack
```
