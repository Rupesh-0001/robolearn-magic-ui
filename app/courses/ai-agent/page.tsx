import aiAgentData from './ai-agent.json';
import InteractiveCourseContent from './InteractiveCourseContent';

// Server component that loads data at build time
export default function AIAgentBootcamp() {
  return <InteractiveCourseContent data={aiAgentData} />;
}
