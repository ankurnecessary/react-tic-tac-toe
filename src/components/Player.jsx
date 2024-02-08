import { useState } from "react";

export default function Player({ initialName, symbol, isActive }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(initialName);

  function toggleEdit() {
    setIsEditing((editing) => !editing);
  }

  function changeName(event) {
    setName(event.target.value);
  }

  function onEnter(event) {
    if (event.code == "Enter") {
      setIsEditing((editing) => !editing);
      setName(event.target.value);
    }
  }

  return (
    <li className={isActive ? "active" : ""}>
      <span className="player">
        {!isEditing && <span className="player-name">{name}</span>}
        {isEditing && (
          <input
            type="text"
            value={name}
            required
            onChange={changeName}
            onKeyDown={onEnter}
          />
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={toggleEdit}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
