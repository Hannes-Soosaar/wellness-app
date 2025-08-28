#DB commands

up:
	cd postgresql && docker compose up -d

down:
	cd postgresql && docker compose down

initdb:


reset:
	cd postgresql && docker compose down
	cd postgresql && docker compose up -d
	docker volume rm $$(docker volume ls -q | grep _pgdata)|| true

clear:
	cd postgresql && docker compose down --volumes
	@if docker volume ls -q | grep _pgdata > /dev/null; then \
        docker volume rm $$(docker volume ls -q | grep _pgdata); \
    fi

#FE commands

startFe:
	cd frontend && npm run dev
#BE commands
startBe:
	cd backend && npx nodemon --exec "npx tsx src/index.ts"


#Full launch

launchApp:
	cd frontend && npm run dev &
	cd backend && npx nodemon --exec "npx tsx src/index.ts"
