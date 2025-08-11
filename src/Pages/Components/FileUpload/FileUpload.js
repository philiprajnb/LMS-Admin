import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import XLSX from 'xlsx';
import { SheetJSFT } from './types';
function FileUpload(props) {
  const [xlsData, setxlsData] = useState({})
  const [fileName, setFileName] = useState('');
  const onDrop = useCallback(acceptedFiles => {
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;

    reader.onload = e => {
      /* Parse data */
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, {
        type: rABS ? "binary" : "array",
        bookVBA: true
      });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_json(ws);
      
        setxlsData((data))
    };
   
    setFileName(acceptedFiles[0].name)
    if (rABS) {
      reader.readAsBinaryString(acceptedFiles[0]);
    } else {
      reader.readAsArrayBuffer(acceptedFiles[0]);
    }
    
  }, []);

  const {
    getRootProps,
    getInputProps,
  } = useDropzone({
    onDrop,
    accept: SheetJSFT
  });
  const {parsedData} = props;
  useEffect(() =>  {
    parsedData(xlsData)
  },[xlsData, parsedData]);
  
  return (
    <div {...getRootProps()}   >
      <input {...getInputProps()}  />
      <button className={`btn btn-outline-purple rounded `} ><i className="fa fa-file-upload"></i> Upload File</button>
      <p>{fileName}</p>
    </div>
  )
}

export default FileUpload;