import React, { useState } from 'react';
import {Alert} from 'antd';

const Meditor = (props) => {
  const {meditorPath, width='100%', height=900, imageUpload=undefined, onSave=undefined, onExport=undefined, onImport=undefined, initValue={}} = props;
  const [err, setEerr] = useState(null);
  const onLoad = () => {
    const minder = window.document.getElementById('meditorFrame')?.contentWindow?.minder;
    if(!minder) setEerr('初始化编辑器失败, 请检查 meditorPath 配置是否正确!');
    else {
      setEerr(null);
      if(onSave) onSave(minder.exportJson());
      if(onExport) onExport(minder);
      if(onImport) onImport(minder);
      if(initValue) minder.importJson(initValue);
    }
  };
  return (
    <div style={{height: height, width: width}}>
      {!err ? <iframe 
        title="Meditor"
        id="meditorFrame"
        src={`${meditorPath}/index.html`}
        width="100%"
        height="100%"
        style={{border: 0}}
        image-upload={imageUpload}
        onLoad={onLoad}
      /> : <Alert type='error' message={err} />}
    </div>
  );
}

export default Meditor;
