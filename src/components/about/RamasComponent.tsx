import {
  FiTarget,
  FiAperture,
  FiLayers,
  FiActivity,
  FiCpu,
} from "react-icons/fi";
import type { IconType } from "react-icons";

interface RamasComponentProps {
  title: string;
}

const BranchBox = ({
  title,
  icon: Icon,
}: {
  title: string;
  icon: IconType;
}) => (
  <div className="flex flex-col items-center justify-center bg-canvas/5 border border-canvas/10 rounded-2xl p-4 transition-all duration-300 hover:scale-110 hover:bg-canvas/15 w-full aspect-square max-w-[200px] md:max-w-[180px] shadow-lg group cursor-default">
    <Icon className="text-3xl sm:text-[2.5rem] text-strategic mb-2 sm:mb-3 group-hover:text-canvas transition-colors duration-300" />
    <span className="text-[10px] sm:text-xs font-semibold tracking-widest uppercase text-canvas/70 group-hover:text-canvas text-center leading-tight">
      {title}
    </span>
  </div>
);

const RamasComponent = ({ title }: RamasComponentProps) => {
  return (
    <div className="flex flex-col h-full justify-center">
      <p className="editorial-label !text-canvas/60 text-center mb-6">
        {title}
      </p>

      <div className="w-full flex-1 flex flex-col items-center justify-center md:gap-3 gap-5">
        {/* Superior Row (2 items) */}
        <div className="flex justify-center w-full gap-3 sm:gap-5 px-6 sm:px-12">
          <BranchBox title="Estrategia" icon={FiTarget} />
          <BranchBox title="Creatividad" icon={FiAperture} />
        </div>

        {/* Inferior Row (3 items) */}
        <div className="flex justify-center w-full md:gap-2 gap-4 px-1 md:px-2">
          <BranchBox title="Producción" icon={FiLayers} />
          <BranchBox title="Automatización" icon={FiCpu} />
          <BranchBox title="Medios" icon={FiActivity} />
        </div>
      </div>
    </div>
  );
};

export default RamasComponent;
