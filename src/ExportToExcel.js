import React from 'react';
import * as XLSX from 'xlsx';
import { Button, Tooltip } from '@mui/material';


const ExportToExcel = ({ data }) => {
    const handleExport = () => {
        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const fileExtension = '.xlsx';

        const ws = XLSX.utils.json_to_sheet(data);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: fileType });
        const fileName = 'ExcelData' + fileExtension;

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.click();

        window.URL.revokeObjectURL(url);
    };

    return (
        <Tooltip title="Export data to Excel">
            <Button onClick={handleExport}>
                <img src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/excel.svg" alt="img" />
            </Button>
        </Tooltip>

    );
};

export default ExportToExcel;
