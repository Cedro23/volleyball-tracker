"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

const FormSchema = z.object({
  id: z.string(),
  userId: z.string(),
  date: z.string(),
  groupId: z.string(),
  typeId: z.string(),
  focusId: z.string(),
  energyLevel: z.coerce.number().min(1).max(10, { message: "Energy level must be between 1 and 10." }),
  serveQuality: z.coerce.number().min(1).max(10, { message: "Serve quality must be between 1 and 10." }),
  firstTouch: z.coerce.number().min(1).max(10, { message: "First touch must be between 1 and 10." }),
  settingQuality: z.coerce.number().min(1).max(10, { message: "Setting quality must be between 1 and 10." }),
  gameFlow: z.coerce.number().min(1).max(10, { message: "Game flow must be between 1 and 10." }),
  attackingQuality: z.coerce.number().min(1).max(10, { message: "Attacking quality must be between 1 and 10." }),
  overallPerformance: z.coerce.number().min(1).max(10),
  winOfDay: z.string().optional(),
  needsWork: z.string().optional(),
  nextTimeFocus: z.string().optional(),
  notes: z.string().optional(),
});

const CreateSession = FormSchema.omit({ id: true, date: true });

export type State = {
  errors?: {
    userId?: string[];
    date?: string[];
    groupId?: string[];
    typeId?: string[];
    focusId?: string[];
    energyLevel?: string[];
    serveQuality?: string[];
    firstTouch?: string[];
    settingQuality?: string[];
    gameFlow?: string[];
    attackingQuality?: string[];
    overallPerformance?: string[];
  };
  message?: string | null;
};

export async function createSession(prevState: State, formData: FormData) {
  // Validate form using Zod
  const validatedFields = CreateSession.safeParse({
    userId: formData.get("userId"),
    groupId: formData.get("groupId"),
    typeId: formData.get("typeId"),
    focusId: formData.get("focusId"),
    energyLevel: formData.get("energyLevel"),
    serveQuality: formData.get("serveQuality"),
    firstTouch: formData.get("firstTouch"),
    settingQuality: formData.get("settingQuality"),
    gameFlow: formData.get("gameFlow"),
    attackingQuality: formData.get("attackingQuality"),
    overallPerformance: formData.get("overallPerformance"),
    winOfDay: formData.get("winOfDay"),
    needsWork: formData.get("needsWork"),
    nextTimeFocus: formData.get("nextTimeFocus"),
    notes: formData.get("notes"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Session.",
    };
  }

  const {
    userId,
    groupId,
    typeId,
    focusId,
    energyLevel,
    serveQuality,
    firstTouch,
    settingQuality,
    gameFlow,
    attackingQuality,
    overallPerformance,
    winOfDay,
    needsWork,
    nextTimeFocus,
    notes,
  } = validatedFields.data;
  const date = new Date().toISOString().split("T")[0];

  // Insert data into the database
  try {
    await sql`
      INSERT INTO sessions (userId, date, groupId, typeId, focusId, energyLevel, serveQuality, firstTouch, settingQuality, gameFlow, attackingQuality, overallPerformance, winOfDay, needsWork, nextTimeFocus, notes)
      VALUES (${userId}, ${date}, ${groupId}, ${typeId}, ${focusId}, ${energyLevel}, ${serveQuality}, ${firstTouch}, ${settingQuality}, ${gameFlow}, ${attackingQuality}, ${overallPerformance}, ${winOfDay || ""}, ${needsWork || ""}, ${nextTimeFocus || ""}, ${notes || ""})
    `;
  } catch (error) {
    // Should log the error for debugging purposes, but return a generic message to the user.
    console.error("Database Error:", error); // todo: implement proper logging for like admin dashboard or something
    // If a database error occurs, return a more specific error.
    return {
      message: "Database Error: Failed to Create Session.",
    };
  }

  // Revalidate the cache for the sessions page and redirect the user.
  revalidatePath("/dashboard/sessions");
  redirect("/dashboard/sessions");
}

const UpdateSession = FormSchema.omit({ id: true, date: true });

export async function updateSession(id: string, prevState: State, formData: FormData) {
  // Validate form using Zod
  const validatedFields = UpdateSession.safeParse({
    userId: formData.get("userId"),
    groupId: formData.get("groupId"),
    typeId: formData.get("typeId"),
    focusId: formData.get("focusId"),
    energyLevel: formData.get("energyLevel"),
    serveQuality: formData.get("serveQuality"),
    firstTouch: formData.get("firstTouch"),
    settingQuality: formData.get("settingQuality"),
    gameFlow: formData.get("gameFlow"),
    attackingQuality: formData.get("attackingQuality"),
    overallPerformance: formData.get("overallPerformance"),
    winOfDay: formData.get("winOfDay"),
    needsWork: formData.get("needsWork"),
    nextTimeFocus: formData.get("nextTimeFocus"),
    notes: formData.get("notes"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Session.",
    };
  }

  const {
    userId,
    groupId,
    typeId,
    focusId,
    energyLevel,
    serveQuality,
    firstTouch,
    settingQuality,
    gameFlow,
    attackingQuality,
    overallPerformance,
    winOfDay,
    needsWork,
    nextTimeFocus,
    notes,
  } = validatedFields.data;

  try {
    await sql`
    UPDATE sessions
    SET userId = ${userId}, groupId = ${groupId}, typeId = ${typeId}, focusId = ${focusId}, energyLevel = ${energyLevel}, serveQuality = ${serveQuality}, firstTouch = ${firstTouch}, settingQuality = ${settingQuality}, gameFlow = ${gameFlow}, attackingQuality = ${attackingQuality}, overallPerformance = ${overallPerformance}, winOfDay = ${winOfDay || ""}, needsWork = ${needsWork || ""}, nextTimeFocus = ${nextTimeFocus || ""}, notes = ${notes || ""}
    WHERE id = ${id}
  `;
  } catch (error) {
    // Should log the error for debugging purposes, but return a generic message to the user.
    console.error("Database Error:", error); // todo: implement proper logging for like admin dashboard or something
    return {
      message: "Database Error: Failed to Update Session.",
    };
  }
}

export async function deleteSession(id: string) {
  try {
    await sql`DELETE FROM sessions WHERE id = ${id}`;
    revalidatePath("/dashboard/sessions");
  } catch (error) {
    // Should log the error for debugging purposes, but return a generic message to the user.
    console.error("Database Error:", error); // todo: implement proper logging for like admin dashboard or something
    return {
      message: "Database Error: Failed to Delete Session.",
    };
  }
}
