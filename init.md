# EB Init Steps

- npx create-turbo@latest turby
- use `npm workspaces`

```sh
>>> Success! Created a new Turborepo at "turby".
Inside that directory, you can run several commands:

  npm run build
     Build all apps and packages

  npm run dev
     Develop all apps and packages

  npm run lint
     Lint all apps and packages

Turborepo will cache locally by default. For an additional
speed boost, enable Remote Caching with Vercel by
entering the following command:

  npx turbo login

We suggest that you begin by typing:

  cd turby
  npx turbo login
```

## Turbo Login

```sh
 npx turbo login
>>> Opening browser to https://vercel.com/turborepo/token?redirect_uri=http%3A%2F%2F127.0.0.1%3A9789

>>> Success! Turborepo CLI authorized for ma****@gmail.com
To connect to your Remote Cache, run the following in any turborepo:
  npx turbo link

```

## Add Tailwind

<https://github.com/vercel/turbo/tree/main/examples/with-tailwind/apps>

Looking at this example:

- We've added a tailwind-config to the packages.
- Within EACH FE app we've added `autoprefixer postcss tailwindcss`.
- Each FE App has its `tailwind.config.ts` file that inherits from the package.
  - This helps IDE Support if opening a single app > the whole mono repo
- At the root we've created a tailwind.config.ts file that extends from the package
  - Only necessary to leverage IDE support when viewing the whole monorepo

## Add an API

- `cd apps`
- `npx nest new api`

Inside of packages ts-config.
Add a `api.json` and copy the contents out of the generated nest app to here.
Back in apps/api/tsconfg -- update to extend from packages.
(Not mandatory -- but keeps the convention)

In the API package.json file.
Ensure there is a `dev` script to match the turbo `npm run dev`.
This will allow all apps to start together from root.

Similar ensure there is a lint, typecheck, etc. to match.

... One final bug.

In `src/main.ts` update the port to `4000` > `3000`
3000 is already being used by our web app -- convention APIs and Services are now 4000+.

Finally, delete the `.git` folder created by Nest.
We want to leverage the monorepo .git folder here.

## Add Prisma

<https://docs.nestjs.com/recipes/prisma#set-up-prisma>

Add dotenv `npm i -D dotenv-cli`
Add package.json scripts to the api.

```json
{
  "scripts": {
    "db:migrate": "npm run withEnv:dev prisma migrate dev",
    "db:migrate:test": "npm run withEnv:test prisma migrate dev",
    "db:migrate:prod": "npm run withEnv prisma migrate deploy",
    "db:migrate:create": "npm run db:migrate --create-only",
    "db:deploy": "prisma migrate deploy",
    "db:prepare:ci": "npm run withEnv:test prisma migrate deploy && npm run withEnv:test prisma db seed",
    "db:reset": "npm run withEnv:dev prisma migrate reset",
    "db:reset:test": "npm run withEnv:test prisma migrate reset --skip-seed",
    "db:force-full-reset:test": "npm run withEnv:test prisma migrate reset --force",
    "db:seed": "npm run withEnv:dev prisma db seed",

    "withEnv": "dotenv -c --",
    "withEnv:dev": "dotenv -c development --",
    "withEnv:test": "dotenv -c test --"
  }
}
```

Create a .env.development, .env.development.local, .env.test, .env.test.local to match the dotenv package scripts.
Add a DATABASE_URL to each.
Rename `.env` to `.env.sample`
(Nest will try to leverage .env if found)

- Add a dummy model
- Test the db:migrate script

## Shared Types

There is a Shared Types folder with ZOD and plain Types, mostly inferred from ZOD.
The Prisma Types should not live here...

### API Prisma Types and Serializers

The Nest API layer should leverage Serializers to transform the Prisma Types into Client Types (Shared Types).

## TODO

Testing:

- Playwright E2E
- Example of 3rd party services and test mode (API)
- Fuller CRUD Relational DB Example (User with Posts)
- With Auth Examples (API @AuthUser)

Packages:

- Organization / Better Exporting of UI components
