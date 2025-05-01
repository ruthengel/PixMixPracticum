import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Collage  = {
    id: string;
    userId: string;
    collageUrl: string;
    name: string;
    createdAt: string;
    updatedAt?: string | null;
}

interface CollageState {
    collages: Collage[];
}

const initialState: CollageState = {
    collages: [],
};

const collageSlice = createSlice({
    name: "collage",
    initialState,
    reducers: {
        setCollages: (state, action: PayloadAction<Collage[]>) => {
            state.collages = action.payload;
        },
        addCollage: (state, action: PayloadAction<Collage>) => {
            state.collages.push(action.payload);
        },
        removeCollage: (state, action: PayloadAction<string>) => {
            state.collages = state.collages.filter(collage => collage.id !== action.payload);
        },
        clearCollages: (state) => {
            state.collages = [];
        }
    },
});

export const { setCollages, addCollage, removeCollage, clearCollages } = collageSlice.actions;
export default collageSlice.reducer;
