import fs from 'fs/promises'

export async function getStoredNotes() {
    let rawContent
    try {
        rawContent = await fs.readFile('notes.json', { encoding: 'utf-8' })
    } catch (err) {
        await fs.appendFile('notes.json', '{ "notes": [] }')
    } finally {
        rawContent = await fs.readFile('notes.json', { encoding: 'utf-8' })
}
    
    const data = JSON.parse(rawContent);
    const storedNotes = data.notes ?? [];
    return storedNotes;
}
export function storeNotes(notes: JSON) {
    return fs.writeFile('notes.json', JSON.stringify(
        {
            notes: notes || []
        }
    )
    )
}