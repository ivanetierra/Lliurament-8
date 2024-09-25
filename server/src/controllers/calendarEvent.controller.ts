import { Request, Response } from "express";
import CalendarEvent from "../models/calendarEvent.model";

// Create a new event
export const createEvent = async (req: Request, res: Response) => {
  try {
    const { title, start, end } = req.body;
    const event = await CalendarEvent.create({ title, start, end });
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: "Failed to create event", error });
  }
};

// Get all events
export const getEvents = async (req: Request, res: Response) => {
  try {
    const events = await CalendarEvent.findAll();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch events", error });
  }
};

// Delete an event
export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await CalendarEvent.destroy({ where: { id } });
    res.status(200).json({ message: "Event deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete event", error });
  }
};
