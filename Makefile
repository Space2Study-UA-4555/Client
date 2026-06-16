.DEFAULT_GOAL := help
SHELL         := /bin/bash
COMPOSE       := docker compose
COMPOSE_PROD  := docker compose -f docker-compose.prod.yml

.PHONY: help
help: ## Show available commands
	@awk 'BEGIN {FS = ":.*##"; printf "Usage: make \033[36m<target>\033[0m\n\nTargets:\n"} \
	      /^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2 }' \
	      $(MAKEFILE_LIST)

# ── Setup ──────────────────────────────────────────────────────
.PHONY: setup
setup: ## First-time setup: copy .env.example → .env
	@cp -n .env.example .env \
	  && echo "✓ .env created — fill in the values, then: make up" \
	  || echo "ℹ .env already exists"

.PHONY: install
install: ## Install npm dependencies
	npm install

.PHONY: check-env
check-env: ## Fail early if .env is missing
	@if [ ! -f .env ]; then \
		echo "✗ .env is missing."; \
		echo "Run: make setup"; \
		echo "Then review the generated .env values before building the client."; \
		exit 1; \
	fi

# ── Local (no Docker) ──────────────────────────────────────────
.PHONY: dev
dev: ## Run the Vite dev server directly on the host (port 3000)
	npm run start

.PHONY: test
test: ## Run tests (Vitest)
	npm run test

.PHONY: lint
lint: ## Lint code
	npm run lint

.PHONY: build-static
build-static: ## Build static files (dist/)
	npm run build

# ── Docker (dev — default) ─────────────────────────────────────
.PHONY: up
up: check-env ## Start Vite dev server in Docker with HMR (port 5173, code bind-mounted)
	$(COMPOSE) up -d

.PHONY: down
down: ## Stop and remove container
	$(COMPOSE) down

.PHONY: restart
restart: ## Restart container
	$(COMPOSE) restart

.PHONY: ps
ps: ## Show container status
	$(COMPOSE) ps

.PHONY: logs
logs: ## Tail container logs
	$(COMPOSE) logs -f --tail=100

.PHONY: shell
shell: ## Shell inside client container
	$(COMPOSE) exec client sh

# ── Docker (prod) ──────────────────────────────────────────────
.PHONY: prod-build
prod-build: check-env ## Build production image (Dockerfile, reads VITE_* from .env)
	$(COMPOSE_PROD) build

.PHONY: prod-up
prod-up: check-env ## Start production client (nginx, built static)
	$(COMPOSE_PROD) up -d --build

.PHONY: prod-down
prod-down: ## Stop and remove production container
	$(COMPOSE_PROD) down

# ── Deprecated aliases (kept for backward compatibility) ───────
.PHONY: build rebuild
build: prod-build  ## Deprecated: use prod-build
rebuild: prod-up   ## Deprecated: use prod-up
