.DEFAULT_GOAL := help
SHELL         := /bin/bash
COMPOSE       := docker compose

.PHONY: help
help: ## Show available commands
	@awk 'BEGIN {FS = ":.*##"; printf "Usage: make \033[36m<target>\033[0m\n\nTargets:\n"} \
	      /^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2 }' \
	      $(MAKEFILE_LIST)

# ── Setup ──────────────────────────────────────────────────────
.PHONY: setup
setup: ## First-time setup: copy .env.example → .env
	@cp -n .env.example .env \
	  && echo "✓ .env created — fill in the values, then: make build up" \
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

# ── Dev ────────────────────────────────────────────────────────
.PHONY: dev
dev: ## Start Vite dev server (port 3000)
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

# ── Docker ─────────────────────────────────────────────────────
.PHONY: build
build: check-env ## Build Docker image (reads VITE_* from .env)
	$(COMPOSE) build

.PHONY: up
up: check-env ## Start client container
	$(COMPOSE) up -d

.PHONY: down
down: ## Stop and remove container
	$(COMPOSE) down

.PHONY: rebuild
rebuild: check-env ## Rebuild image and restart (required after VITE_* changes)
	$(COMPOSE) up -d --build

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
shell: ## Shell inside client (nginx) container
	$(COMPOSE) exec client sh
