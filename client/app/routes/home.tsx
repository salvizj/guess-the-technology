import { Link } from "react-router"
import type { Route } from "./+types/home"
import { Button } from "../components/base/Button"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ]
}

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20 text-center">
      <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
        Test Your Knowledge
      </h1>
      <p className="mt-4 ">
        Challenge yourself with thousands of interactive quizzes across various
        topics.
      </p>
      <div className="mt-8 flex justify-center gap-4">
        <Button>
          <Link to="/quizzes">Explore Quizzes</Link>{" "}
        </Button>
      </div>
    </div>
  )
}
