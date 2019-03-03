# Decorator

React中使用装饰器

### 定义装饰器
```es6
// parameter为装饰器参数，WrappedComponent为被装饰的类
const myDecorator = (parameter) => (WrappedComponent) => {
   return class extends React.Component {
      componentDidMount() {
        // do something
      }

      newProps = () {
        // 注入新的参数
      };

      render() {
        return <WrappedComponent {...this.props} newProps={this.newProps} />
      }
   }
}
```

### 使用装饰器
```es6
import myDecorator from ./myDecorator

@myDecorator('test')
class Profile extends React.Component {
    //....
}
```