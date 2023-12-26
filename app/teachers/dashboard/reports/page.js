"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation.js";

import { DataGrid } from "@mui/x-data-grid";

import { useNodePostApi } from "@/hooks/useNodeApi.js";

function createData(id, student_id, name, _class, report, score) {
  return { id, student_id, name, _class, report, score };
}

export default function BasicTable() {
  const router = useRouter();

  const [ccsoList, setCcsoList] = useState([]);
  const [cslrList, setCslrList] = useState([]);
  const [rrList, setRrList] = useState([]);
  const [slList, setSlList] = useState([]);

  const [mixDatas, setMixDatas] = useState([]);

  const [rows, setRows] = useState([]);

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
        console.log("Ccso", Ccso);
        console.log("Cslr", Cslr);
        console.log("Rr", Rr);
        console.log("Sl", Sl);
        // if (dbRivers.statusText != "OK") {
        //   throw new Error("Failed to fetch data");
        // }
      } catch (err) {
        console.log("err", err);
      }
    }
    findRecords();
  }, []);

  useEffect(() => {
    const _mixArray = [...ccsoList, ...cslrList, ...rrList, ...slList];
    console.log("sss", _mixArray);
    const dataReducer = _mixArray.reduce((acc, curr) => {
      const { _id, student_id, student_name, reportName, score } = curr;
      const _class = curr.class;
      const returnDatas = {
        _id,
        student_id,
        student_name,
        _class,
        reportName,
        score,
      };

      acc.push(returnDatas);

      return acc;
    }, []);

    console.log("dataReducer", dataReducer);

    setMixDatas([...dataReducer]);
  }, [ccsoList, cslrList, rrList, slList]);

  useEffect(() => {
    const _row = mixDatas.map((d) =>
      createData(
        d._id,
        d.student_id,
        d.student_name,
        d._class,
        d.reportName,
        d.score
      )
    );
    setRows([..._row]);
  }, [mixDatas]);

  const columns = [
    // { field: "id", headerName: "ID", width: 150 },
    { field: "student_id", headerName: "學號", width: 150 },
    { field: "name", headerName: "姓名", width: 150 },
    { field: "_class", headerName: "班級", width: 150 },
    {
      field: "report",
      headerName: "問卷名稱",
      width: 150,
    },
    {
      field: "score",
      headerName: "分數",
      sortable: false,
      width: 150,
    },
  ];

  return (
    <main className="flex flex-col h-[100%] justify-between items-center py-8 overflow-x-hidden">
      <div className="flex flex-col text-4xl text-black text-center font-bold gap-8">
        <div className="gap-4">
          <p>112學年淡江大學</p>
          <p className="text-xl">校園與社區服務學習課程服務成果</p>
        </div>
        <div className="flex w-[100%] text-xl justify-start">
          <select className="w-[15%] p-2">
            <option>all</option>
            <option>ccso</option>
            <option>rr</option>
            <option>sl</option>
            <option>cslr</option>
          </select>
        </div>
        <div
          style={{
            height: 650,
            width: "100%",
            backgroundColor: "white",
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            sx={{ fontSize: "20px" }}
            pageSizeOptions={[5, 10, 20]}
            checkboxSelection
            onRowSelectionModelChange={(i) => console.log(i)}
          />
        </div>
      </div>
      <div className="flex text-4xl text-gray-800 font-bold gap-8 py-8">
        <button
          className="text-4xl font-bold border-[2px] border-gray-800 bg-white rounded p-2"
          onClick={() => router.push("/dashboard/newRiver")}
        >
          下載紀錄
        </button>
        <button
          className="text-4xl font-bold border-[2px] border-gray-800 bg-white rounded p-2"
          onClick={() => router.push("/dashboard/newRiver")}
        >
          開啟紀錄
        </button>
      </div>
    </main>
  );
}
