import React, { useState } from 'react';
import {Alert} from 'antd';

const Meditor = (props) => {
  const [err, setEerr] = useState(null);
  const {meditorPath='/meditor', width='100%', height=900, imageUpload=undefined, getRef=undefined, initValue={}} = props;
  const onLoad = () => {
    const minder = window.document.getElementById('meditorFrame')?.contentWindow?.minder;
    if(!minder) setEerr('初始化编辑器失败, 请检查 meditorPath 配置是否正确!');
    else {
      setEerr(null);
      if(getRef) getRef(minder);
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
