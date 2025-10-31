
"use client";

import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import type { StationeryItem as BaseStationeryItem } from '@/lib/data';

// Define the shape of an item in the stationery order
export type StationeryOrderItem = BaseStationeryItem & {
  quantity: number;
  cost: number; // Cost might be calculated later
};

// Define the shape of the context
interface StationeryOrderContextType {
  orderItems: StationeryOrderItem[];
  addToOrder: (item: StationeryOrderItem) => void;
  removeFromOrder: (itemCode: string) => void;
  updateQuantity: (itemCode: string, newQty: number) => void;
  clearOrder: () => void;
}

// Create the context
const StationeryOrderContext = createContext<StationeryOrderContextType | undefined>(undefined);

// Create a provider component
export const StationeryOrderProvider = ({ children }: { children: ReactNode }) => {
  const [orderItems, setOrderItems] = useState<StationeryOrderItem[]>([]);

  const addToOrder = (item: StationeryOrderItem) => {
    setOrderItems((prevItems) => {
      // Prevent adding duplicates
      if (prevItems.some(prevItem => prevItem.code === item.code)) {
        return prevItems;
      }
      return [...prevItems, item];
    });
  };

  const removeFromOrder = (itemCode: string) => {
    setOrderItems((prevItems) => prevItems.filter((item) => item.code !== itemCode));
  };
  
  const updateQuantity = (itemCode: string, newQty: number) => {
    setOrderItems(prev => prev.map(item => 
      item.code === itemCode ? { ...item, quantity: Math.max(1, newQty) } : item
    ));
  };

  const clearOrder = () => {
    setOrderItems([]);
  }

  const contextValue = useMemo(() => ({
    orderItems,
    addToOrder,
    removeFromOrder,
    updateQuantity,
    clearOrder,
  }), [orderItems]);

  return (
    <StationeryOrderContext.Provider value={contextValue}>
      {children}
    </StationeryOrderContext.Provider>
  );
};

// Create a custom hook to use the context
export const useStationeryOrder = () => {
  const context = useContext(StationeryOrderContext);
  if (context === undefined) {
    throw new Error('useStationeryOrder must be used within a StationeryOrderProvider');
  }
  return context;
};
