"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation.js";

import Drawer from "@mui/material/Drawer";
import { DataGrid } from "@mui/x-data-grid";

import { useNodePostApi, useNodeGetApi } from "@/hooks/useNodeApi.js";

function createData(id, student_id, name, _class, report, river, photo, score) {
  return { id, student_id, name, _class, report, river, photo, score };
}

export default function BasicTable() {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [selectedList, setSelectedList] = useState("服務成果表");

  const [ccsoList, setCcsoList] = useState([]);
  const [ccsoPrintList, setCcsoPrintList] = useState([]);
  const [cslrList, setCslrList] = useState([]);
  const [cslrPrintList, setCslrPrintList] = useState([]);
  const [rrList, setRrList] = useState([]);
  const [rrPrintList, setRrPrintList] = useState([]);
  const [slList, setSlList] = useState([]);
  const [slPrintList, setSlPrintList] = useState([]);

  const [mixDatas, setMixDatas] = useState([]);
  const [originalDatas, setOriginalDatas] = useState([]);

  const [rows, setRows] = useState([]);

  const [selectionModel, setSelectionModel] = useState([]);

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
      } catch (err) {
        console.log("err", err);
      }
    }
    findRecords();
  }, []);

  useEffect(() => {
    const _mixArray = [...ccsoList, ...cslrList, ...rrList, ...slList];
    setOriginalDatas([..._mixArray]);
    console.log("sss", _mixArray);
    const dataReducer = _mixArray.reduce((acc, curr) => {
      const {
        _id,
        student_id,
        student_name,
        reportName,
        river_id,
        picsUrl,
        score,
      } = curr;
      const _class = curr.class;
      const returnDatas = {
        _id,
        student_id,
        student_name,
        _class,
        reportName,
        river_id,
        picsUrl,
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
        d.river_id,
        d.picsUrl ? d.picsUrl.length : 0,
        d.score
      )
    );
    console.log("row", _row);

    const rowReducer = _row.reduce((acc, curr) => {
      const currList = curr.report;
      if (currList == selectedList) acc.push(curr);

      return acc;
    }, []);

    setRows([...rowReducer]);
  }, [mixDatas, selectedList]);

  useEffect(() => {
    const result = selectionModel.map((id) =>
      originalDatas.find((data) => data._id == id)
    );
    console.log("result", result);

    switch (selectedList) {
      case "服務成果表":
        setCcsoPrintList([...result]);
        break;
      case "反思討論紀錄表":
        setRrPrintList([...result]);
        break;
      case "服務日誌":
        setSlPrintList([...result]);
        break;
      case "學習歷程反思單":
        setCslrPrintList([...result]);
        break;
    }
  }, [selectionModel, selectedList]);

  const handleRowSelectionModelChange = (newSelectionModel) => {
    setSelectionModel(newSelectionModel);
    // 可以在這裡進行進一步的處理，比如將選擇的行的數據傳遞給其他組件
  };

  async function testDownload() {
    try {
      const test = await useNodeGetApi("/download-csv");
    } catch (err) {
      console.log("err", err);
    }
  }

  function downloadCSV() {
    const csvBaseTitle = ["學號,姓名,系班級,課程地點,課程日期,"];
    //服務成果表
    const ccsoTitle =
      "任課教官,執行成果重點說明,成果照片相關說明,照片張數,學生心得";
    //反思紀錄表
    const rrTitle = "授課老師,紀錄,參與人員,討論主題與內容";
    //服務日誌
    const slTitle =
      "服務時數,被服務人數,服務機構,資料呈現方式,服務內容與學習要點,服務反思,心得隨寫";
    //學習歷程反思單
    const cslrTitle =
      "學年,學期,在本次社區服務中，你印象最深刻的畫面是什麼？為什麼？,對你而言，這次的社區服務有什麼意義？在本次社區服務後，你願不願意參與更多的志工服務？,請用一句話來形容本學期參與社區服務的感覺，為什麼是這句話？,在本次社區服務裡，你覺得感到最具挑戰性的地方是什麼？為什麼？,在這個社區服務中，你對自己有什麼新的認識？,在這次社區服務中，你覺得我們有沒有什麼可以更努力的地方？";

    // // 將數據轉換為 CSV 格式的字符串
    // const csvRows = [
    //   "id,姓名,age", // CSV 標題
    //   // 數據行
    //   ...data.map((item) => [item.id, item.name, item.age].join(",")),
    // ];

    let _csvRows = [];

    console.log("selectedList", selectedList);

    let _datas;
    switch (selectedList) {
      case "服務成果表":
        _datas = ccsoPrintList.length ? [...ccsoPrintList] : [...ccsoList];
        _csvRows = [
          csvBaseTitle + ccsoTitle,
          ..._datas.map((item) =>
            [
              item.student_id,
              item.student_name,
              item.class,
              item.river_id,
              item.date,
              item.teacher_id,
              item.execution_results,
              item.picDesc,
              item.picsUrl.length,
              item.studentInsights,
            ].join(",")
          ),
        ];
        break;
      case "反思討論紀錄表":
        _datas = rrPrintList.length ? [...rrPrintList] : [...rrList];
        _csvRows = [
          csvBaseTitle + rrTitle,
          ...rrList.map((item) =>
            [
              item.student_id,
              item.student_name,
              item.class,
              item.river_id,
              item.date,
              item.host,
              item.recorder,
              item.participants,
              item.discussionTopicAndContent,
            ].join(",")
          ),
        ];
        break;
      case "服務日誌":
        _datas = slPrintList.length ? [...slPrintList] : [...slList];
        _csvRows = [
          csvBaseTitle + slTitle,
          ...slList.map((item) =>
            [
              item.student_id,
              item.student_name,
              item.class,
              item.river_id,
              item.date,
              item.service_hours,
              item.service_number,
              item.service_org,
              item.dataPresentationMethod,
              item.serviceContentAndLearningPoints,
              item.serviceReflection,
              item.moodJournal,
            ].join(",")
          ),
        ];
        break;
      case "學習歷程反思單":
        _datas = cslrPrintList.length ? [...cslrPrintList] : [...cslrList];
        _csvRows = [
          csvBaseTitle + cslrTitle,
          ...cslrList.map((item) =>
            [
              item.student_id,
              item.student_name,
              item.class,
              item.river_id,
              item.date,
              item.academicYear,
              item.semester,
              item.q1,
              item.q2,
              item.q3,
              item.q4,
              item.q5,
              item.q6,
            ].join(",")
          ),
        ];
        break;
    }

    const csvString = _csvRows.join("\n");
    // 添加 UTF-8 BOM
    const BOM = "\uFEFF";
    const csvContent = BOM + csvString;

    // 創建 Blob
    const blob = new Blob([csvContent], { type: "text/csv" });

    // 創建一個指向 Blob 的 URL
    const url = URL.createObjectURL(blob);

    // 創建一個臨時的<a>元素以觸發下載
    const link = document.createElement("a");
    link.href = url;
    link.download = "data.csv";
    document.body.appendChild(link);
    link.click();

    // 清理
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  // // 示例數據
  // const data = [
  //   { id: 1, name: "Alice", age: 21 },
  //   { id: 2, name: "Bob", age: 22 },
  //   // ... 其他數據
  // ];

  const columns = [
    // { field: "id", headerName: "ID", width: 150 },
    { field: "student_id", headerName: "學號", width: 100 },
    { field: "name", headerName: "姓名", width: 100 },
    { field: "_class", headerName: "班級", width: 120 },
    {
      field: "river",
      headerName: "課程地點",
      width: 200,
    },
    {
      field: "report",
      headerName: "問卷名稱",
      width: 190,
    },
    {
      field: "photo",
      headerName: "照片",
      sortable: false,
      width: 100,
    },
    {
      field: "score",
      headerName: "分數",
      sortable: false,
      width: 100,
      hide: true,
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
          <select
            className="w-[20%] p-2"
            onChange={(e) => {
              setSelectedList(e.target.value);
            }}
          >
            <option>服務成果表</option>
            <option>反思討論紀錄表</option>
            <option>服務日誌</option>
            <option>學習歷程反思單</option>
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
                paginationModel: { page: 0, pageSize: 10 },
              },
              columns: {
                columnVisibilityModel: {
                  // Hide columns status and traderName, the other columns will remain visible
                  score: false,
                },
              },
            }}
            sx={{ width: 1000, fontSize: "20px" }}
            pageSizeOptions={[5, 10, 20]}
            checkboxSelection
            onRowSelectionModelChange={handleRowSelectionModelChange}
            rowSelectionModel={selectionModel}
          />
        </div>
      </div>
      <Drawer
        anchor={"bottom"}
        open={open}
        // sx={{ width: 500 }}
        onClose={() => setOpen(false)}
      >
        <div
          className="flex h-[30rem] overflow-auto p-4"
          onClick={() => setOpen(false)}
        >
          <div className="w-full h-auto">
            <div
              id="contents"
              className="flex flex-col flex-grow w-full text-xl justify-start items-center px-8 gap-2"
            >
              <div
                id="student_identity"
                className="flex flex-col text-base border-b-[1px] border-primary_500 w-full h-max "
              >
                <div className="flex justify-between">
                  <div className="flex flex-col text-xl gap-2">
                    <p>學號：</p>
                    <p>姓名：</p>
                    <p>日期：</p>
                    <p>課程地點：</p>
                  </div>
                </div>
              </div>
              <div
                id="main_content"
                className="flex flex-col w-full h-max mt-4 gap-4"
              >
                <div
                  id="resultDesc1"
                  className="flex flex-col w-full h-max gap-2"
                >
                  <p className="text-black font-bold">上傳照片</p>
                  <div className="flex flex-wrap">
                    {/* {selectedImage.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Preview ${index}`}
                        style={{ maxWidth: "95px", margin: "5px" }}
                      />
                    ))} */}
                    123
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Drawer>

      <div className="flex text-4xl text-gray-800 font-bold gap-8 py-8">
        <button
          className="text-4xl font-bold border-[2px] border-gray-800 bg-white rounded p-2"
          onClick={() => {
            downloadCSV();
          }}
        >
          下載紀錄
        </button>
        <button
          className="text-4xl font-bold border-[2px] border-gray-800 bg-white rounded p-2"
          onClick={() => {
            setOpen(!open);
          }}
        >
          開啟紀錄
        </button>
      </div>
    </main>
  );
}
