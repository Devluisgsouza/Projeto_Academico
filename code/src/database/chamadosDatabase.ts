import { useSQLiteContext } from "expo-sqlite";

export type Database2 = {
    id: number;
    title: string;
    description: string;
    status: string;
    user_id: number;
}

export function chamadosDatabase() {
    const db2 = useSQLiteContext()


    async function create_chamados(data: Omit<Database2, "id">) {
        const statement = await db2.prepareAsync(
            "INSERT INTO chamados (title, description, status, user_id) VALUES ($title, $description, $status, $user_id);"
        )

        try {
            const result = await statement.executeAsync({
                $title: data.title,
                $description: data.description,
                $status: data.status,
                $user_id: data.user_id,
            })

            const insertedRowId = result.lastInsertRowId.toLocaleString()

            return{ insertedRowId }
        } catch (error) {
          throw error
    }

    }
    return { create_chamados }
}