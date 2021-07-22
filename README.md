## Kityminder for react

参考 react-neditor 实现，用法类似。

### 安装
`tyarn add react-minder-editor`

### 使用

将 `meditor` 拷贝到项目的静态资源目录 通过 `域名/meditor` 可访问。

```ts
import Meditor from 'react-minder-editor';
const minderRef = useRef<any>();

<Meditor meditorPath='/meditor' ref={minderRef} />

```

> 通过 `minderRef.current.importJson` 导入`json`格式数据
> 
> 通过 `minderRef.current.exportJson` 导出`json`格式数据
> 
> 通过 `minderRef.current.minder` 操作`minder`对象