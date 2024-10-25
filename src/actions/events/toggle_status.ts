"use server";

import { prisma } from "@/lib";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const schema = z.object({
  active: z.boolean().optional(),
});

export const updateActiveEvent = async (id: string, status: boolean) => {

  const schemaParsed = schema.safeParse({ active: status });

  if (!schemaParsed.success) {
    console.log(schemaParsed.error.errors[0].message);

    return {
      ok: false,
      message: "Failed to update event status ❌,\ncheck logs for more details.",
    };
  }

  try {
    const prismaTransaction = await prisma.$transaction(async (transaction) => {
      const updatedEvent = await transaction.event.update({
        where: { id },
        data: {
          active: schemaParsed.data.active,
        },
      });

      return {
        ok: true,
        message: 'Event status updated successfully 👍',
        permalink: updatedEvent.permalink,
      };
    });

    // Revalidate Paths
    revalidatePath('/');
    revalidatePath(`/${prismaTransaction.permalink}`);
    revalidatePath('/admin/events');
    revalidatePath('/admin/dashboard');
    revalidatePath(`/admin/events/${prismaTransaction.permalink}`);

    return prismaTransaction;
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: 'Error updating an event ❌.',
    };
  }

};

export default updateActiveEvent;
