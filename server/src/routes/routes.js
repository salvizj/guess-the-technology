import express from "express"
import authController from "../controllers/authController.js"
import quizController from "../controllers/quizController.js"
import { requireAuth } from "../middleware/requireAuth.js"
import { requireAdmin } from "../middleware/requireAdmin.js"

const router = express.Router()

//auth routes
router.post("/auth/register", authController.postRegister)
router.post("/auth/login", authController.postLogin)
router.post("/auth/logout", requireAuth, authController.postLogout)
router.get("/auth/verify", requireAuth, (req, res) => {
  return res.status(200).json({
    isValid: true,
    userId: req.userId,
    isAdmin: req.isAdmin,
  })
})

//public quiz routes
router.get("/quizzes", quizController.getQuizzes)
router.get("/quiz/:id", quizController.getQuizById)

//authenticated quiz routes
router.post("/quiz/:id/score", requireAuth, quizController.postCreateScore)
router.get("/quiz/:id/scores", requireAuth, quizController.getScoresByQuizId)
router.get("/user/:id/scores", requireAuth, quizController.getScoresByUserId)
router.get("/score/:id", requireAuth, quizController.getScoreByScoreId)

//admin-protected quiz routes
router.post("/quiz", requireAuth, requireAdmin, quizController.postCreateQuiz)
router.put(
  "/quizzes/:id",
  requireAuth,
  requireAdmin,
  quizController.putUpdateQuiz,
)
router.delete(
  "/quizzes/:id",
  requireAuth,
  requireAdmin,
  quizController.deleteQuiz,
)
export default router
