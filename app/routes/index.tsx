import { Link } from "@remix-run/react";
import indexStyles from '~/styles/home.css'
export default function Index() {
  return (
    <main id="content">
      <h1>A better way of keeping track of notes</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi eius assumenda blanditiis doloremque earum sed iste distinctio ipsum magnam deleniti tempore reprehenderit atque nesciunt quisquam sint veniam illo, accusantium, eos culpa qui? Amet fugit, sint dolor id expedita delectus obcaecati, nulla harum minus hic animi officia odit ad dignissimos sunt.</p>
      <p id="cta">
        <Link to="/notes" >Try Now!</Link>
      </p>
    </main>
  );
}
export function links() {
  return [
    {
      rel: 'stylesheet',
      href: indexStyles
    }
  ]
}