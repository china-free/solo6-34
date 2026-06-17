import { TrafficSign, SignCategory } from '@/types';

type SignDraft = Omit<TrafficSign, 'enabled' | 'showOnHome'> & {
  enabled?: boolean;
  showOnHome?: boolean;
};

const drafts: SignDraft[] = [
  { id: 'p01', name: '禁止通行', category: SignCategory.PROHIBITION, drawKey: 'no_entry', showOnHome: false },
  { id: 'p02', name: '禁止驶入', category: SignCategory.PROHIBITION, drawKey: 'no_entry_road' },
  { id: 'p03', name: '禁止机动车通行', category: SignCategory.PROHIBITION, drawKey: 'no_motor_vehicle' },
  { id: 'p04', name: '禁止非机动车通行', category: SignCategory.PROHIBITION, drawKey: 'no_bicycle' },
  { id: 'p05', name: '禁止行人通行', category: SignCategory.PROHIBITION, drawKey: 'no_pedestrian', showOnHome: false },
  { id: 'p06', name: '禁止停车', category: SignCategory.PROHIBITION, drawKey: 'no_parking' },
  { id: 'p07', name: '禁止长时间停车', category: SignCategory.PROHIBITION, drawKey: 'no_long_parking', showOnHome: false },
  { id: 'p08', name: '禁止鸣喇叭', category: SignCategory.PROHIBITION, drawKey: 'no_horn', showOnHome: false },
  { id: 'p09', name: '限制高度', category: SignCategory.PROHIBITION, drawKey: 'height_limit', showOnHome: false },
  { id: 'p10', name: '限制宽度', category: SignCategory.PROHIBITION, drawKey: 'width_limit', showOnHome: false },
  { id: 'p11', name: '限速60公里', category: SignCategory.PROHIBITION, drawKey: 'speed_limit_60' },
  { id: 'p12', name: '解除限速60公里', category: SignCategory.PROHIBITION, drawKey: 'end_speed_limit_60', showOnHome: false },
  { id: 'w01', name: '交叉路口', category: SignCategory.WARNING, drawKey: 'crossroads' },
  { id: 'w02', name: '急弯路向左', category: SignCategory.WARNING, drawKey: 'sharp_turn_left', showOnHome: false },
  { id: 'w03', name: '急弯路向右', category: SignCategory.WARNING, drawKey: 'sharp_turn_right' },
  { id: 'w04', name: '连续弯路', category: SignCategory.WARNING, drawKey: 'continuous_turns', showOnHome: false },
  { id: 'w05', name: '上陡坡', category: SignCategory.WARNING, drawKey: 'steep_ascent', showOnHome: false },
  { id: 'w06', name: '下陡坡', category: SignCategory.WARNING, drawKey: 'steep_descent', showOnHome: false },
  { id: 'w07', name: '注意行人', category: SignCategory.WARNING, drawKey: 'watch_pedestrian' },
  { id: 'w08', name: '注意儿童', category: SignCategory.WARNING, drawKey: 'watch_children' },
  { id: 'w09', name: '注意信号灯', category: SignCategory.WARNING, drawKey: 'watch_traffic_light', showOnHome: false },
  { id: 'w10', name: '前方学校', category: SignCategory.WARNING, drawKey: 'school_zone' },
  { id: 'i01', name: '直行', category: SignCategory.INDICATION, drawKey: 'go_straight' },
  { id: 'i02', name: '向左转弯', category: SignCategory.INDICATION, drawKey: 'turn_left' },
  { id: 'i03', name: '向右转弯', category: SignCategory.INDICATION, drawKey: 'turn_right', showOnHome: false },
  { id: 'i04', name: '直行和向左转弯', category: SignCategory.INDICATION, drawKey: 'straight_or_left', showOnHome: false },
  { id: 'i05', name: '人行横道', category: SignCategory.INDICATION, drawKey: 'pedestrian_crossing' },
  { id: 'i06', name: '机动车道', category: SignCategory.INDICATION, drawKey: 'motor_vehicle_lane' },
  { id: 'i07', name: '非机动车道', category: SignCategory.INDICATION, drawKey: 'bicycle_lane', showOnHome: false },
  { id: 'i08', name: '最低时速50公里', category: SignCategory.INDICATION, drawKey: 'min_speed_50', showOnHome: false },
];

export const trafficSigns: TrafficSign[] = drafts.map(d => ({
  ...d,
  enabled: d.enabled !== false,
  showOnHome: d.showOnHome !== false,
}));
