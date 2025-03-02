"use client";
import {
  Bar,
  CartesianGrid,
  LabelList,
  BarChart as RechartsBarChart,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/shared/ui";

interface Props {
  config: ChartConfig;
  data: any[];
  legendData: any[];
  xAxisKey: string;
  yAxisKey: string;
}

export function BarChart({
  config,
  data,
  xAxisKey,
  yAxisKey,
}: Props) {
  return (
    <div>
      <ChartContainer
        config={config}
        className="quick-form-bar-chart mx-auto max-h-[250px] [&_.recharts-text]:fill-background"
      >
        <RechartsBarChart
          accessibilityLayer
          data={data}
          layout="vertical"
          margin={{
            left: 0,
          }}
        >
          <YAxis
            dataKey={yAxisKey}
            type="category"
            tickLine={false}
            tickMargin={10}
            tick={(props) => {
              const { x, y, payload, className } = props;
              return (
                <g transform={`translate(${x},${y})`}>
                  <text
                    x={0}
                    y={0}
                    dy={0}
                    dx={-20}
                    fill="#666"
                    className={className}
                  >
                    <tspan textAnchor="middle" x="0">
                      {payload.value}
                    </tspan>
                  </text>
                </g>
              );
            }}
            axisLine={false}
          />
          <XAxis dataKey={xAxisKey} type="number" />
          <ChartTooltip
            cursor={false}
            content={
              <ChartTooltipContent nameKey={xAxisKey} labelKey={yAxisKey} />
            }
          />
          <ChartLegend content={<ChartLegendContent nameKey={yAxisKey} />} />
          <Bar dataKey={xAxisKey} layout="vertical" radius={4} height={4}>
            <LabelList
              dataKey={xAxisKey}
              position="right"
              offset={8}
              className="labellist-item"
              fontSize={12}
              content={(props) => {
                const { x, y, width, value, height, index } = props;
                if (!x || !y || !width || !value || index === undefined)
                  return null;
                return (
                  <g>
                    <text
                      x={Number(width) + Number(x) + 36}
                      y={Number(y) + Number(height) / 2}
                      fill="#000"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="fill-midnight font-medium"
                    >
                      {`${value} (${data[index].percentage})`}
                    </text>
                  </g>
                );
              }}
            />
          </Bar>
          <CartesianGrid horizontal={false} />
        </RechartsBarChart>
      </ChartContainer>
    </div>
  );
}
