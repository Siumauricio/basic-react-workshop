import { useState } from "react";

export const App = () => {
  const [task, setTask] = useState("");
  const [items, setItems] = useState([]);

  const addItem = () => {
    if (task === "") {
      alert("Ingrese una tarea");
    } else {
      const itemExists = items.find((item) => item.task === task);
      if (itemExists) {
        alert("La tarea ya existe");
        return;
      }
      setItems([
        ...items,
        {
          task: task,
          completed: false,
        },
      ]);
      setTask("");
    }
  };

  const onChange = (e) => {
    setTask(e.target.value);
  };

  const clearAll = () => {
    setItems([]);
  };

  const deleteCompleted = () => {
    setItems(items.filter((item) => item.completed === false));
  };

  const markCompleted = (e, item) => {
    const newItems = items.map((currentItem) => {
      if (item.task === currentItem.task) {
        return {
          task: currentItem.task,
          completed: e.target.checked,
        };
      } else {
        return currentItem;
      }
    });

    setItems([...newItems]);
  };

  return (
    <div className="pt-20 flex flex-col gap-4 max-w-lg mx-auto">
      <h1 className="text-center text-2xl font-semibold">To-do List</h1>
      <div className="gap-4 pt-6 flex place-items-center">
        <input
          className="input"
          placeholder="Ingrese su tarea"
          value={task}
          onChange={onChange}
        />
        <button className="btn btn-primary" onClick={addItem}>
          Añadir
        </button>
      </div>
      {items.map((item) => (
        <div className="flex gap-4" key={item.task}>
          <label className="flex gap-4 items-center">
            <input
              type="checkbox"
              className="checkbox"
              onChange={(e) => markCompleted(e, item)}
            />
            <p className={item.completed ? "line-through" : ""}>{item.task}</p>
          </label>
        </div>
      ))}

      <div className="flex gap-4">
        <button className="btn btn-error" onClick={clearAll}>
          Limpiar Todos
        </button>
        <button className="btn btn-outline-secondary" onClick={deleteCompleted}>
          Eliminar Completados
        </button>
      </div>
    </div>
  );
};
