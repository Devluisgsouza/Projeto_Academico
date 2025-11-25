import { useSQLiteContext } from "expo-sqlite";

export type Database = {
    id: number;
    name: string;
    email: string;
    password_hash: string;
    re: number;
}

export function usersDatabase() {
    const db = useSQLiteContext()


    async function create_users(data: Omit<Database, "id">) {
        const statement = await db.prepareAsync(
            "INSERT INTO users (name, email, password_hash, re) VALUES ($name, $email, $password_hash, $re);"
        )

        try {
            const result = await statement.executeAsync({
                $name: data.name,
                $email: data.email,
                $password_hash: data.password_hash,
                $re: data.re,
            })

            const insertedRowId = result.lastInsertRowId.toLocaleString()

            return{ insertedRowId }
        } catch (error) {
          throw error
    }

    }
    return { create_users }
}

