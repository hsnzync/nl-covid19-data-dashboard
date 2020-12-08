import { colors } from '~/style/theme';
import { ChoroplethThresholdsValue } from './shared';

const positiveTestedThresholds: ChoroplethThresholdsValue[] = [
  {
    color: colors.data.scale.blue[0],
    threshold: 0,
  },
  {
    color: colors.data.scale.blue[1],
    threshold: 4,
  },
  {
    color: colors.data.scale.blue[2],
    threshold: 7,
  },
  {
    color: colors.data.scale.blue[3],
    threshold: 10,
  },
  {
    color: colors.data.scale.blue[4],
    threshold: 20,
  },
  {
    color: colors.data.scale.blue[5],
    threshold: 30,
  },
];

const hospitalAdmissionsThresholds: ChoroplethThresholdsValue[] = [
  {
    color: colors.data.scale.blue[0],
    threshold: 0,
  },
  {
    color: colors.data.scale.blue[1],
    threshold: 10,
  },
  {
    color: colors.data.scale.blue[2],
    threshold: 16,
  },
  {
    color: colors.data.scale.blue[3],
    threshold: 24,
  },
  {
    color: colors.data.scale.blue[4],
    threshold: 31,
  },
];

const escalationThresholds: ChoroplethThresholdsValue<1 | 2 | 3 | 4>[] = [
  {
    color: colors.data.scale.magenta[0],
    threshold: 1,
  },
  {
    color: colors.data.scale.magenta[1],
    threshold: 2,
  },
  {
    color: colors.data.scale.magenta[2],
    threshold: 3,
  },
  {
    color: colors.data.scale.magenta[3],
    threshold: 4,
  },
];

const nursingHomeInfectedLocationsPercentageThresholds: ChoroplethThresholdsValue[] = [
  {
    color: colors.data.scale.blue[0],
    threshold: 0,
  },
  {
    color: colors.data.scale.blue[1],
    threshold: 10,
  },
  {
    color: colors.data.scale.blue[2],
    threshold: 20,
  },
  {
    color: colors.data.scale.blue[3],
    threshold: 30,
  },
  {
    color: colors.data.scale.blue[4],
    threshold: 40,
  },
];

const sewerThresholds: ChoroplethThresholdsValue[] = [
  {
    color: colors.data.scale.blue[0],
    threshold: 0,
  },
  {
    color: colors.data.scale.blue[1],
    threshold: 50,
  },
  {
    color: colors.data.scale.blue[2],
    threshold: 250,
  },
  {
    color: colors.data.scale.blue[3],
    threshold: 500,
  },
  {
    color: colors.data.scale.blue[4],
    threshold: 750,
  },
  {
    color: colors.data.scale.blue[5],
    threshold: 1000,
  },
];

const behaviorThresholds: ChoroplethThresholdsValue[] = [
  {
    color: colors.data.scale.blue[5],
    threshold: 0,
  },
  {
    color: colors.data.scale.blue[4],
    threshold: 40,
  },
  {
    color: colors.data.scale.blue[3],
    threshold: 50,
  },
  {
    color: colors.data.scale.blue[2],
    threshold: 60,
  },
  {
    color: colors.data.scale.blue[1],
    threshold: 70,
  },
  {
    color: colors.data.scale.blue[0],
    threshold: 80,
  },
  {
    // this color is not part of the scale (as discussed with design / AG)
    color: '#DDEFF8',
    threshold: 90,
  },
];

const elderlyAtHomeThresholds: ChoroplethThresholdsValue[] = [
  {
    color: '#ffffff',
    threshold: 0,
  },
  {
    color: colors.data.scale.blue[0],
    threshold: 1,
  },
  {
    color: colors.data.scale.blue[1],
    threshold: 5,
  },
  {
    color: colors.data.scale.blue[2],
    threshold: 8,
  },
  {
    color: colors.data.scale.blue[3],
    threshold: 11,
  },
  {
    color: colors.data.scale.blue[4],
    threshold: 21,
  },
  {
    color: colors.data.scale.blue[5],
    threshold: 31,
  },
];

export const regionThresholds = {
  positive_tested_people: {
    positive_tested_people: positiveTestedThresholds,
  },
  hospital_admissions: {
    hospital_admissions: hospitalAdmissionsThresholds,
  },
  escalation_levels: {
    escalation_level: escalationThresholds,
  },
  nursing_home: {
    infected_locations_percentage: nursingHomeInfectedLocationsPercentageThresholds,
  },
  disability_care: {
    infected_locations_percentage: nursingHomeInfectedLocationsPercentageThresholds,
  },
  sewer: {
    average: sewerThresholds,
  },
  behavior: {
    todo_copy_to_all_properties__question_mark: behaviorThresholds,
  },
  elderly_at_home: {
    positive_tested_daily_per_100k: elderlyAtHomeThresholds,
  },
} as const;
