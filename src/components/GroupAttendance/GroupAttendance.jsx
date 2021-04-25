import React, { useEffect, useState } from "react";
import BTable from "react-bootstrap/Table";
import { useTable } from "react-table";
import "./GroupAttendance.scss";

const GroupAttendance = ({ data, attendanceState }) => {
  const { probs: problemList } = data.group_attendance;
  const [, updateState] = useState(false);

  const tableData = React.useMemo(
    () =>
      data.member.map((member, idx) => ({
        ID: attendanceState ? member : "데이터를 불러오는 중입니다.",
        1000: attendanceState
          ? attendanceState[member]?.includes("1000")
            ? "✅"
            : "❌"
          : "데이터를 불러오는 중입니다.",
        1001: attendanceState
          ? attendanceState[member]?.includes("1001")
            ? "✅"
            : "❌"
          : "데이터를 불러오는 중입니다.",
        1002: attendanceState
          ? attendanceState[member]?.includes("1002")
            ? "✅"
            : "❌"
          : "데이터를 불러오는 중입니다.",
        1003: attendanceState
          ? attendanceState[member]?.includes("1003")
            ? "✅"
            : "❌"
          : "데이터를 불러오는 중입니다.",
      })),
    [attendanceState]
  );

  const columns = React.useMemo(
    () => [
      { Header: "유저 아이디", accessor: "ID" },
      ...problemList.map((el, idx) => ({
        Header: el,
        accessor: el,
      })),
    ],
    []
  );

  const tableInstance = useTable({ columns, data: tableData });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  return (
    <div className="group-attendance__container">
      <div className="group-attendance__text">
        {`${new Date().getMonth() + 1}월 ${new Date().getDate()}일 - 출석부`}
      </div>
      <div className="group-attendance__table">
        <BTable {...getTableProps()}>
          <thead>
            {
              // Loop over the header rows
              headerGroups.map((headerGroup) => (
                // Apply the header row props
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {
                    // Loop over the headers in each row
                    headerGroup.headers.map((column) => (
                      // Apply the header cell props
                      <th {...column.getHeaderProps()}>
                        {
                          // Render the header
                          column.render("Header")
                        }
                      </th>
                    ))
                  }
                </tr>
              ))
            }
          </thead>
          {/* Apply the table body props */}
          <tbody {...getTableBodyProps()}>
            {
              // Loop over the table rows
              rows.map((row) => {
                // Prepare the row for display
                prepareRow(row);
                return (
                  // Apply the row props
                  <tr {...row.getRowProps()}>
                    {
                      // Loop over the rows cells
                      row.cells.map((cell) => {
                        // Apply the cell props
                        return (
                          <td {...cell.getCellProps()}>
                            {
                              // Render the cell contents
                              cell.render("Cell")
                            }
                          </td>
                        );
                      })
                    }
                  </tr>
                );
              })
            }
          </tbody>
        </BTable>
      </div>
    </div>
  );
};

export default GroupAttendance;
