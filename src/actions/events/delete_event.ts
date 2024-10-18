"use server";

import { auth } from "@/auth.config";
import { prisma } from "@/lib";
import deleteImage from "@/utils/delete-image";
import { revalidatePath } from "next/cache";

const deleteEvent = async ( eventId: string ) => {
  
  const session = await auth();

  const authorId = session?.user.id!;
  const authorRole = session?.user.role!;

  let whereClause: {
    id: string;
    authorId?: string;
  } = { id: "" };

  if (authorRole === 'admin') {
    whereClause = { id: eventId };
  } else if (authorRole === 'author') {
    whereClause = { id: eventId, authorId };
  } else if (authorRole === 'subscriber') {
    return {
      ok: false,
      article: null,
      message: "You are not authorized to delete this event",
    };
  }

  try {
    const eventDeleted = await prisma.event.delete({
      where: whereClause,
    });

    // Delete image from cloudinary.
    // await deleteImage(articleDeleted.imagePublicId);

    if (!eventDeleted) {
      return {
        ok: false,
        message: `Event not found with id: ${eventId}`,
      };
    }

    // Revalidate Paths
    revalidatePath('/');
    revalidatePath('/admin/events');

    return {
      ok: true,
      message: "Event deleted successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: `Unable to delete event, check the logs for more information`,
    };
  }
};

export default deleteEvent;
