"use client";
import React from "react";
import { DefaultValues, useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "../form";

import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../button";

import AutoFormObject from "./fields/object";
import { FieldConfig } from "./types";
import {
  ZodObjectOrWrapped,
  getDefaultValues,
  getObjectFormSchema,
} from "./utils";

export function AutoFormSubmit({ children }: { children?: React.ReactNode }) {
  return <Button type="submit">{children ?? "Submit"}</Button>;
}

function AutoForm<SchemaType extends ZodObjectOrWrapped>({
  formSchema,
  values: valuesProp,
  onValuesChange: onValuesChangeProp,
  onParsedValuesChange,
  onSubmit: onSubmitProp,
  fieldConfig,
  children,
  className,
  action,
  parsedAction: parsedActionProp,
}: {
  formSchema: SchemaType;
  values?: Partial<z.infer<SchemaType>>;
  onValuesChange?: (values: Partial<z.infer<SchemaType>>) => void;
  onParsedValuesChange?: (values: Partial<z.infer<SchemaType>>) => void;
  onSubmit?: (values: z.infer<SchemaType>) => void;
  fieldConfig?: FieldConfig<z.infer<SchemaType>>;
  children?: React.ReactNode;
  className?: string;
  parsedAction?: (values: z.infer<SchemaType>) => void;
  action?: ((formData: FormData) => void) | undefined;
}) {
  const objectFormSchema = getObjectFormSchema(formSchema);
  const defaultValues: DefaultValues<z.infer<typeof objectFormSchema>> =
    getDefaultValues(objectFormSchema);

  const form = useForm<z.infer<typeof objectFormSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
    values: valuesProp,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const parsedValues = formSchema.safeParse(values);
    if (parsedValues.success) {
      onSubmitProp?.(parsedValues.data);
    }
  }
  function onParsedAction(values: z.infer<typeof formSchema>) {
    const parsedValues = formSchema.safeParse(values);
    if (parsedValues.success) {
      parsedActionProp?.(parsedValues.data);
    }
  }

  return (
    <Form {...form}>
      <form
        action={(e) => {
          form.handleSubmit(onParsedAction)();
          action && action(e);
        }}
        onSubmit={(e) => {
          onSubmitProp && form.handleSubmit(onSubmit)();
        }}
        onChange={() => {
          const values = form.getValues();
          onValuesChangeProp?.(values);
          const parsedValues = formSchema.safeParse(values);
          if (parsedValues.success) {
            onParsedValuesChange?.(parsedValues.data);
          }
        }}
        className={cn("space-y-5", className)}
      >
        <AutoFormObject
          schema={objectFormSchema}
          form={form}
          fieldConfig={fieldConfig}
        />

        {children}
      </form>
    </Form>
  );
}

export default AutoForm;
