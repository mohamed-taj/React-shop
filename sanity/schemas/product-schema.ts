import { time } from "console"
import { type } from "os"
import { off, title } from "process"
import { defineField, defineType } from "sanity"

export const product = defineType({
  name: "product",
  title: "product",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
      },
    },
    {
      name: "images",
      title: "images",
      type: "array",
      of: [{ type: "image" }],
    },
    {
      name: "categories",
      title: "categories",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "sizes",
      title: "sizes",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "colors",
      title: "Colors",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "decription",
      title: "Decription",
      type: "string",
    },
    {
      name: "sku",
      title: "Sku",
      type: "string",
    },
    {
      name: "currency",
      title: "currency",
      type: "string",
    },
    {
      name: "price",
      title: "price",
      type: "number",
    },
  ],
})
