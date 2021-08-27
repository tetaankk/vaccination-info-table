import { COLUMNS } from "./columns";
import { useTable } from "react-table";
import { FunctionComponent, useEffect, useState, useMemo } from "react";
import vaccinationServices from "../../services/vaccinationServices";
import { IInfotableRow } from "../../Interfaces";
import "./table.scss";

const Table = (props) => {
  const [infotable, setInfotable] = useState([]);

  useEffect(() => {
    const dateString = props.date.toISOString().slice(0, 10).replace(/-/g, "");

    vaccinationServices.getInfoTable(dateString).then((response) => {
      setInfotable(response.data);
    });
  }, [props.date]);

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => infotable, [infotable]);

  const tableInstance = useTable({
    columns,
    data,
  });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps}>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
