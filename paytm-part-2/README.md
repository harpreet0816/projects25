## STEPS
    1. npm install
    2. cd packages/db
    3. add a .env file with database url DATABASE_URL=
    4. npx prisma migrate dev
    5. npx prisma generate
    6. add .env file to app/user-app    JWT_SECRET=
        NEXTAUTH_URL=
    7. npm run dev