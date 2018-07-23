# mxGraph
mxGraph是一个开源的JavaScript图表组件，使用svg和html渲染。

## demo

```javascript
import React, { Component } from 'react';
import {
  mxEditor,
  mxGraphHandler,
  mxOutline,
  mxEdgeHandler,
  mxParallelEdgeLayout,
  mxConstants,
  mxEdgeStyle,
  mxLayoutManager,
  mxCodec,
  mxClient,
  mxConnectionHandler,
  mxUtils,
  mxEvent,
  mxImage,
  mxDefaultKeyHandler,
  mxRubberband,
} from 'mxgraph-js';

// 引入连线图标，也可以是其他图片格式
import Connector from '../../assets/images/arrow.svg';

class Graph extends Component {
  constructor(props) {
    super(props);
    this.editor = null;
  }

  componentDidMount() {
    this.editor = new mxEditor();
    this.loadGraph();
  }

  /**
   * 定义状态节点和连线的样式
   * @param graph
   */
  setStyle = (graph) => {
    // 获取连线样式对象
    const styleEdge = graph.getStylesheet().getDefaultEdgeStyle();
    // 连线样式-转角处是不是圆角
    styleEdge[mxConstants.STYLE_ROUNDED] = true;
    // 连线的计算函数
    styleEdge[mxConstants.STYLE_EDGE] = mxEdgeStyle.ElbowConnector;
    // 线宽
    styleEdge.strokeWidth = 2;
    // 是否在连线上显示label
    styleEdge[mxConstants.STYLE_NOLABEL] = true;
    styleEdge[mxConstants.STYLE_FONTCOLOR] = '#000000';

    // 功能暂时不明确
    // graph.alternateEdgeStyle = 'elbow=vertical';

    // 获取状态节点样式对象
    const styleNode = graph.getStylesheet().getDefaultVertexStyle();
    // 节点字号
    styleNode[mxConstants.STYLE_FONTSIZE] = '13';
    // 节点字号
    styleNode[mxConstants.STYLE_FONTSTYLE] = 0;
    // 颜色
    styleNode[mxConstants.STYLE_FONTCOLOR] = '#000000';
    // 填充色
    styleNode[mxConstants.STYLE_FILLCOLOR] = '#E3E3E3';
    // 边框颜色
    styleNode[mxConstants.STYLE_STROKECOLOR] = '#000000';
    // 边框宽度
    styleNode[mxConstants.STYLE_STROKEWIDTH] = 2;
    // 选中后边框宽度
    mxConstants.VERTEX_SELECTION_STROKEWIDTH = 2;
    mxConstants.VERTEX_SELECTION_COLOR = '#1295FF';

    mxConstants.EDGE_SELECTION_COLOR = '#1295FF';
    mxConstants.EDGE_SELECTION_STROKEWIDTH = 2;
  };

  /**
   * 从JSON中加载
   * @param graph
   * @param parent
   */
  readFromData = (graph, parent) => {
    // Automatically handle parallel edges
    const layout = new mxParallelEdgeLayout(graph);
    const layoutMgr = new mxLayoutManager(graph);
    layoutMgr.getLayout = (cell) => {
      if (cell.getChildCount() > 0) {
        return layout;
      }
      return null;
    };
    graph.getModel().beginUpdate();
    let maxId = 0;
    graph.insertVertex(parent, -1, '', -150, -200, 50, 50, 'shape=ellipse;perimeter=ellipsePerimeter');
    try {
      const { data = [] } = this.props;
      const vertexes = [];
      data.forEach((cell, index) => {
        const {
          id,
          value,
          style,
          vertex,
          mxGeometry,
          edge,
          parentNode,
          source,
          target,
        } = cell;
        // If element is Vertex/cell
        if (vertex && mxGeometry.length) {
          const {
            x,
            y,
            width,
            height,
          } = mxGeometry[0];
          // add vertex
          vertexes[id] = graph.insertVertex(parent, id, value, x, y, width, height, style);
        } else if (edge) {
          const { seq } = parentNode;
          const sourceElement = vertexes[source];
          const targetElement = vertexes[target];
          const doc2 = mxUtils.createXmlDocument();
          const edge2 = doc2.createElement('Sequence');
          edge2.setAttribute('seq', seq);
          graph.insertEdge(parent, id, edge2, sourceElement, targetElement, `strokeColor=${seq}`);
        }
      });
    } catch (e) {
      window.console.log(e);
    } finally {
      // Updates the display
      graph.refresh();
      graph.getModel().endUpdate();
      // Need to move othervise the dragging canvas is broken
      graph.moveCells(graph.getChildCells(null, true, true), 1, 0);
      graph.moveCells(graph.getChildCells(null, true, true), -1, 0);
      graph.center();
    }
  };

  /**
   * 从XML加载
   * @param graph
   * @param parent
   */
  readFromXML = (graph, parent) => {
    // Automatically handle parallel edges
    const layout = new mxParallelEdgeLayout(graph);
    const layoutMgr = new mxLayoutManager(graph);
    layoutMgr.getLayout = (cell) => {
      if (cell.getChildCount() > 0) {
        return layout;
      }
      return null;
    };
    graph.getModel().beginUpdate();
    try {
      const { xml } = this.props;
      const doc = mxUtils.parseXml(xml);
      const codec = new mxCodec(doc);
      const model = codec.decode(doc.documentElement, graph.getModel());

      const cells = model.getElementsByTagName('mxCell');

      const cellArr = Array.from(cells);
      const vertexes = [];

      cellArr.forEach((cell, index) => {
        const element = cell;
        const id = element.getAttribute('id');
        const value = element.getAttribute('value');
        const style = element.getAttribute('style');
        // If element is Vertex/cell
        if (element.hasAttribute('vertex')) {
          const geometry = element.getElementsByTagName('mxGeometry');
          const x = geometry[0].getAttribute('x');
          const y = geometry[0].getAttribute('y');
          const width = geometry[0].getAttribute('width');
          const height = geometry[0].getAttribute('height');
          // add vertex
          vertexes[id] = graph.insertVertex(parent, id, value, x, y, width, height, style);
        } else if (element.hasAttribute('edge')) {
          const { parentNode } = element;
          const seqIndex = parentNode.getAttribute('seq');
          const sourceElement = vertexes[element.getAttribute('source')];
          const targetElement = vertexes[element.getAttribute('target')];
          const doc2 = mxUtils.createXmlDocument();
          const edge = doc2.createElement('Sequence');
          edge.setAttribute('seq', seqIndex);
          graph.insertEdge(parent, id, edge, sourceElement, targetElement, `strokeColor=${index}`);
        }
      });
    } catch (e) {
      window.console.log(e);
    } finally {
      // Updates the display
      graph.refresh();
      graph.getModel().endUpdate();
      // Need to move othervise the dragging canvas is broken
      graph.moveCells(graph.getChildCells(null, true, true), 1, 0);
      graph.moveCells(graph.getChildCells(null, true, true), -1, 0);
      graph.center();
    }
  };

  /**
   * 初始化mxGraph
   */
  loadGraph = () => {
    const { lineColor = '#C1C1C1', data } = this.props;

    // 检查浏览器是否支持
    if (!mxClient.isBrowserSupported()) {
      // 展示错误信息
      mxUtils.error('Browser is not supported!', 200, false);
    } else {
      // 定义状态节点上的连线图标
      mxConnectionHandler.prototype.connectImage = new mxImage(Connector, 20, 20);

      // 为graph创建的div
      const container = this.graphContainer;

      // 背景
      container.style.background = 'url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2UwZTBlMCIgb3BhY2l0eT0iMC4yIiBzdHJva2Utd2lkdGg9IjEiLz48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZTBlMGUwIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=")';

      const { graph } = this.editor;

      // ========= 属性配置 ==========

      // 每一步修改都进行校验
      this.editor.validation = true;

      // 为graph设置dom
      this.editor.setGraphContainer(container);

      // 禁用右键菜单
      mxEvent.disableContextMenu(container);

      // 取消高亮（功能暂不明确）
      graph.setDropEnabled(false);

      // 是否支持调整状态节点大小
      graph.setCellsResizable(false);

      // 设置状态节点样式
      this.setStyle(graph);

      // 自定义连线函数
      mxConnectionHandler.prototype.insertEdge = (parent, id, value, source, target) => {
        const doc = mxUtils.createXmlDocument();
        const edge = doc.createElement('Sequence');
        edge.setAttribute('seq', lineColor);
        graph.insertEdge(parent, id, edge, source, target, `strokeColor=${lineColor}`);
      };

      // 按键监听
      const keyHandler = new mxDefaultKeyHandler(this.editor);
      keyHandler.bindAction(46, 'delete');
      keyHandler.bindAction(90, 'undo', true);
      keyHandler.bindAction(89, 'redo', true);
      keyHandler.bindAction(88, 'cut', true);
      keyHandler.bindAction(67, 'copy', true);
      keyHandler.bindAction(86, 'paste', true);
      keyHandler.bindAction(107, 'zoomIn');
      keyHandler.bindAction(109, 'zoomOut');


      // 监听节点双击
      graph.dblClick = (evt, cell) => {
        if (cell && cell.edge === true) {
          // 双击连线
        } else if (cell) {
          // 双击状态
        }
        // 禁用默认的双击行为
        mxEvent.consume(evt);
      };

      graph.addListener(mxEvent.CLICK, (sender, evt) => {
        const cell = evt.getProperty('cell'); // cell may be null
        if (cell) {
          // 单击事件
          // Do something useful with cell and consume the event
          evt.consume();
        }
      });

      // 监听修改
      graph.getModel().addListener(mxEvent.CHANGE, (sender, evt) => {
        // 修改
      });

      // 初始化图
      const parent = graph.getDefaultParent();
      // this.readFromXML(graph, parent);
      if (data) {
        this.readFromData(graph, parent);
      }

      // ===========我也不知道有什么用的设置========
      graph.setHtmlLabels(true);
      // 新连接
      graph.setConnectable(true);
      // Enables moving with right click ang drag
      graph.setPanning(true);

      graph.setTooltips(false);
      // graph.setMultigraph(false);

      // Does not allow dangling edges
      graph.setAllowDanglingEdges(false);

      // Stops editing on enter or escape keypress
      // new mxRubberband(graph);

      // Enables guides (vodici cary)
      mxGraphHandler.prototype.guidesEnabled = true;

      // Disable highlight of cells when dragging from toolbar
      graph.setDropEnabled(false);

      // Enables snapping waypoints to terminals
      mxEdgeHandler.prototype.snapToTerminals = true;
    }
  };

  /**
   * removeCells
   * @returns {XML}
   */
  render() {
    return (
      <div className="graph">
        <div className="graph-container" ref={(container) => { this.graphContainer = container; }} id="graphContainer" />
      </div>
    );
  }
}

export default Graph;

```