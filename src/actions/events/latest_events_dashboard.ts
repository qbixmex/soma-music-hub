"use server";

import { prisma } from "@/lib";

export type DashboardEvent = {
  id: string;
  title: string;
  permalink: string;
  category: {
    name: string;
    permalink: string;
  };
};

type ResponseEvents = {
  ok: boolean;
  events: DashboardEvent[] | null;
  message: string;
};

export const getPublishedDashboardEvents = async (quantity = 5): Promise<ResponseEvents> => {
  try {
    const events = await prisma.event.findMany({
      take: quantity,
      where: { active: { equals: true } },
      orderBy: { createdAt: "desc" },
      include: {
        category: {
          select: { name: true, permalink: true },
        },
      }
    });

    const latestEvents: DashboardEvent[] = events.map((event) => ({
      id: event.id,
      title: event.title,
      permalink: event.permalink,
      category: {
        name: event.category.name,
        permalink: event.category.permalink,
      },
    }));

    return {
      ok: true,
      events: latestEvents,
      message: "Latest published events fetched successfully 👍",
    };
  } catch (error) {
    console.log(`${error}`);
    return {
      ok: false,
      events: null,
      message: "Something went wrong !, check logs for details",
    };
  }
};

export const getDraftDashboardEvents = async (quantity = 5): Promise<ResponseEvents> => {
  try {
    const events = await prisma.event.findMany({
      take: quantity,
      where: { active: { equals: false } },
      orderBy: { createdAt: "desc" },
      include: {
        category: {
          select: { name: true, permalink: true },
        },
      }
    });

    const latestEvents: DashboardEvent[] = events.map((event) => ({
      id: event.id,
      title: event.title,
      permalink: event.permalink,
      category: {
        name: event.category.name,
        permalink: event.category.permalink,
      },
    }));

    return {
      ok: true,
      events: latestEvents,
      message: "Latest unpublished events fetched successfully 👍",
    };
  } catch (error) {
    console.log(`${error}`);
    return {
      ok: false,
      events: null,
      message: "Something went wrong !, check logs for details",
    };
  }
};