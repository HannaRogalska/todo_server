import Todo from "../models/Todo.js";

export const getTodos = async (req, res) => {
    try {
        const allTodos = await Todo.find();
        if (allTodos.length === 0) {
          return res.status(404).json({ message: "No todos found" });
        }
        res.status(200).json({ todos: allTodos });
    } catch (err) {
        console.log(err);
        
    }
    
}
export const postTodo = async (req, res) => {
    const { text } = req.body;
    await Todo.create({ text });
    res.status(200).json({ message: "Todo created" });
};
