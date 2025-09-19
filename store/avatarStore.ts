import { create } from 'zustand';

type FacePart = 'eyes' | 'mouth' | 'nose' | 'eyebrows';

type AvatarState = {
    skin: string;

    hair: string;
    hairColor: string;

    clothes: string;
    clothesColor: string;

    accessories: string[]; // format: "type_color"

    faceParts: {
        eyes: { style: string; color: string };
        mouth: { style: string; color: string };
        nose: { style: string; color: string };
        eyebrows: { style: string; color: string };
    };

    // Setters
    setSkin: (skin: string) => void;

    setHair: (style: string) => void;
    setHairColor: (color: string) => void;

    setClothes: (type: string) => void;
    setClothesColor: (color: string) => void;

    setAccessories: (accessories: string[]) => void;
    toggleAccessory: (accessory: string) => void;

    setFacePart: (part: FacePart, style: string, color: string) => void;
};

export const useAvatarStore = create<AvatarState>((set, get) => ({
    // Default values
    skin: 'light',

    hair: '01-high bangs',
    hairColor: 'dark',

    clothes: '01-overalls',
    clothesColor: 'blue',

    accessories: [],

    faceParts: {
        eyes: { style: 'Round', color: 'blue' },
        mouth: { style: '01-close smile', color: 'black' },
        nose: { style: '01-upturned', color: 'black' },
        eyebrows: { style: '01', color: 'blonde' },
    },

    // Setters
    setSkin: (skin) => set({ skin }),

    setHair: (style) => set({ hair: style }),
    setHairColor: (color) => set({ hairColor: color }),

    setClothes: (type) => set({ clothes: type }),
    setClothesColor: (color) => set({ clothesColor: color }),

    setAccessories: (accessories) => set({ accessories }),
    toggleAccessory: (accessory) => {
        const current = get().accessories;
        if (current.includes(accessory)) {
            set({ accessories: current.filter((a) => a !== accessory) });
        } else {
            set({ accessories: [...current, accessory] });
        }
    },

    setFacePart: (part, style, color) =>
        set((state) => ({
            faceParts: {
                ...state.faceParts,
                [part]: { style, color },
            },
        })),
}));