"use client";

import { FC } from "react";
import { createArticle, updateArticle } from "@/actions";
import articleSchema from "@/actions/articles/article.schema";
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
import { Article, Category } from "@/interfaces";
import { cn } from "@/lib";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Editor } from "../../(components)";

type Props = {
  article?: Article;
  categories: Category[];
};

const ArticleForm: FC<Props> = ({ article, categories }) => {

  const router = useRouter();

  const form = useForm<z.infer<typeof articleSchema>>({
    resolver: zodResolver(articleSchema),

    defaultValues: {
      title: article?.title ?? "",
      slug: article?.slug ?? "",
      image: article?.image ?? "",
      categoryId: article?.category.id ?? "",
      author: article?.author ?? "",
      description: article?.description ?? "",
      content: article?.content ?? "",
      robots: article?.robots ?? "noindex, nofollow",
      publishedAt: article?.publishedAt ? new Date(article.publishedAt) : undefined,
      tags: article?.tags ? (article?.tags as string[]).join(', ') : "",
    },
  });

  const onSubmit = async (values: z.infer<typeof articleSchema>) => {
    const formData = new FormData();

    // TODO: Add image to the form data
    // const { image, ...articleToSave } = data;

    formData.append('title', values.title);
    formData.append('slug', values.slug);
    formData.append('image', values.image);
    formData.append('categoryId', values.categoryId);
    formData.append('author', values.author);
    formData.append('description', values.description);
    formData.append('content', values.content);
    formData.append('tags', values.tags);
    formData.append('robots', values.robots ?? "noindex, nofollow");

    if (values.publishedAt) {
      formData.append('publishedAt', values.publishedAt.toISOString());
    }

    let response: any;

    if (!article) {
      response = await createArticle(formData);
    }

    if (article && article.id) {
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
    }

    // Redirect to articles page if article is created
    // so if you are updating an article, you will stay on the same page. 
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

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem className="mb-4 md:mb-0">
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <Input autoComplete="off" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                        { categories.map((category) => (
                          <SelectItem
                            key={category.id}
                            value={ category.id! }
                          >{ category.name }</SelectItem>
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
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem className="mb-4 md:mb-0">
                <FormLabel>Author</FormLabel>
                <FormControl>
                  <Input autoComplete="off" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
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

        <div className="text-left md:text-right">
          <Button
            type="button"
            onClick={onClose}
            variant="primary"
            className="w-full md:w-fit mr-4 mb-4 md:mb-0"
          >
            Close
          </Button>
          <Button type="submit" variant="success" className="w-full md:w-fit">
            { article ? 'Save' : 'Create' }
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ArticleForm;