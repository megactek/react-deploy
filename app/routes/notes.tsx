import { ActionArgs, json, redirect } from "@remix-run/node";
import { Link, useActionData, useCatch, useLoaderData } from "@remix-run/react";
import NewNote, { links as newNoteLinks } from "~/components/NewNote"
import NoteList, { links as NoteListLinks } from "~/components/NoteList";
import { getStoredNotes, storeNotes } from "~/data/notes";

export default function NotesPage() {
    const notes = useLoaderData();
    const data = useActionData();
    return (
        <main>
            <NewNote />
            <NoteList notes={notes} />
        </main>
    )
}
export async function loader() {
    const notes = await getStoredNotes();
    if (!notes || notes.length === 0) {
        throw json({ message: 'could not find any note' }, {
            status: 404,
            statusText: 'Not Found'
        })
    }
    return notes;
}
export async function action({ request }: ActionArgs) {

    const formData = await request.formData();
    const noteData = Object.fromEntries(formData);

    if (String(noteData.title).trim().length < 5) {
        return {
            message: "invalid title - must be at least 5 character long."
        }
    }
    const storedNotes = await getStoredNotes();
    noteData.id = new Date().toISOString();
    const updatedNotes = storedNotes.concat(noteData)
    await storeNotes(updatedNotes);
    // await new Promise((resolve, _) => setTimeout(() => resolve(true), 2000))
    return redirect('/notes')

}
export function CatchBoundary() {
    const catchResponse = useCatch()
    const message = catchResponse.data?.message || 'Data not Found'
    return (
        <main>
            <NewNote />
            <p className="info-message">
                {message}
            </p>
        </main>
    )
}
export function links() {
    return [...newNoteLinks(), ...NoteListLinks()]
}
export function ErrorBoundary({ error }: { error: { message: string } }) {
    return (
        <main className="error">
            <h1>A notes error occurred</h1>
            <p>{error.message}</p>
            <p>Back to <Link to="/notes ">safety</Link></p>
        </main>
    )
}