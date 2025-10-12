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
    res.status(500).json({ message: "Server error" });
  }
};
export const postTodo = async (req, res) => {
  try {
    const { text } = req.body;
    await Todo.create({ text });
    res.status(200).json({ message: "Todo created" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};
export const getOneTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    if (!todo) res.status(404).json({ message: "No todo found" });
    res.status(200).json(todo);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};
