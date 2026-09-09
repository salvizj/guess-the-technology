import type { Route } from "./+types/profile"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ]
}

export const Profile = () => {
  return <>Profile</>
}
