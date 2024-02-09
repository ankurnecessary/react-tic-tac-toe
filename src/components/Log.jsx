export default function Log({ turns }) {
  return (
    <ol id="log">
      {turns.map((val) => {
        const {
          square: { row, col },
          player,
        } = val;
        return (
          <li key={`${row}_${col}`}>
            {player} selected {row},{col}
          </li>
        );
      })}
    </ol>
  );
}
