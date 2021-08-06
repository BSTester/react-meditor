import React, { useState, forwardRef, useImperativeHandle, useRef } from 'react';
import type {Props} from './index.d';
import {Alert} from 'antd';

const Meditor: React.FC<Props> = forwardRef((props, ref) => {
  const [minder, setMinder] = useState<any>(undefined);
  const [editor, setEditor] = useState(true);
  const {meditorPath='/meditor/index.html', style={width: '100%', height: '100%', minHeight: 900, minWidth: '100%'}, onChange=undefined, readonly=false, imageUpload=undefined, initValue=undefined, headers=undefined} = props;
  const minderRef = useRef<any>(null);
  useImperativeHandle(ref, ()=>{
    return {
      minder: minder,
      importData: (a: any, b: any, c: any) => minder?.importData?.(a,b,c),
      importJson: (a: any) => minder?.importJson?.(a),
      exportData: (a: any, b: any) => minder?.exportData?.(a,b),
      exportJson: () => minder?.exportJson?.(),
    }
  }, [minder]);
  const onLoad = () => {
    const minder = minderRef.current?.contentWindow?.minder;
    if(minder) {
      setMinder(minder);
      setEditor(true);
      if(initValue) minder?.importJson?.(initValue);
      if(readonly) minder?.fire('readonly');
      if(onChange) minder?.on('contentchange', onChange);
    }else{
      setMinder(undefined);
      setEditor(false);
    }
  };
  return (
    !editor ? 
    <div style={{textAlign: 'center', marginTop: 10}}>
      <Alert type='error' style={{marginBottom: 10}} message='初始化编辑器失败, 请检查 meditorPath 配置是否正确!' /> 
      <a onClick={()=>{window.location.reload()}}>刷新</a>
    </div>: 
    <iframe 
      title="Meditor"
      id="meditorFrame"
      src={meditorPath}
      style={{border: 0, ...style}}
      onLoad={onLoad}
      ref={minderRef}
      data-upload={imageUpload}
      data-headers={headers}
    />
  );
})

export default Meditor;
