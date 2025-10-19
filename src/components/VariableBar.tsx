type Props = {
  label: string;
  value: number | string;
};

const formatValue = (label: string, value: number | string) => {
  switch (label) {
    case "Productivity":
      return `${value} USD/hour`;
    case "TrustInGov":
      return `${value}%`;
    case "EducationLevel":
      return `${value} (HDI)`;
    case "RuleOfLaw":
      return `${value} (–2.5~+2.5 scale)`;
    case "DiplomaticInfluence":
      return `${value} (Lowy Index)`;
    case "GrowthRate":
      return `${value}%`;
    case "DebtLevel":
      return `${value}% of GDP`;
    case "CivilUnrest":
      return `${value} (GPI)`;
    case "Corruption":
      return `${value} (CPI)`;
    case "ExternalThreat":
      return `${value}% of GDP`;
    default:
      return `${value}`;
  }
};

export default function VariableBar({ label, value }: Props) {
  const labelFormatted = label.replace(/([A-Z])/g, ' $1');

  return (
    <div className="w-full grid grid-cols-[1fr_auto] gap-2 items-center">
      <div className="text-gray-700 text-sm break-words">{labelFormatted}</div>
      <div className="text-gray-600 text-sm text-right">{formatValue(label, value)}</div>
    </div>
  );
}
