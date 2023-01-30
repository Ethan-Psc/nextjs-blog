---
title: 'Babel插件之组件按需引入'
date: '2022-03-01'
---
### 组件按需引入

**安装插件babel-plugin-component**，引入需要的组件，以达到降低项目体积。

#### **目的**

一般的组件引入的方式：import Button from "../UI/packages/button"

想要达成的引入方式：import {Button} from "../UI''

#### **措施**

> 前置知识babel-plugin-component插件
>
> babel-plugin-component通过修改引入代码对应的AST树来达到极简的引入组件的目的
>
> `import { Alert } from 'xui'`对应的`AST`树![image-20211202150933670.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/af713fef6e584fea9e468c2b5acee9da~tplv-k3u1fbpfcp-zoom-1.image)

1.首先在`babel.config.js`同级新增一个`babel-plugin-component.js`文件，作为我们插件文件，然后修改一下`babel.config.js`文件：

```
module.exports =
 {  *// ...*  
 plugins: ['./babel-plugin-component.js'] }
```

2.我们就是要修改babel.config.js使得`import { Alert } from 'xui'`对应的AST树转化成`import {Alert from 'xui/packages/alert'`对应的AST树。

通过观察`import { Alert } from 'xui'`代码对应的AST树，我们发现整体是一个`importDeclaration`，通过`source.value`判断导入的来源，`specifiers`数组可以找到导入的变量，每个变量是一个`ImportSpecifier`。根据这些信息，我们只需要修改`source.value`导入的来源，并修改`specifiers.imported.name`导入的组件名，就可以实现极简地引入组件。

3.目标明确后，得到代码

```
// babel-plugin-component.js
module.exports = ({
                      types
                  }) => {
    return {
        //Babel采用递归的方式访问所有的AST结点
        visitor: {
            //每个AST结点都有对应的节点类型，如Identifier（标识符），FunctionDeclaration（函数声明）
            //一旦访问到相同类型的结点触发事件。通过path可以代表该结点的属性与该结点的相邻结点
            //state代表插件的状态
            ImportDeclaration(path) {
                const {
                    node
                } = path
                // path是类型为ImportDeclaration的AST结点
                const {
                    value
                } = node.source  // node.source是导入的来源
​
                if (value === '../UI') {
                    // 找出引入的组件名称列表
                    let specifiersList = []
                    // specifiers数组里可以找到导入的变量，每个变量是一个ImportSpecifier
                    node.specifiers.forEach(spec => {
                        if (types.isImportSpecifier(spec)) {
                            if(spec.imported.name.toLowerCase()==='ui'){
                                return types.importDeclaration([
                                    types.importDefaultSpecifier(types.identifier(spec.imported.name))
                                ], types.stringLiteral('../UI'))    //stringLiteral字符串字面量，@babel/types负责babel转换的步骤，对结点进行增删改
                            }
                            specifiersList.push(spec.imported.name)
                            //spec.imported.name是组件导入的名称，spec.local.name作为组件的别名
                        }
                    })
                    // 给每个组件创建一条导入语句
                    const importDeclarationList = specifiersList.map((name) => {
                        // 文件夹的名称首字母为小写
                        let lowerCaseName = name.toLowerCase();
                        // 构造importDeclaration节点
                        return types.importDeclaration([
                            types.importDefaultSpecifier(types.identifier(name))
                        ], types.stringLiteral('../UI/packages/' + lowerCaseName))
                    })
                    // 用多节点替换单节点
                    path.replaceWithMultiple(importDeclarationList)
                }
            }
        },
    }
}
​
```

在自己的项目中，需要改动`if (value === 'xui'`)和`types.stringLiteral('xui/packages/' + lowerCaseName))`两段代码。改成自己项目的组件路径即可。

### babel的处理步骤

主要有三个阶段：解析（parse）， 转换 （transform），生成（generate）。

-   ##### parse

将源码转成 AST，用到@babel/parser模块。

-   ##### transform

对AST 进行遍历，在此过程中对节点进行添加、更新及移除等操作。因此这是bebel处理代码的核心步骤，是我们的讨论重点，主要使用@babel/traverse和@babel/types模块。

-   ##### generate

打印 AST 成目标代码并生成 sourcemap，用到@babel/generate模块。

[浅谈前端AST的概念与实际应用 - 掘金 (juejin.cn)](https://juejin.cn/post/7006919355686453279#heading-3)


