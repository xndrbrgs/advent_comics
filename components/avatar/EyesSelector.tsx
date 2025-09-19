'use client';

import { useAvatarStore } from '@/store/avatarStore';

const eyeOptions = ['blue', 'green', 'brown', 'hazel'];

export default function EyesSelector() {
  const { eyes, setEyes } = useAvatarStore();

  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold mb-2">Eye Color</h2>
      <div className="flex gap-2">
        {eyeOptions.map((option) => (
          <button
            key={option}
            onClick={() => setEyes(option)}
            className={`px-4 py-2 rounded border ${
              eyes === option ? 'bg-green-500 text-white' : 'bg-white'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
