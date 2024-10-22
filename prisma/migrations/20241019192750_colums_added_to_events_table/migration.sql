-- AlterTable
ALTER TABLE "events" ADD COLUMN     "artist" TEXT DEFAULT 'not specified yet',
ADD COLUMN     "event_date" TIMESTAMP(3),
ADD COLUMN     "line_up" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "location" TEXT DEFAULT 'not specified yet',
ADD COLUMN     "ticket_url" TEXT;
