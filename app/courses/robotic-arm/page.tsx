import roboticArmData from './robotic-arm.json';
import InteractiveCourseContent from './InteractiveCourseContent';

// Server component that loads data at build time
export default function RoboticsEngineeringBootcamp() {
  return <InteractiveCourseContent data={roboticArmData} />;
}
