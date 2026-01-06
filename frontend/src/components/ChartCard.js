import GlassCard from "./GlassCard";

const ChartCard = ({ title, children }) => {
  return (
    <GlassCard className="h-[350px] p-4">
      <h3 className="text-center font-semibold text-gray-700 mb-2">{title}</h3>
      <div className="h-[280px]">{children}</div>
    </GlassCard>
  );
};

export default ChartCard;
