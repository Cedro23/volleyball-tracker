import bcrypt from "bcrypt";
import postgres from "postgres";
import { users, groups, types, focuses, sessions } from "@/app/lib/placeholder-data";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

async function seedUsers() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return sql`
        INSERT INTO users (id, username, email, password)
        VALUES (${user.id}, ${user.username}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
    }),
  );

  return insertedUsers;
}

async function seedGroups() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await sql`
    CREATE TABLE IF NOT EXISTS groups (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      userId UUID NOT NULL,
      name VARCHAR(30) NOT NULL,
      duration VARCHAR(5) NOT NULL
    );
  `;

  const insertedGroups = await Promise.all(
    groups.map(
      (group) => sql`
        INSERT INTO groups (id, userId, name, duration)
        VALUES (${group.id}, ${group.userId}, ${group.name}, ${group.duration})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedGroups;
}

async function seedTypes() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await sql`
    CREATE TABLE IF NOT EXISTS types (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      userId UUID NOT NULL,
      name VARCHAR(30) NOT NULL
    );
  `;

  const insertedTypes = await Promise.all(
    types.map(
      (type) => sql`
        INSERT INTO types (id, userId, name)
        VALUES (${type.id}, ${type.userId}, ${type.name})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedTypes;
}

async function seedFocuses() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await sql`
    CREATE TABLE IF NOT EXISTS focuses (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      userId UUID NOT NULL,
      name VARCHAR(30) NOT NULL
    );
  `;

  const insertedFocuses = await Promise.all(
    focuses.map(
      (focus) => sql`
        INSERT INTO focuses (id, userId, name)
        VALUES (${focus.id}, ${focus.userId}, ${focus.name})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedFocuses;
}

async function seedSessions() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await sql`
    CREATE TABLE IF NOT EXISTS sessions (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      date DATE NOT NULL,
      userId UUID NOT NULL,
      groupId UUID NOT NULL,
      typeId UUID NOT NULL,
      focusId UUID NOT NULL,
      energyLevel FLOAT8 NOT NULL,
      serveQuality FLOAT8 NOT NULL,
      firstTouch FLOAT8 NOT NULL,
      settingQuality FLOAT8 NOT NULL,
      gameFlow FLOAT8 NOT NULL,
      attackingQuality FLOAT8 NOT NULL,
      overallPerformance FLOAT8 NOT NULL,
      winOfDay TEXT NOT NULL,
      needsWork TEXT NOT NULL,
      nextTimeFocus TEXT NOT NULL,
      notes TEXT NOT NULL
    );
  `;

  const insertedSessions = await Promise.all(
    sessions.map(
      (session) => sql`
        INSERT INTO sessions (
          id, date, userId, groupId, typeId, focusId, energyLevel, serveQuality, firstTouch, settingQuality, gameFlow, attackingQuality, overallPerformance
        )
        VALUES (
          ${session.id},
          ${session.date},
          ${session.userId},
          ${session.groupId},
          ${session.typeId},
          ${session.focusId},
          ${session.energyLevel},
          ${session.serveQuality},
          ${session.firstTouch},
          ${session.settingQuality},
          ${session.gameFlow},
          ${session.attackingQuality},
          ${session.overallPerformance}
        )
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedSessions;
}

export async function GET() {
  try {
    await sql.begin(() => [seedUsers(), seedGroups(), seedTypes(), seedFocuses(), seedSessions()]);

    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
