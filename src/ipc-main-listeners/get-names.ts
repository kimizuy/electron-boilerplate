import { users } from "../schema";
import { db } from "../utils/db";
import { type IpcMainListener } from ".";

export const getNames = ((): string[] | null => {
  db.insert(users)
    .values({ id: 1, name: "John Doe" })
    .onConflictDoNothing({ target: users.id })
    .run();

  const allUsers = db.select().from(users).all();
  const names = allUsers
    .map((row) => row.name)
    .filter((name): name is NonNullable<typeof name> => name !== null);

  return names;
}) satisfies IpcMainListener;
