import { Router } from "express";
import {
  createEvent,
  getEvents,
  deleteEvent,
} from "../controllers/calendarEvent.controller";

const router = Router();

router.post("/events", createEvent);
router.get("/events", getEvents);
router.delete("/events/:id", deleteEvent);

export default router;
