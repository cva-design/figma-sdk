/** @jsxImportSource react */
import type React from 'react';

interface FilterControlsProps {
  filter: string;
  setFilter: (value: string) => void;
  size: number;
  setSize: (value: number) => void;
}

export const FilterControls: React.FC<FilterControlsProps> = ({ filter, setFilter, size, setSize }) => (
  <div
    style={{
      display: 'flex',
      gap: '12px',
    }}
  >
    <input
      type="text"
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
      placeholder="Filter icons..."
      style={{
        flex: 1,
        padding: '8px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '14px',
      }}
    />

    <label
      style={{
        color: '#aaa',
        marginRight: '4px',
        userSelect: 'none',
        lineHeight: '200%',
      }}
    >
      zoom:
    </label>

    <div
      style={{
        display: 'flex',
        gap: '4px',
        padding: '4px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        alignItems: 'center',
      }}
    >
      {[1, 1.5, 2].map((factor) => {
        const option = Math.round(32 * factor);
        return (
          <button
            key={option}
            onClick={() => setSize(option)}
            style={{
              padding: '4px 8px',
              border: 'none',
              borderRadius: '2px',
              background: size === option ? '#333' : 'transparent',
              color: size === option ? 'white' : '#777',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            {factor}x
          </button>
        );
      })}
    </div>
  </div>
);
