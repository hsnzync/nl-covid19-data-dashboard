import { Point } from '@visx/point';
import {
  isDateSpanValue,
  isDateValue,
  TimestampedValue,
} from '@corona-dashboard/common';
import { localPoint } from '@visx/event';
import { bisectCenter } from 'd3-array';
import { ScaleLinear } from 'd3-scale';
import { isEmpty, throttle } from 'lodash';
import { useCallback, useMemo, useRef, useState } from 'react';
import { isDefined, isPresent } from 'ts-is-present';
import { Padding, TimespanAnnotationConfig } from './common';
import {
  isVisible,
  SeriesConfig,
  SeriesDoubleValue,
  SeriesList,
  SeriesSingleValue,
} from './series';

export type HoveredPoint<T> = {
  seriesValue: SeriesSingleValue | SeriesDoubleValue;
  metricProperty: keyof T;
  seriesConfigIndex: number;
  color: string;
  x: number;
  y: number;
};

interface UseHoverStateArgs<T extends TimestampedValue> {
  values: T[];
  seriesList: SeriesList;
  seriesConfig: SeriesConfig<T>;
  padding: Padding;
  xScale: ScaleLinear<number, number>;
  yScale: ScaleLinear<number, number>;
  timespanAnnotations?: TimespanAnnotationConfig[];
  markNearestPointOnly?: boolean;
}

interface HoverState<T> {
  valuesIndex: number;
  barPoints: HoveredPoint<T>[];
  linePoints: HoveredPoint<T>[];
  rangePoints: HoveredPoint<T>[];
  nearestPoint: HoveredPoint<T>;
  timespanAnnotationIndex?: number;
}

type Event = React.TouchEvent<SVGElement> | React.MouseEvent<SVGElement>;

export type HoverHandler = (event: Event, seriesIndex?: number) => void;

type UseHoverStateResponse<T> = [HoverHandler, HoverState<T> | undefined];

export function useHoverState<T extends TimestampedValue>({
  values,
  seriesList,
  seriesConfig,
  padding,
  xScale,
  yScale,
  timespanAnnotations,
  markNearestPointOnly,
}: UseHoverStateArgs<T>): UseHoverStateResponse<T> {
  const [point, setPoint] = useState<Point>();

  const setPointThrottled = useMemo(
    () => throttle((x: Point | undefined) => setPoint(x), 1000 / 60),
    [setPoint]
  );

  const timeoutRef = useRef<any>();

  const valuesDateUnix = useMemo(
    () =>
      values.map((x) =>
        isDateValue(x)
          ? x.date_unix
          : isDateSpanValue(x)
          ? /**
             * @TODO share logic with trend code
             */
            x.date_start_unix + (x.date_end_unix - x.date_start_unix) / 2
          : 0
      ),
    [values]
  );

  /**
   * We only really have to do bisect once on original values object, because
   * all points of all trends are always coming from those values and are thus
   * aligned vertically.
   *
   * In this chart TrendValue __date was replaced with __date_unix, so that we
   * can use the original data timestamps directly for the xDomain without
   * conversion to/from Date objects.
   *
   * The points are always rendered in the middle of the date-span, and therefor
   * we use bisectCenter otherwise the calculated index jumps to the next as
   * soon as you cross the marker line to the right.
   */
  const bisect = useCallback(
    function (values: TimestampedValue[], xPosition: number): number {
      if (values.length === 1) return 0;

      const date_unix = xScale.invert(xPosition);

      return bisectCenter(valuesDateUnix, date_unix, 0, values.length);
    },
    [xScale, valuesDateUnix]
  );

  const handleHover = useCallback(
    (event: Event) => {
      if (isEmpty(values)) {
        return;
      }

      if (event.type === 'mouseleave') {
        /**
         * Here a timeout is used on the clear hover state to prevent the
         * tooltip from getting jittery. Individual elements in the chart can
         * send mouseleave events. This logic is maybe best moved to the the
         * tooltip itself. Or maybe it can be simplified without a ref.
         */
        timeoutRef.current = setTimeout(() => {
          setPoint(undefined);
          timeoutRef.current = undefined;
        }, 200);
        return;
      }

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      const mousePoint = localPoint(event) || undefined;
      setPointThrottled(mousePoint);
    },
    [values, setPointThrottled]
  );

  const hoverState = useMemo(() => {
    if (!point) return undefined;

    let [pointX, pointY] = point.toArray();

    /**
     * Align point coordinates with actual data points by subtracting padding
     */
    pointX -= padding.left;
    pointY -= padding.top;

    /**
     * Bisect here is working directly on the original values (as opposed to
     * individual trends in LineChart. This should be more efficient since we
     * only need to do it once. It also provides flexibility in constructing
     * hover state elements for different types based on the series config.
     */
    const valuesIndex = bisect(values, pointX);

    const barPoints: HoveredPoint<T>[] = seriesConfig
      .filter(isVisible)
      .map((config, index) => {
        const seriesValue = seriesList[index][valuesIndex] as SeriesSingleValue;

        const xValue = seriesValue.__date_unix;
        const yValue = seriesValue.__value;

        /**
         * Filter series without Y value on the current valuesIndex
         */
        if (!isPresent(yValue)) {
          return undefined;
        }

        switch (config.type) {
          case 'bar':
            return {
              seriesValue,
              x: xScale(xValue),
              y: yScale(yValue),
              color: config.color,
              metricProperty: config.metricProperty,
              seriesConfigIndex: index,
            };
        }
      })
      .filter(isDefined);

    const linePoints: HoveredPoint<T>[] = seriesConfig
      .filter(isVisible)
      .map((config, index) => {
        const seriesValue = seriesList[index][valuesIndex] as SeriesSingleValue;

        const xValue = seriesValue.__date_unix;
        const yValue = seriesValue.__value;

        /**
         * Filter series without Y value on the current valuesIndex
         */
        if (!isPresent(yValue)) {
          return undefined;
        }

        switch (config.type) {
          case 'line':
          case 'area':
            return {
              seriesValue,
              x: xScale(xValue),
              y: yScale(yValue),
              color: config.color,
              metricProperty: config.metricProperty,
              seriesConfigIndex: index,
            };
        }
      })
      .filter(isDefined)

    /**
     * Point markers on range data are rendered differently, so we split them
     * out here, so we avoid having to create a union type and complicate
     * things.
     */
    const rangePoints: HoveredPoint<T>[] = seriesConfig
      .filter(isVisible)
      .flatMap((config, index) => {
        const seriesValue = seriesList[index][valuesIndex] as SeriesDoubleValue;

        const xValue = seriesValue.__date_unix;
        const yValueA = seriesValue.__value_a;
        const yValueB = seriesValue.__value_b;

        /**
         * Filter series without Y value on the current valuesIndex
         */
        if (!isPresent(yValueA) || !isPresent(yValueB)) {
          return undefined;
        }

        switch (config.type) {
          case 'stacked-area':
            return [
              {
                seriesValue,
                x: xScale(xValue),
                y: yScale(yValueB),
                color: config.color,
                metricProperty: config.metricProperty,
                seriesConfigIndex: index,
              },
            ];
          case 'range':
            return [
              {
                seriesValue,
                x: xScale(xValue),
                y: yScale(yValueA),
                color: config.color,
                metricProperty: config.metricPropertyLow,
                seriesConfigIndex: index,
              },
              {
                seriesValue,
                x: xScale(xValue),
                y: yScale(yValueB),
                color: config.color,
                metricProperty: config.metricPropertyHigh,
                seriesConfigIndex: index,
              },
            ];
        }
      })
      .filter(isDefined);

    /**
     * For nearest point calculation we only need to look at the y component
     * of the mouse, since all series originate from the same original value
     * and are thus aligned with the same timestamp.
     */
    const nearestPoint = [...linePoints, ...rangePoints, ...barPoints].sort(
      (a, b) => Math.abs(a.y - pointY) - Math.abs(b.y - pointY)
    )[0] as HoveredPoint<T> | undefined;

    /**
     * Empty hoverstate when there's no nearest point detected
     */
    if (!nearestPoint) {
      return undefined;
    }

    const timespanAnnotationIndex = timespanAnnotations
      ? findActiveTimespanAnnotationIndex(
          values[valuesIndex],
          timespanAnnotations
        )
      : undefined;

    const hoverState: HoverState<T> = {
      valuesIndex,
      barPoints,
      linePoints: markNearestPointOnly
        ? linePoints.filter((x) => x === nearestPoint)
        : linePoints,
      rangePoints: markNearestPointOnly
        ? rangePoints.filter((x) => x === nearestPoint)
        : rangePoints,
      nearestPoint,
      timespanAnnotationIndex,
    };

    return hoverState;
  }, [
    bisect,
    markNearestPointOnly,
    padding,
    point,
    seriesConfig,
    seriesList,
    timespanAnnotations,
    values,
    xScale,
    yScale,
  ]);

  return [handleHover, hoverState];
}

function findActiveTimespanAnnotationIndex(
  hoveredValue: TimestampedValue,
  timespanAnnotations: TimespanAnnotationConfig[]
) {
  const valueSpanStart = isDateValue(hoveredValue)
    ? hoveredValue.date_unix
    : hoveredValue.date_start_unix;

  const valueSpanEnd = isDateValue(hoveredValue)
    ? hoveredValue.date_unix
    : hoveredValue.date_end_unix;

  /**
   * Loop over the annotations and see if the hovered value falls within its
   * timespan. By assuming these timespans never overlap, we can exist on the
   * first match and return a single index.
   */
  for (const [index, annotation] of [...timespanAnnotations].entries()) {
    /**
     * Tesing overlap of two ranges
     * x1 <= y2 && y1 <= x2
     */
    if (valueSpanStart <= annotation.end && annotation.start <= valueSpanEnd) {
      return index;
    }
  }
}