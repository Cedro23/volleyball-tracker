// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Group = {
  id: string;
  userId: string;
  name: string;
  duration: string;
};

export type Type = {
  id: string;
  userId: string;
  name: string;
};

export type Focus = {
  id: string;
  userId: string;
  name: string;
};

export type Session = {
  id: string;
  date: Date;
  userId: string;
  groupId: string;
  typeId: string;
  focusId: string;
  energyLevel: number;
  serveQuality: number;
  firstTouch: number;
  settingQuality: number;
  gameFlow: number;
  attackingQuality: number;
  overallPerformance: number;
  winOfDay: string;
  needsWork: string;
  nextTimeFocus: string;
  notes: string;
};
