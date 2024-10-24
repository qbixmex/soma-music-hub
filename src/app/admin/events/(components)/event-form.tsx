"use client";

import { FC, useEffect, useState } from "react";
import { createEvent, updateEvent } from "@/actions";
import eventCreateSchema from "@/actions/events/event_create.schema";
import eventUpdateSchema from "@/actions/events/event_update.schema";
import { TimePicker } from "@/components/time-picker";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Event, Category, Author } from "@/interfaces";
import { cn } from "@/lib";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, CheckIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useSession } from "next-auth/react";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import Spinner from "@/components/ui/spinner";
import { Editor } from "@/components/content"
import { Switch } from "@/components/ui/switch";

type Props = {
  categories: Category[];
  event?: Event;
  authors?: Author[];
};

type FormValues = z.infer<typeof eventCreateSchema> | z.infer<typeof eventUpdateSchema>;

const EventForm: FC<Props> = ({ event, categories, authors = [] }) => {

  const router = useRouter();

  const { data: session } = useSession({ required: true });
  const [authorOpen, setAuthorOpen] = useState(false);
  const [imageFieldMounted, setImageFieldMounted] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(event ? eventUpdateSchema : eventCreateSchema),

    defaultValues: {
      title: event?.title ?? "",
      permalink: event?.permalink ?? "",
      categoryId: event?.category.id ?? "",
      artist: event?.artist ?? "Artist",
      lineUp: event?.lineUp ? event?.lineUp.join(', ') : "",
      ticketUrl: event?.ticketUrl ?? "",
      location: event?.location ?? "",
      description: event?.description ?? "",
      author: event?.author.id ?? "",
      content: event?.content ?? "",
      robots: event?.robots ?? "noindex, nofollow",
      eventDate: event?.eventDate ? new Date(event.eventDate) : undefined,
      active: event?.active ?? false,
      tags: event?.tags ? event?.tags.join(', ') : "",
    },
  });

  useEffect(() => {
    setImageFieldMounted(true);
  }, []);

  const onSubmit = async (values: FormValues) => {
    const formData = new FormData();

    formData.append('title', values.title);
    formData.append('permalink', values.permalink);
    formData.append('categoryId', values.categoryId);
    formData.append("artist", values.artist);
    formData.append("lineUp", values.lineUp);
    formData.append("ticketUrl", values.ticketUrl);
    formData.append("location", values.location);
    formData.append('author', values.author);
    formData.append('description', values.description);
    formData.append('content', values.content);
    formData.append('tags', values.tags);
    formData.append('robots', values.robots ?? "noindex, nofollow");
    formData.append('active', values.active?.toString() ?? "false");

    if (values.image) {
      console.log("Image was provided");
      console.log("IMAGE:", values.image);
      formData.append('image', values.image);
    }

    if (values.eventDate) {
      formData.append('eventDate', values.eventDate.toISOString());
    }

    let response: any;

    if (!event) {
      response = await createEvent(formData);
    }

    if (event && event.id) {
      setImageFieldMounted(false);
      response = await updateEvent(event.id, formData);
    }

    if (!response.ok) {
      toast.error(response.message, {
        duration: 3000,
        position: "top-right",
        className: "bg-red-500 text-white",
      });
    }

    if (response.ok) {
      toast.success(response.message, {
        duration: 3000,
        position: "top-right",
        className: "bg-green-500 text-white",
      });
      setImageFieldMounted(true);
    }

    // Redirect to events page if event is created
    if (!event) {
      form.reset();
      router.replace('/admin/events');
    }
  };

  const onClose = () => {
    router.replace('/admin/events');
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-6"
      >
        <div className="block md:grid md:grid-cols-2 md:gap-x-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="mb-4 md:mb-0">
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input autoComplete="off" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="permalink"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Permalink</FormLabel>
                <FormControl>
                  <Input autoComplete="off" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="block md:grid md:grid-cols-2 md:gap-x-4">

          {imageFieldMounted ? (
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem className="mb-4 md:mb-0">
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        field.onChange(file);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : (
            <div className="w-full flex flex-col gap-y-2">
              <div className="w-24 h-5 bg-slate-500 rounded animate-pulse" />
              <div className="w-full h-8 bg-slate-500 rounded animate-pulse" />
            </div>
          )}

          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select an a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {categories.map((category) => (
                          <SelectItem
                            key={category.id}
                            value={category.id!}
                          >{category.name}</SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="block md:grid md:grid-cols-2 md:gap-x-4">
          {session?.user.role === 'admin' && authors.length > 0 && (
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Author</FormLabel>
                  <Popover open={authorOpen} onOpenChange={setAuthorOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[200px] justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? authors.find((author) => author.id === field.value)?.name
                            : "select an author"
                          }
                          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search author ..."
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>No author found.</CommandEmpty>
                          <CommandGroup>
                            {authors.map((author) => (
                              <CommandItem
                                key={author.id}
                                value={author.name}
                                onSelect={() => {
                                  form.setValue("author", author.id);
                                  setAuthorOpen(false);
                                }}
                                disabled={author.id === field.value}
                              >
                                {author.name}
                                <CheckIcon
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    author.id === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem className="mb-4 md:mb-0">
                <FormLabel>Tags <span className="text-sm text-gray-400/80 italic">(separate tags by commas)</span></FormLabel>
                <FormControl>
                  <Input {...field} autoComplete="off" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="block md:grid md:grid-cols-2 md:gap-x-4">
          <FormField
            control={form.control}
            name="artist"
            render={({ field }) => (
              <FormItem className="mb-4 md:mb-0">
                <FormLabel>Artist</FormLabel>
                <FormControl>
                  <Input autoComplete="off" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lineUp"
            render={({ field }) => (
              <FormItem className="mb-4 md:mb-0">
                <FormLabel>Line Up <span className="text-sm text-gray-400/80 italic">(separate by commas)</span></FormLabel>
                <FormControl>
                  <Input {...field} autoComplete="off" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="block md:grid md:grid-cols-2 md:gap-x-4">
          <FormField
            control={form.control}
            name="ticketUrl"
            render={({ field }) => (
              <FormItem className="mb-4 md:mb-0">
                <FormLabel>Ticket URL</FormLabel>
                <FormControl>
                  <Input autoComplete="off" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="mb-4 md:mb-0">
                <FormLabel>Event Location</FormLabel>
                <FormControl>
                  <Input autoComplete="off" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="block md:grid md:grid-cols-2 md:gap-x-4">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="mb-4 md:mb-0">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} rows={5} className="resize-none" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="eventDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Event Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP HH:mm:ss")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        className="rounded-md border mb-4"
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                      <div className="p-3 border-t border-border">
                        <TimePicker
                          setDate={field.onChange}
                          date={field.value}
                        />
                      </div>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="robots"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Robots</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="index, follow">Index, Follow</SelectItem>
                          <SelectItem value="noindex, follow">No Index, Follow</SelectItem>
                          <SelectItem value="index, nofollow">Index, No Follow</SelectItem>
                          <SelectItem value="noindex, nofollow">No Index, No Follow</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="active"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Active</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Editor
                  defaultContent={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4 items-center md:justify-end">
          <Button
            type="button"
            onClick={onClose}
            variant="primary"
            className="w-full md:w-fit"
            disabled={form.formState.isSubmitting}
          >
            Close
          </Button>
          <Button
            type="submit"
            variant="success"
            className="w-full md:w-fit"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <span className="flex items-center gap-2">
                <Spinner />
                <span className="animate-pulse">wait ...</span>
              </span>
            ) : (
              <span>{event ? 'Save' : 'Create'}</span>
            )
            }
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EventForm;