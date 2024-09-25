import { DataTypes } from "sequelize";
import db from "../db/connection.db";

const CalendarEvent = db.define(
  "calendar_event",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    start: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

export default CalendarEvent;
