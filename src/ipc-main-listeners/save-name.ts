import { type IpcMainListener } from ".";
import { users } from "@/schema";
import { db } from "@/utils/db";

export const saveName: IpcMainListener = (_: unknown, name: string): void => {
  void db.insert(users).values({ name }).run();
};
