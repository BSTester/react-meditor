import React, { useState, forwardRef, useImperativeHandle, useRef } from 'react';
import type {Props} from './Meditor.d';
import {Alert} from 'antd';

const Meditor: React.FC<Props> = forwardRef((props, ref) => {
  const [minder, setMinder] = useState<any>(undefined);
  const [editor, setEditor] = useState(true);
  const {meditorPath='/meditor', width='100%', height=900, imageUpload=undefined, initValue=undefined} = props;
  const minderRef = useRef<any>(null);
  useImperativeHandle(ref, ()=>{
    return {
      minder: minder,
      importData: (a: any, b: any, c: any) => minder.importData(a,b,c),
      importJson: (a: any) => minder.importJson(a),
      exportData: (a: any, b: any) => minder.exportData(a,b),
      exportJson: () => minder.exportJson(),
    }
  }, [minder]);
  const onLoad = () => {
    const minder = minderRef.current?.contentWindow?.minder;
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
        ref={minderRef}
      />}
    </div>
  );
})

export default Meditor;
