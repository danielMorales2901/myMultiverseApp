import { supabase } from "@/lib/supabase";
import { Note } from "./note";

//dataSource.ts
export class DataSource {
    constructor() { }
    //crear metodo
    async getNotes(): Promise<Note[]> {
        //Desde supabase tomar todas las notas
        let { data: notas, error } = await supabase
            .from('notas')
            .select('*')
        //retornar las notas
        //y la fecha (date) convertir de string 
        //a Date
        return notas?.map((item) => ({
            ...item,
            date: new Date(item.date)
        })) || []
    }

    async saveNote(note: Note): Promise<Note | null> {
        //upsert : si ya existe se actualiza, si no existe, lo inserta
        const { data, error } = await supabase
            .from('notas')
            .upsert(note)
            .select();

        // si data tiene valor tomar el primer elemento
        // sino, retornar null
        if (data) {
            const saved = data[0];
            return {
                ...saved,
                date: new Date(saved.date)
            }
        }
        return null;
    }

    async deleteNote(id: number): Promise<boolean> {
        const { error } = await supabase
            .from('notas')
            .delete()
            .eq('id', id)
        return !error;
    }

}