import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Assuming you've defined a method to find the current email document's ID
// This is a pseudo-code placeholder for the actual logic you would implement
async function findCurrentEmailDocumentId(ctx) {
    const todos = await ctx.db.query('todos').collect();
    // Assuming there's only one todo item, or you have a way to identify which todo item is the email
    return todos.length > 0 ? todos[0]._id : null;
  }
  
  export const upsertEmail = mutation({
    args: {
      text: v.string(),
    },
    handler: async (ctx, args) => {
      const currentEmailId = await findCurrentEmailDocumentId(ctx);
      if (currentEmailId) {
        // If an email exists, update it
        await ctx.db.patch(currentEmailId, { text: args.text });
      } else {
        // No email exists, insert a new one
        await ctx.db.insert('todos', { text: args.text });
      }
      return "Email updated successfully";
    },
  });
  
export const getTodos=query({
    handler:async(ctx)=>{
        return ctx.db.query("todos").collect()
    },
})

