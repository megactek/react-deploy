import { Link } from '@remix-run/react'
import styles from '~/styles/notelist.css'
import { DataProps } from '~/utils/types'

const NoteList = ({ notes }: { notes: DataProps[] }) => {
    return (
        <ul id="note-list">
            {
                notes?.map((note, index) => (
                    <li key={Number(note.id)} className="note">
                        <Link to={String(note.id)}>
                            <article>
                                <header>
                                    <ul className="note-meta">
                                        <li>#{index + 1}</li>
                                        <li>
                                            <time dateTime={String(note.id)}>
                                                {new Date(String(note.id)).toLocaleDateString('en-US', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                })}
                                            </time>
                                        </li>
                                    </ul>
                                    <h2>{String(note.title)}</h2>
                                </header>
                                <p>{String(note.content)}</p>
                            </article>
                        </Link>
                    </li>
                ))
            }
        </ul>
    )
}
export default NoteList
export function links() {
    return [
        {
            rel: 'stylesheet',
            href: styles
        }
    ]
}