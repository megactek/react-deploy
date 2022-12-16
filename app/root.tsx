import type { MetaFunction } from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from "@remix-run/react";
import styles from '~/styles/main.css'
import MainNavigation from '~/components/MainNavigation'
export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <header>
          <MainNavigation />
        </header>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function ErrorBoundary({ error }: { error: { message: string } }) {
  return (
    <html lang="en">
      <head>
        <title>An error occurred!</title>
        <Meta />
        <Links />
      </head>
      <body>
        <header>
          <MainNavigation />
        </header>
        <main className="error">
          <h1>An error occurred!</h1>
          <p>{error.message}</p>
          <p>Back to <Link to="/">safety</Link></p>
        </main>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
export function CatchBoundary() {
  const catchResponse = useCatch()
  return (
    <html lang="en">
      <head>
        <title>{catchResponse.statusText}</title>
        <Meta />
        <Links />
      </head>
      <body>
        <header>
          <MainNavigation />
        </header>
        <main className="error">
          <h1>{catchResponse.statusText}</h1>
          <p>{catchResponse.data?.message || 'Something went wrong!'}</p>
          <p>Back to <Link to="/">safety</Link></p>
        </main>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
export function links() {
  return [
    {
      rel: 'stylesheet',
      href: styles
    }
  ]
}
