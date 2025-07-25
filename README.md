# SISCOM API

## Step by Step to Run Project

### 1. Clone Repository

```bash
git clone https://github.com/pips/siscom-api.git
```

### 2. Install Dependencies

```bash
cd siscom-api
npm install
```
### 3. Run Database Migrations and Seeders

```bash
npx prisma migrate dev --name init
npx prisma db seed
```
### 4. Run Project

```bash
npm run start:dev
```
  