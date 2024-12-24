// "use client"
// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface CounterState {
//   value: number;
//   data:boolean
// }

// const initialState: CounterState = {
//   value: 0,
//   data: false
// };

// const counterSlice = createSlice({
//   name: 'counter',
//   initialState,
//   reducers: {
//     increment: (state) => {
//       state.value += 1;
//     },
//     decrement: (state) => {
//       state.value -= 1;
//     },
//     set: (state, action: PayloadAction<number>) => {
//       state.value = action.payload;
//     },
//     toggle:(state:any) =>{
//         state.data = !state.data
//     }
//   },
// });

// export const { increment, decrement, set, toggle } = counterSlice.actions;

// export default counterSlice.reducer;
