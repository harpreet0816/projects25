mkdir backend 
cd backend 
 npm i @trpc/server express zod prisma @prisma/client

 npx prisma init

 docker compose up d

 or docker run --name my-postgres \
  -e POSTGRES_USER=admin \
  -e POSTGRES_PASSWORD=admin \
  -e POSTGRES_DB=mydb \
  -p 5432:5432 \
  -d postgres


after adding model in schema.prisma
run npx prisma migrate dev --name init
