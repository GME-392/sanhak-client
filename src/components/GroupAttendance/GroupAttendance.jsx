import React from "react";
import BTable from "react-bootstrap/Table";
import { useTable } from "react-table";
import "./GroupAttendance.scss";

const GroupAttendance = ({ data }) => {
  const { probs: problemList } = data.group_attendance;
  console.log(problemList);
  console.log(data);

  const tableData = data.member.map((member) => ({
    ID: member,
    1000: "hello",
    1001: "hello",
    1002: "hello",
    1003: "hello",
  }));

  const columns = [
    { Header: "유저 아이디", accessor: "ID" },
    ...problemList.map((el, idx) => ({
      Header: el,
      accessor: el,
    })),
  ];

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
