"use client";
import { LabelList, Pie, PieChart as RechartsPieChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/shared/ui";

interface Props {
  config: ChartConfig;
  data: any[];
  legendData: any[];
}

export function PieChart({ config, data, legendData }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[68%,_32%]">
      <div>
        <ChartContainer
          config={config}
          className="mx-auto aspect-square max-h-[250px] [&_.recharts-text]:fill-background"
        >
          <RechartsPieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="optionName" hideLabel />}
            />
            <Pie data={data} dataKey="optionCount">
              <LabelList
                dataKey="percentage"
                className="fill-background"
                stroke="none"
                fontSize={12}
              />
            </Pie>
          </RechartsPieChart>
        </ChartContainer>
      </div>
      <div className="mt-5 flex justify-center gap-x-6 md:mt-0 md:flex-col md:justify-start md:gap-y-1">
        {legendData.map(({ optionName, fill }) => (
          <div className="flex items-start gap-x-2">
            <div className="flex h-5 items-center">
              <div className="h-3 w-3" style={{ backgroundColor: fill }} />
            </div>
            <div className="text-sm">{optionName}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
