import React, { useEffect, useState } from "react";
import BTable from "react-bootstrap/Table";
import { useTable } from "react-table";
import "./GroupAttendance.scss";

const GroupAttendance = ({ data, attendanceState }) => {
  const { probs: problemList } = data.group_attendance;
  const [, updateState] = useState(false);

  const tableData = React.useMemo(
    () =>
      data.member.map((member, idx) => {
        let memberAttendance = {
          ID: attendanceState ? member : "데이터를 불러오는 중입니다.",
        };
        problemList.forEach((prob) => {
          memberAttendance = {
            ...memberAttendance,
            [prob.numb]: attendanceState
              ? attendanceState[member]?.includes(`${prob.numb}`)
                ? "✅"
                : "❌"
              : "데이터를 불러오는 중입니다.",
          };
        });
        return memberAttendance;
      }),
    [attendanceState]
  );

  console.log(tableData);

  const columns = React.useMemo(
    () => [
      { Header: "유저 아이디", accessor: "ID" },
      ...problemList.map((prob, idx) => ({
        Header: `${prob.numb} - ${prob.name}`,
        id: idx,
        accessor: prob.numb,
      })),
    ],
    []
  );

  const tableInstance = useTable({ columns, data: tableData });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

  return (
    <div className="group-attendance__container">
      <div className="group-attendance__text">
        {`${new Date().getMonth() + 1}월 ${new Date().getDate()}일 - 출석부`}
      </div>
      <div className="group-attendance__table">
        <BTable {...getTableProps()}>
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
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </BTable>
      </div>
    </div>
  );
};

export default GroupAttendance;
