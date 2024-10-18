"use client";

import { FC } from "react";
import { createCategory, updateCategory } from "@/actions";
import categorySchema from "@/actions/categories/category.schema";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Category } from "@/interfaces";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type Props = {
  category?: Category;
};

const CategoryForm: FC<Props> = ({ category }) => {

  const router = useRouter();

  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),

    defaultValues: {
      name: category?.name ?? "",
      permalink: category?.permalink ?? "",
      description: category?.description ?? "",
    },
  });

  const onSubmit = async (values: z.infer<typeof categorySchema>) => {
    const formData = new FormData();

    formData.append('name', values.name);
    formData.append('permalink', values.permalink);
    formData.append('description', values.description);

    let response: any;

    if (!category) {
      response = await createCategory(formData);
    }

    if (category && category.id) {
      response = await updateCategory(category.id, formData);
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

    form.reset();
    router.replace('/admin/categories');
  };

  const onClose = () => {
    router.replace('/admin/categories');
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-6"
      >
        <div className="flex flex-col gap-y-4 w-full lg:w-1/2 lg:mx-auto">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="mb-4 md:mb-0">
                <FormLabel>Name</FormLabel>
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
          <div className="text-left md:text-right">
            <Button
              type="button"
              variant="primary"
              className="w-full md:w-fit mr-4"
              onClick={onClose}
            >
              close
            </Button>
            <Button type="submit" variant="success" className="w-full md:w-fit">
              { category ? 'save' : 'create' }
            </Button>
          </div>
        </div>

      </form>
    </Form>
  );
};

export default CategoryForm;
