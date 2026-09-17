import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes"

export default [
  layout("routes/layouts/MainLayout.tsx", [
    index("routes/home.tsx"),
    route("login", "routes/auth/login.tsx"),
    route("register", "routes/auth/register.tsx"),

    layout("routes/layouts/ProtectedRoute.tsx", [
      route("profile", "routes/profile.tsx"),

      route("quizzes", "routes/quizzes/quizzes.tsx"),
      route("quizzes/:id", "routes/quizzes/preview.tsx"),

      route("play/:id", "routes/quiz/play.tsx"),
      route("results/:id", "routes/quiz/results/overall.tsx"),
      route("results/:id/questions", "routes/quiz/results/questions.tsx"),

      layout("routes/layouts/AdminLayout.tsx", [
        route("admin", "routes/admin/dashboard.tsx"),
        route("admin/quizzes", "routes/admin/quizzes/quizzes.tsx"),
        route("admin/quizzes/create", "routes/admin/quizzes/create-quiz.tsx"),
        route("admin/quizzes/:id/edit", "routes/admin/quizzes/edit-quiz.tsx"),
        route("admin/users", "routes/admin/users.tsx"),
      ]),
    ]),
  ]),
] satisfies RouteConfig
