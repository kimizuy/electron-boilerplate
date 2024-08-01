import { users } from "../schema";
import { db } from "../utils/db";
import { type IpcMainListener } from ".";

export const getNames: IpcMainListener = (): (string | null)[] => {
  db.insert(users)
    .values({ id: 1, name: "John Doe" })
    .onConflictDoNothing({ target: users.id })
    .run();

  const allUsers = db.select().from(users).all();
  const names = allUsers.map((row) => row.name);

  return names;
};
