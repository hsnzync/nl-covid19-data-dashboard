import { ChartTile, MetadataProps, TimeSeriesChart } from '~/components';
import { Spacer } from '~/components/base';
import { TimeframeOption, TimeframeOptionsList } from '@corona-dashboard/common';
import { useState } from 'react';
import { ColorMatch, OrderMatch, VariantChartValue, VariantDynamicLabels, VariantsOverTimeGraphText } from '~/domain/variants/data-selection/types';
import { useBarConfig } from '~/domain/variants/logic/use-bar-config';
import { InteractiveLegend, SelectOption } from '~/components/interactive-legend';
import { useList } from '~/utils/use-list';
import { TooltipSeriesList } from '~/components/time-series-chart/components/tooltip/tooltip-series-list';
import { space } from '~/style/theme';
import { useCurrentDate } from '~/utils/current-date-context';
import { reorderAndFilter } from '~/domain/variants/logic/reorder-and-filter';
import { useIntl } from '~/intl';

interface VariantsStackedBarChartTileProps {
  description: string;
  metadata: MetadataProps;
  title: string;
  tooltipLabels: VariantsOverTimeGraphText;
  values: VariantChartValue[];
  variantColors: ColorMatch[];
  variantLabels: VariantDynamicLabels;
  variantOrders: OrderMatch[];
}

const alwaysEnabled: (keyof VariantChartValue)[] = [];

/**
 * Variant bar chart component
 * @param title - Graph title
 * @param description - Graph description text
 * @param helpText - Explainer text above the interactive legend
 * @param values - Data
 * @param variantLabels - Mnemonic names for variants
 * @param variantColors - Colors for variants
 * @param metadata - Metadata block
 * @constructor
 */
export const VariantsStackedBarChartTile = ({
  title,
  description,
  tooltipLabels,
  values,
  variantLabels,
  variantColors,
  variantOrders,
  metadata,
}: VariantsStackedBarChartTileProps) => {
  const today = useCurrentDate();
  const { commonTexts } = useIntl();
  const { list, toggle, clear } = useList<keyof VariantChartValue>(alwaysEnabled);
  const [variantTimeFrame, setVariantTimeFrame] = useState<TimeframeOption>(TimeframeOption.THIRTY_DAYS);
  const barSeriesConfig = useBarConfig(values, variantLabels, tooltipLabels, variantColors, variantOrders, variantTimeFrame, today);

  const text = commonTexts.variants_page;

  const interactiveLegendOptions: SelectOption[] = barSeriesConfig;

  const filteredBarConfig = barSeriesConfig.filter((configItem) => list.includes(configItem.metricProperty) || list.length === 0);

  const hasTwoColumns = list.length === 0 || list.length > 4;

  return (
    <ChartTile
      title={title}
      description={description}
      metadata={metadata}
      timeframeOptions={TimeframeOptionsList}
      timeframeInitialValue={TimeframeOption.THIRTY_DAYS}
      onSelectTimeframe={setVariantTimeFrame}
    >
      <InteractiveLegend helpText={text.legend_help_text} selectOptions={interactiveLegendOptions.reverse()} selection={list} onToggleItem={toggle} onReset={clear} />
      <Spacer marginBottom={space[2]} />
      <TimeSeriesChart
        accessibility={{
          key: 'variants_stacked_area_over_time_chart',
        }}
        values={values}
        seriesConfig={filteredBarConfig}
        timeframe={variantTimeFrame}
        disableLegend
        formatTooltip={(data) => <TooltipSeriesList data={reorderAndFilter<VariantChartValue, SelectOption>(data, interactiveLegendOptions)} hasTwoColumns={hasTwoColumns} />}
      />
    </ChartTile>
  );
};
