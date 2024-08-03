"use client";

import { FC, useEffect, useState } from "react";
import { createArticle, updateArticle } from "@/actions";
import articleCreateSchema from "@/actions/articles/article_create.schema";
import articleUpdateSchema from "@/actions/articles/article_update.schema";
import { TimePicker } from "@/components/time-picker";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
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
import { Article, Category, Author } from "@/interfaces";
import { cn } from "@/lib";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, CheckIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Editor } from "../../(components)";
import { useSession } from "next-auth/react";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import Spinner from "@/components/ui/spinner";

type Props = {
  categories: Category[];
  article?: Article;
  authors?: Author[];
};

type FormValues = z.infer<typeof articleCreateSchema> | z.infer<typeof articleUpdateSchema>;

const ArticleForm: FC<Props> = ({ article, categories, authors = [] }) => {

  const router = useRouter();

  const { data: session } = useSession({ required: true });
  const [authorOpen, setAuthorOpen] = useState(false);
  const [imageFieldMounted, setImageFieldMounted] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(article ? articleUpdateSchema : articleCreateSchema),

    defaultValues: {
      title: article?.title ?? "My new article",
      slug: article?.slug ?? "new-article",
      categoryId: article?.category.id ?? "0faf3fc3-7541-4598-9396-0a9fbe2ec15c",
      description: article?.description ?? "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      author: article?.author.id ?? "9b02d9c3-e1f0-4a33-ad30-223ecfd51e8d",
      content: article?.content ?? "Lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      robots: article?.robots ?? "noindex, nofollow",
      publishedAt: article?.publishedAt ? new Date(article.publishedAt) : undefined,
      tags: article?.tags ? article?.tags.join(', ') : "javascript, react, nextjs",
    },
  });

  useEffect(() => {
    setImageFieldMounted(true);
  }, []);

  const onSubmit = async (values: FormValues) => {
    const formData = new FormData();

    formData.append('title', values.title);
    formData.append('slug', values.slug);
    formData.append('categoryId', values.categoryId);
    formData.append('author', values.author);
    formData.append('description', values.description);
    formData.append('content', values.content);
    formData.append('tags', values.tags);
    formData.append('robots', values.robots ?? "noindex, nofollow");

    if (values.image) {
      console.log("Image was provided");
      console.log("IMAGE:", values.image);
      formData.append('image', values.image);
    }

    if (values.publishedAt) {
      formData.append('publishedAt', values.publishedAt.toISOString());
    }

    let response: any;

    if (!article) {
      response = await createArticle(formData);
    }

    if (article && article.id) {
      setImageFieldMounted(false);
      response = await updateArticle(article.id, formData);
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

    // Redirect to articles page if article is created
    if (!article) {
      form.reset();
      router.replace('/admin/articles');
    }
  };

  const onClose = () => {
    router.replace('/admin/articles');
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
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
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
                <FormLabel>Tags</FormLabel>
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
          <div className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="publishedAt"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Published Date</FormLabel>
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
          </div>
        </div>

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Editor content={field.value} onChange={field.onChange} />
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
                <span>{article ? 'Save' : 'Create'}</span>
              )
            }
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ArticleForm;