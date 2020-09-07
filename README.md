# style-rem-loader
一个可以将vue标签内样式px转换rem的 webpack loader


### install

```npm
npm install style-rem-loader --save-dev
```

### Use

vue-cli3

```javascript
{
  chainWebpack: (config) => {
      config.module
      .rule('vue')
      .test(/\.vue$/)
      .use('style-rem-loader')
        .loader('style-rem-loader')
    }
}
```

vue-cli2 

```text
{
    test: /\.(vue|jsx?)$/,
    loader: 'style-rem-loader',
    options: {
       
    }
}
```

### Example

```html
from

<h3 style="font-size: 28px;margin-top: 10px" width="500px">Test</h3>
```

To

```html
<h3 width="13.33333" style="font-size: 0.75666rem; margin-top: 0.26666;">Test</h3>
```

### option
默认配置
```javascript
defaultsProp = {
  unitToConvert: 'px',
  viewportWidth: 375,
  unitPrecision: 5,
  viewportUnit: 'rem',
  fontViewportUnit: 'rem',
  minPixelValue: 1
}
```

### 参与

只支持vue模板的转换，react模板未提供支持。如果你也有转换style的需求、欢迎参与完善该项目。