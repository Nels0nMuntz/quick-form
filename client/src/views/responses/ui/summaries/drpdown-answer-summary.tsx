import { QuestionAnswer } from "@/entities/response";
import { SummaryProps } from "../../model/types/summaryProps";
import { chartColors } from "@/shared/lib";
import { BarChart, ChartConfig, PieChart } from "@/shared/ui";

export function DropdownAnswerSummary({ questionId, responses }: SummaryProps) {
  const answers = responses.reduce(
    (all, { answers }) => {
      const questionAnswer = answers.find(
        (item) => item.questionId === questionId,
      );
      if (questionAnswer && questionAnswer.value) {
        all.push(questionAnswer.value as string);
      }
      return all;
    },
    [] as QuestionAnswer<"Dropdown">["value"][],
  );

  const optionsCount = answers.reduce(
    (all, curr) => {
      if (all[curr]) {
        all[curr] += 1;
      } else {
        all[curr] = 1;
      }
      return all;
    },
    {} as Record<string, number>,
  );
  const numberOfOptions = Object.keys(optionsCount).length;

  const totalCount = Object.values(optionsCount).reduce(
    (sum, curr) => sum + curr,
    0,
  );

  const chartData = Object.entries(optionsCount).reduce(
    (data, [name, count], index) => {
      data.push({
        optionName: name,
        optionCount: count,
        percentage: `${((count / totalCount) * 100).toFixed(2)}%`,
        fill: chartColors[index],
      });
      return data;
    },
    [] as Record<string, any>[],
  );

  const legendData = chartData.map(({ optionName, fill }) => ({
    optionName,
    fill,
  }));

  const chartConfig = Object.keys(optionsCount).reduce(
    (config, name, index) => {
      config[name] = {
        label: name,
        color: chartColors[index],
      };
      return config;
    },
    {} as ChartConfig,
  );

  chartConfig.optionCount = {
    label: "Count",
  };

  return (
    <div>
      {numberOfOptions > 8 ? (
        <BarChart
          config={chartConfig}
          data={chartData}
          legendData={legendData}
          yAxisKey="optionName"
          xAxisKey="optionCount"
        />
      ) : (
        <PieChart
          config={chartConfig}
          data={chartData}
          legendData={legendData}
        />
      )}
    </div>
  );
}
