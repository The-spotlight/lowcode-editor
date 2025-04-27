import { useEffect, useState } from 'react';
import { readExcelColumn } from '../../utils/readExcel';

export function EditArea() {
  const [columnData, setColumnData] = useState<string[]>([]);

  useEffect(() => {
    async function loadData() {
      // 假设你的 Excel 文件在 public/data.xlsx，读取 Sheet1 中的 "姓名" 列
      const data = await readExcelColumn('/public/邮件模板-423.xlsx', 'Sheet1', '内容');
      setColumnData(data);
    }
    loadData();
  }, []);

  return (
    <div style={{overflow: 'auto'}} className={'h-full'} >
      {/*<pre>{JSON.stringify(columnData, null, 2)}</pre>*/}
      {columnData.map((item, index) => (
        <>
          <h3>{index}</h3>
          <div className='mx-10 border-2 rounded' key={index} dangerouslySetInnerHTML={{__html: item}}></div>
        </>
      ))}
    </div>
  );
}