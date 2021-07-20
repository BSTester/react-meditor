import React, { useState, forwardRef, useImperativeHandle } from 'react';
import {Alert} from 'antd';

const Meditor = forwardRef((props, ref) => {
  const [minder, setMinder] = useState(undefined);
  const [editor, setEditor] = useState(true);
  const {meditorPath='/meditor', width='100%', height=900, imageUpload=undefined, initValue=undefined} = props;
  useImperativeHandle(ref, ()=>{
    return {
      minder: minder,
    }
  }, [minder]);
  const onLoad = () => {
    const minder = window.document.getElementById('meditorFrame')?.contentWindow?.minder;
    if(minder) {
      setMinder(minder);
      setEditor(true);
      if(initValue) minder.importJson(initValue);
    }else{
      setMinder(undefined);
      setEditor(false);
    }
  };
  return (
    <div style={{height: height, width: width}}>
      {!editor ? 
        <Alert type='error' style={{textAlign: 'center'}} message='初始化编辑器失败, 请检查 meditorPath 配置是否正确!' /> : 
      <iframe 
        title="Meditor"
        id="meditorFrame"
        src={`${meditorPath}/index.html`}
        width="100%"
        height="100%"
        style={{border: 0}}
        image-upload={imageUpload}
        onLoad={onLoad}
      />}
    </div>
  );
})

export default Meditor;
