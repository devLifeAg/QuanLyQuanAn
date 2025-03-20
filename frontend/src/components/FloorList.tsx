const FloorList = ({ floors }) => {
  return (
    <div className="w-full overflow-x-auto">
      <div className="flex space-x-4 p-4 min-w-max">
        {floors.map((floor) => (
          <button
            key={floor.id}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg whitespace-nowrap hover:bg-blue-600"
          >
            {floor.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FloorList;
