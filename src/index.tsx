import React, { useState, forwardRef, useImperativeHandle, useRef, useEffect, useCallback } from 'react';
import type {Props} from './index.d';
import {Alert} from 'antd';

const Meditor: React.FC<Props> = forwardRef((props, ref) => {
  const [minder, setMinder] = useState<any>(undefined);
  const [editor, setEditor] = useState(true);
  const {meditorPath='/meditor/index.html', style={width: '100%', height: '100%', minHeight: 900, minWidth: '100%'}, onChange=undefined, onLoad=undefined, readonly=false, imageUpload=undefined, initValue=undefined, headers=undefined} = props;
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
  const onMessage = useCallback((e: any) => {
    let xminder = minderRef.current?.contentWindow?.minder;
    if (!xminder && e && e?.type === 'message' && e?.data === 'ready' && e?.origin === window.location.origin){
      xminder = e?.source?.minder;
    }
    if(xminder) {
      setMinder(xminder);
      setEditor(true);
      if(initValue) xminder?.importJson?.(initValue);
      if(readonly) xminder?.fire('readonly');
      if(onChange) xminder?.on('contentchange', onChange);
    }else{
      setMinder(undefined);
      setEditor(false);
    }
  }, [initValue, readonly, onChange]);
  useEffect(() => {
    window.addEventListener('message', onMessage);
    return () => {
      window.removeEventListener('message', onMessage);
    }
  }, [onMessage]);
  return (
    !editor ? 
    <div style={{textAlign: 'center', marginTop: 10}}>
      <Alert type='error' style={{marginBottom: 10}} message='初始化编辑器失败, 请尽量使用Chrome浏览器并检查 meditorPath 配置是否正确!' /> 
      <a onClick={()=>{window.location.reload()}}>刷新</a>
    </div>: 
    <iframe 
      title="Meditor"
      id="meditorFrame"
      src={meditorPath}
      style={{border: 0, ...style}}
      ref={minderRef}
      data-upload={imageUpload}
      data-headers={headers}
      onLoad={onLoad}
    />
  );
})

export default Meditor;
