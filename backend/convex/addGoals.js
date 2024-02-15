// Backend/convex/addGoal.js
export default async function addGoal(db, goal) {
    // Assuming 'goals' is a collection in your Convex database
    await db.insert('goals', goal);
    return { success: true, message: "Goal added successfully!" };
  }