import { ActionArgs, json, LoaderArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getStoredNotes } from "~/data/notes";
import styles from '~/styles/notes-details.css'
import { DataProps } from "~/utils/types";


export default function NoteDetailsPage() {
    const note = useLoaderData()
    return (
        <main id="note-details">
            <header>
                <nav>
                    <Link to="/notes">Back to all Notes</Link>
                </nav>
                <h1>{note.title}</h1>
            </header>
            <p id="note-details-content">{note.content}</p>
        </main>
    )
}
export function meta({ data }: any) {
    return {
        title: data.title,
        description: 'Manage your Notes with ease'
    }
}
export async function loader({ params }: LoaderArgs) {
    const notes: DataProps[] = await getStoredNotes();
    const noteId = params.noteId;
    const selectedData = notes.find(note => note.id === noteId)
    if (!selectedData) {
        throw json({ message: 'Could not find note for id' + noteId }, { status: 404 })
    }
    return selectedData
}
export function links() {
    return [
        {
            rel: 'stylesheet',
            href: styles
        }
    ]
}
