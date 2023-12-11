"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation.js";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(id, name, date, course) {
  return { id, name, date, course };
}

const rows = [
  createData("1234567", "施水水", "2023.11.29", "庄子後溪"),
  createData("1234567", "施水水", "2023.11.29", "庄子後溪"),
  createData("1234567", "施水水", "2023.11.29", "庄子後溪"),
  createData("1234567", "施水水", "2023.11.29", "庄子後溪"),
  createData("1234567", "施水水", "2023.11.29", "庄子後溪"),
  createData("1234567", "施水水", "2023.11.29", "庄子後溪"),
];

import { useNodePostApi } from "@/hooks/useNodeApi.js";

export default function Page() {
  const router = useRouter();

  const [ccsoList, setCcsoList] = useState([]);
  const [cslrList, setCslrList] = useState([]);
  const [rrList, setRrList] = useState([]);
  const [slList, setSlList] = useState([]);
  useEffect(() => {
    async function findRecords() {
      try {
        const dbCcso = await useNodePostApi("/api/record/findCcso");
        const dbCslr = await useNodePostApi("/api/record/findCslr");
        const dbRr = await useNodePostApi("/api/record/findRr");
        const dbSl = await useNodePostApi("/api/record/findSl");
        const Ccso = dbCcso.data.data;
        const Cslr = dbCslr.data.data;
        const Rr = dbRr.data.data;
        const Sl = dbSl.data.data;
        // setRiverList([...rivers]);
        setCcsoList([...Ccso]);
        setCslrList([...Cslr]);
        setRrList([...Rr]);
        setSlList([...Sl]);
        // console.log("Ccso", Ccso);
        // console.log("Cslr", Cslr);
        // console.log("Rr", Rr);
        // console.log("Sl", Sl);
        // if (dbRivers.statusText != "OK") {
        //   throw new Error("Failed to fetch data");
        // }
      } catch (err) {
        console.log("err", err);
      }
    }
    findRecords();
  }, []);

  return (
    <main className="flex flex-col h-[100%] justify-between items-center py-8 overflow-x-hidden">
      <div className="flex flex-col text-4xl text-black text-center font-bold gap-8">
        <div className="gap-4">
          <p>112學年淡江大學</p>
          <p className="text-xl">校園與社區服務學習課程服務成果</p>
        </div>
        {/* <div className="flex flex-col justify-start items-start gap-4">
          <p className="text-xl">CCso</p>
          {ccsoList.map((record, rIdx) => (
            <div key={rIdx} className="flex text-base gap-2 items-center">
              <p>{rIdx + 1}.</p>
              <div
                className="flex w-max max-w-screen text-base text-gray-800 border-[2px] border-black bg-white rounded p-2 gap-4"
                onClick={() =>
                  router.push(`/dashboard/editRiver/${record._id.toString()}`)
                }
              >
                <p>{record.student_id}</p>
                <p>{record.student_name}</p>
                <p>{record.date}</p>
              </div>
            </div>
          ))}
          <p className="text-xl">Cslr</p>
          {cslrList.map((record, rIdx) => (
            <div key={rIdx} className="flex text-base gap-2 items-center">
              <p>{rIdx + 1}.</p>
              <div
                className="flex w-max text-base text-gray-800 border-[2px] border-black bg-white rounded p-2 gap-4"
                onClick={() =>
                  router.push(`/dashboard/editRiver/${record._id.toString()}`)
                }
              >
                <p>{record.student_id}</p>
                <p>{record.student_name}</p>
                <p>{record.date}</p>
              </div>
            </div>
          ))}
          <p className="text-xl">Rr</p>
          {rrList.map((record, rIdx) => (
            <div key={rIdx} className="flex text-base gap-2 items-center">
              <p>{rIdx + 1}.</p>
              <div
                className="flex w-max text-base text-gray-800 border-[2px] border-black bg-white rounded p-2 gap-4"
                onClick={() =>
                  router.push(`/dashboard/editRiver/${record._id.toString()}`)
                }
              >
                <p>{record.student_id}</p>
                <p>{record.student_name}</p>
                <p>{record.date}</p>
              </div>
            </div>
          ))}
          <p className="text-xl">Sl</p>
          {slList.map((record, rIdx) => (
            <div key={rIdx} className="flex text-base gap-2 items-center">
              <p>{rIdx + 1}.</p>
              <div
                className="flex w-max text-base text-gray-800 border-[2px] border-black bg-white rounded p-2 gap-4"
                onClick={() =>
                  router.push(`/dashboard/editRiver/${record._id.toString()}`)
                }
              >
                <p>{record.student_id}</p>
                <p>{record.student_name}</p>
                <p>{record.date}</p>
              </div>
            </div>
          ))}
        </div> */}
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 350, background: "white" }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell align="left">學號</TableCell>
                <TableCell align="left">姓名</TableCell>
                <TableCell align="left">日期</TableCell>
                <TableCell align="left">課程</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, rIdx) => (
                <TableRow
                  key={rIdx}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{row.id}</TableCell>
                  <TableCell align="left">{row.name}</TableCell>
                  <TableCell align="left">{row.date}</TableCell>
                  <TableCell align="left">{row.course}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className="flex flex-col text-4xl text-gray-800 font-bold gap-8 py-8">
        <button
          className="text-4xl font-bold border-[2px] border-gray-800 bg-white rounded p-2"
          onClick={() => router.push("/dashboard/newRiver")}
        >
          下載紀錄
        </button>
      </div>
    </main>
  );
}
