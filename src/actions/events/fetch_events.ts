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
  content: string;
  category: Category;
  tags: string[];
  publishedAt: Date;
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
  category: {
    name: string;
    permalink: string;
  };
  author: {
    name: string;
  },
  publishedAt: Date;
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
  isPublished?: boolean;
};

/**
 * Get all events with the option to filter by published status
 * 
 * @param params
 * isPublished - filter by published status
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
  const { isPublished } = params;
  let whereClause = {};

  if (isPublished === true && isPublished !== undefined) {
    whereClause = { publishedAt: { not: null } };
  } else if (isPublished === false) {
    whereClause = { publishedAt: null };
  }

  try {
    const events = await prisma.event.findMany({
      where: whereClause,
      select: {
        id: true,
        title: true,
        permalink: true,
        imageUrl: true,
        category: true,
        description: true,
        publishedAt: true,
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
        publishedAt: true,
        category: {
          select: {
            name: true,
            permalink: true,
          }
        },
        author: {
          select: {
            name: true,
          }
        },
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
        imageUrl: true,
        description: true,
        content: true,
        tags: true,
        publishedAt: true,
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