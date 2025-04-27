import * as XLSX from 'xlsx';

// 定义行数据的类型
interface ExcelRow {
    [key: string]: string; // 允许任意列名
}

export async function readExcelColumn(filePath: string, sheetName: string, columnName: string): Promise<string[]> {
    try {
        // 从 public 目录获取文件
        const response = await fetch(filePath);
        const arrayBuffer = await response.arrayBuffer();

        // 解析 Excel 文件
        const workbook = XLSX.read(arrayBuffer);
        const worksheet = workbook.Sheets[sheetName || workbook.SheetNames[0]];

        // 转换为 JSON
        const jsonData = XLSX.utils.sheet_to_json<ExcelRow>(worksheet);

        // 提取指定列
        return jsonData.map(row => row[columnName]);
    } catch (error) {
        console.error('读取 Excel 文件出错:', error);
        return [];
    }
}