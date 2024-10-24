"use server";

import { Event, Category, Robots } from "@/interfaces";
import { prisma } from "@/lib";

export type EventPublic = {
  id?: string;
  title: string;
  permalink: string;
  imageUrl: string;
  imagePublicId: string;
  description: string;
  ticketUrl: string;
  artist: string;
  lineUp: string;
  content: string;
  location: string;
  category: Category;
  tags: string[];
  eventDate: Date;
  active: boolean;
  author: { name: string };
  robots: Robots;
  createdAt?: Date;
  updatedAt?: Date;
};

type ResponseFetchEventsPublic = {
  ok: boolean;
  events: EventPublic[];
  message: string;
};

export type EventsForList = {
  id: string;
  title: string;
  permalink: string;
  eventDate: Date;
  artist: string,
  imageUrl: string;
  active: boolean;
};

type ResponseFetchEvents = {
  ok: boolean;
  events: EventsForList[];
  message: string;
};

type ResponseFetchEvent = {
  ok: boolean;
  event: Event | null;
  message: string;
};

type Metadata = {
  title: string;
  description: string;
  robots: string;
  author: string;
};

type ResponseFetchEventMetadata = {
  ok: boolean;
  metadata: Metadata | null;
  message: string;
};

type PublicParams = {
  active?: boolean;
};

/**
 * Get all events with the option to filter by published status
 * 
 * @param params
 * active - filter by active status
 * 
 * @example ```ts
 * getEventPublic(); // get all published event without filtering.
 * getEventPublic({ isPublished: true }); // get all published event.
 * getEventPublic({ isPublished: false }); // get all unpublished event.
 * ```
 * @returns 
 */
export const getEventsPublic = async (params: PublicParams = {}):
  Promise<ResponseFetchEventsPublic> =>
{
  const { active: activeEvent = false } = params;

  try {
    const events = await prisma.event.findMany({
      where: { active: { equals: activeEvent }},
      select: {
        id: true,
        title: true,
        permalink: true,
        location: true,
        imageUrl: true,
        ticketUrl: true,
        category: true,
        description: true,
        eventDate: true,
        active: true,
        author: {
          select: {
            name: true,
          }
        },
      }
    }) as EventPublic[];

    return {
      ok: true,
      events,
      message: "Events fetched successfully 👍",
    };
  } catch(error) {
    console.error(error);
    return {
      ok: false,
      events: [],
      message: "Something went wrong !, check logs for details",
    };
  }
};

type AdminParams = {
  role?: 'admin' | 'author' | 'subscriber';
  authorId?: string;
};

export const getEvents = async (params: AdminParams = {})
:Promise<ResponseFetchEvents> =>
{
  const {
    role = 'subscriber',
    authorId,
  } = params;

  let whereClause = {};

  if (role === 'admin') {
    whereClause = {};
  } else if (role === 'author') {
    whereClause = { authorId };
  } else if (role === 'subscriber') {
    // No events will match this condition
    whereClause = { id: -1 };
  }

  try {
    const events = await prisma.event.findMany({
      where: whereClause,
      select: {
        id: true,
        title: true,
        permalink: true,
        active: true,
        eventDate: true,
        artist: true,
        imageUrl: true,
      },
      orderBy: {
        title: 'asc',
      },
    }) as EventsForList[];

    return {
      ok: true,
      events,
      message: "Events fetched successfully 👍",
    };
  } catch(error) {
    console.error(error);
    return {
      ok: false,
      events: [],
      message: "Something went wrong !, check logs for details",
    };
  }
};

export const getEventById = async (id: string): Promise<ResponseFetchEvent> => {
  try {
    const event = await prisma.event.findUnique({
      where: { id },
      include: {
        category: {
          select: {
            name: true,
            permalink: true,
          },
        },
        author: {
          select: {
            id: true,
            name: true,
          }
        },
      }
    }) as Event | null;
  
    if (!event) {
      return {
        ok: false,
        event: null,
        message: "Event not found with id: " + id,
      };
    }

    return {
      ok: true,
      event: null,
      message: "Event fetched successfully 👍",
    };
  } catch(error) {
    console.error(error);
    return {
      ok: false,
      event: null,
      message: "Something went wrong !, check logs for details",
    };
  }
};

export const getEventByPermalinkPublic = async (permalink: string)
: Promise<ResponseFetchEvent> => {

  try {
    const event = await prisma.event.findUnique({
      where: { permalink },
      select: {
        id: true,
        title: true,
        permalink: true,
        location: true,
        artist: true,
        lineUp: true,
        ticketUrl: true,
        imageUrl: true,
        description: true,
        content: true,
        tags: true,
        eventDate: true,
        active: true,
        robots: true,
        category: {
          select: {
            id: true,
            name: true,
            permalink: true,
          },
        },
        author: {
          select: {
            id: true,
            name: true,
          },
        },  
      },
    }) as Event | null;

    if (!event) {
      return {
        ok: false,
        event: null,
        message: "Event not found with permalink: " + permalink,
      };
    }

    return {
      ok: true,
      event: event,
      message: "Event fetched successfully 👍",
    };
  } catch(error) {
    console.error(error);
    return {
      ok: false,
      event: null,
      message: "Something went wrong !, check logs for details",
    };
  }
};

type EditParams = {
  permalink: string;  
  authorId: string;
  role: 'admin' | 'author' | 'subscriber';
};

export const getEventByPermalink = async (params: EditParams)
: Promise<ResponseFetchEvent> => {

  const { permalink, role, authorId } = params;

  let whereClause: {
    permalink: string;
    authorId?: string;
  } = { permalink: "" };

  if (role === 'admin') {
    whereClause = { permalink };
  } else if (role === 'author') {
    whereClause = { permalink, authorId };
  } else if (role === 'subscriber') {
    return {
      ok: false,
      event: null,
      message: "You are not authorized to edit this event",
    };
  }

  try {
    const event = await prisma.event.findUnique({
      where: whereClause,
      include: {
        category: {
          select: {
            id: true,
            name: true,
            permalink: true,
          },
        },
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      }
    }) as Event | null;

    if (!event) {
      return {
        ok: false,
        event: null,
        message: "Event not found with permalink: " + permalink,
      };
    }

    return {
      ok: true,
      event: event,
      message: "Event fetched successfully 👍",
    };
  } catch(error) {
    console.error(error);
    return {
      ok: false,
      event: null,
      message: "Something went wrong !, check logs for details",
    };
  }
};

export const getEventMetadataByPermalink = async (permalink: string): Promise<ResponseFetchEventMetadata> => {
  try {
    const metadata = await prisma.event.findUnique({
      where: { permalink },
      select: {
        title: true,
        description: true,
        robots: true,
        author: true,
      }
    }) as Metadata | null;
  
    if (!metadata) {
      return {
        ok: false,
        metadata: null,
        message: "Event not found with slug: " + permalink,
      };
    }

    return {
      ok: true,
      metadata,
      message: "Event fetched successfully 👍",
    };
  } catch(error) {
    console.error(error);
    return {
      ok: false,
      metadata: null,
      message: "Something went wrong !, check logs for details",
    };
  }
};

/**
 * Get permalinks of latest events.
 * 
 * @param quantity The number of permalinks to fetch.
 * 
 * @example ```typescript
 * getStaticEventsPermalinks(10); // latest 10.
 * ```
 * 
 * @returns The permalinks of the latest required events.
 */
export const getStaticEventsPermalinks = async (quantity: number): Promise<{
  ok: boolean;
  permalinks: string[];
  error?: string;
}> => {
  try {
    const events = await prisma.event.findMany({
      select: { permalink: true },
      take: quantity,
      orderBy: { createdAt: 'desc' }
    });

    return {
      ok: true,
      permalinks: events.map((event) => event.permalink),
    };
  } catch(error) {
    console.error(error);
    return {
      ok: false,
      permalinks: [],
      error: "Something went wrong !, check logs for details",
    };
  }
};