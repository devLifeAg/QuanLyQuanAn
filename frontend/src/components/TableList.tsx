import { Link } from "react-router-dom";

const TableList = ({ tables }) => {
  return (
    <Link to="/order" >
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 p-4">
        {tables.map((table) => (
          <div
            key={table.id}
            className="p-4 bg-white rounded-lg shadow-md text-center"
          >
            <p className="text-lg font-semibold">Bàn {table.id}</p>
            <p
              className={`text-sm ${table.status === "available" ? "text-green-500" : "text-red-500"
                }`}
            >
              {table.status === "available" ? "Trống" : "Có khách"}
            </p>
          </div>
        ))}
      </div>
    </Link>

  );
};

export default TableList;
