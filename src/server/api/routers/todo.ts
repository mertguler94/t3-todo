import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const todoRouter = createTRPCRouter({
  getAllTodos: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.todo.findMany();
  }),

  getTodo: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.todo.findFirst({
        where: {
          id: input.id,
        },
      });
    }),

  createTodo: publicProcedure
    .input(z.object({ content: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.todo.create({
        data: {
          content: input.content,
        },
      });
    }),

  updateTodo: publicProcedure
    .input(z.object({ id: z.string(), content: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.todo.update({
        where: {
          id: input.id,
        },
        data: {
          content: input.content,
        },
      });
    }),

  deleteTodo: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.todo.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
