import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Cell
  } from 'recharts';
  
  export function GiniChart({ selectedCountry }: { selectedCountry: string }) {
    // 예시 데이터
    const data = [
      { name: 'USA', value: 41, isTarget: false },
      { name: 'South Korea', value: 31, isTarget: true },
      { name: 'Japan', value: 33, isTarget: false },
    ];
  
    const sorted = data.sort((a, b) => b.value - a.value);
  
    return (
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={sorted}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" isAnimationActive={false}>
              {sorted.map((entry, index) => (
                <Cell
                  key={`bar-${index}`}
                  fill={entry.isTarget ? '#ff4d4f' : '#8884d8'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
  
