import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Item, ItemType, Recipe } from '../../interfaces/item';

export interface GridItem {
    item: Item
    slot: number
}

interface CraftingState {
  grid: (GridItem | null)[][];
  discoveredRecipes: Recipe[]
}


const initialState: CraftingState = {
  grid: Array(4).fill(Array(4).fill(null)),
  discoveredRecipes: []
};

const craftingSlice = createSlice({
  name: 'crafting',
  initialState,
  reducers: {
    placeItem: (state, action: PayloadAction<{ row: number; col: number; item: GridItem }>) => {
      state.grid[action.payload.row][action.payload.col] = action.payload.item;
    },
    craftItem: (state) => {
      // Implement crafting logic
    },
  },
});

export const { placeItem, craftItem } = craftingSlice.actions;
export default craftingSlice.reducer;
