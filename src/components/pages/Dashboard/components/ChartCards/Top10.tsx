import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import { useState } from 'react';
import { useDebounce } from '../../../../../hooks';


export const Top10Chart = () => {
  const [root, setRoot] = useState<am5.Root | null>(null);
  const [chart, setChart] = useState<am5xy.XYChart | null>(null);


  useDebounce(
    () => {
      if (chart && root) {
        initData();
        return;
      }
      initChart();
    },
    200,
    [chart, root]
  );

  function initChart() {
    let root = am5.Root.new('chart-top-10');

    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: 'none',
        wheelY: 'zoomX',
        // pinchZoomX: true,
      })
    );

    if (chart.root._logo) {
      chart.root._logo.dispose();
    }

    setChart(chart);
    setRoot(root);
  }


  function initData() {
    if (!chart) return;
    if (!root) return;


    var xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30 });
    xRenderer.labels.template.setAll({
      rotation: 0,
      centerY: am5.p50,
      centerX: am5.p50,
      paddingRight: 15
    });

    // Add scrollbar
    // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
    chart.set("scrollbarX", am5.Scrollbar.new(root, {
      orientation: "horizontal"
    }));

    var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
      maxDeviation: 0.3,
      categoryField: "mes",
      renderer: xRenderer,
      tooltip: am5.Tooltip.new(root, {})
    }));

    var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
      maxDeviation: 0.3,
      renderer: am5xy.AxisRendererY.new(root, {})
    }));


    var series = chart.series.push(am5xy.ColumnSeries.new(root, {
      name: "Series 1",
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "value",
      sequencedInterpolation: true,
      categoryXField: "mes",
      // tooltip: am5.Tooltip.new(root, {
      //   labelText:"{valueY}"
      // })
    }));

    var columnTemplate = series.columns.template;

    columnTemplate.setAll({
      draggable: false,

    });

    columnTemplate.adapters.add('fill', (fill, target) => {
      return am5.color('#1474FF');
      // return chart.get('colors')?.getIndex(series.columns.indexOf(target));
    });

    columnTemplate.adapters.add('stroke', (stroke, target) => {
      return am5.color('#1474FF');
      // return chart.get('colors')?.getIndex(series.columns.indexOf(target));
    });

    // Set data
    var data = [{
      mes: "Jan 01",
      value: 2025
    }, {
      mes: "Fev31",
      value: 1882
    }, {
      mes: "Mar 01",
      value: 1882
    }, {
      mes: "Abr 02",
      value: 1809
    }, {
      mes: "Mai 30",
      value: 1322
    }, {
      mes: "Jun 05",
      value: 1122
    }, {
      mes: "Jul 20",
      value: 1114
    }, {
      mes: "Ago 30",
      value: 984
    }, {
      mes: "Sep 01",
      value: 711
    }, {
      mes: "Out 25",
      value: 665
    }, {
      mes: "Nov 20",
      value: 443
    }, {
      mes: "Dez 30",
      value: 441
    }];

    xAxis.data.setAll(data);
    series.data.setAll(data);


  }



  return (
    <>
      <div className="m-heading x-small mb-3 mt-5">Relção Mensal</div>
      <div className="m-card">
        <div id="chart-top-10" style={{ height: 450 }}></div>
      </div>
    </>
  );
};
