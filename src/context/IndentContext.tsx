"use client";

import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';

// Define the shape of a product in the indent
export type OrderItem = {
  id: string;
  name: string;
  price: number;
  packSize: string;
  availQty: number;
  gstRate: number;
  ordQty: number;
};

// Define the shape of the context
interface IndentContextType {
  orderItems: OrderItem[];
  setOrderItems: React.Dispatch<React.SetStateAction<OrderItem[]>>;
  addToIndent: (item: OrderItem) => void;
  removeFromIndent: (itemId: string) => void;
  updateQuantity: (itemId: string, newQty: number) => void;
  clearIndent: () => void;
}

// Create the context
const IndentContext = createContext<IndentContextType | undefined>(undefined);

// Create a provider component
export const IndentProvider = ({ children }: { children: ReactNode }) => {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  const addToIndent = (item: OrderItem) => {
    setOrderItems((prevItems) => {
      // Prevent adding duplicates
      if (prevItems.some(prevItem => prevItem.id === item.id)) {
        return prevItems;
      }
      return [...prevItems, item];
    });
  };

  const removeFromIndent = (itemId: string) => {
    setOrderItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };
  
  const updateQuantity = (itemId: string, newQty: number) => {
    setOrderItems(prev => prev.map(item => 
      item.id === itemId ? { ...item, ordQty: Math.max(0, newQty) } : item
    ));
  };

  const clearIndent = () => {
    setOrderItems([]);
  }

  const contextValue = useMemo(() => ({
    orderItems,
    setOrderItems,
    addToIndent,
    removeFromIndent,
    updateQuantity,
    clearIndent,
  }), [orderItems]);

  return (
    <IndentContext.Provider value={contextValue}>
      {children}
    </IndentContext.Provider>
  );
};

// Create a custom hook to use the IndentContext
export const useIndent = () => {
  const context = useContext(IndentContext);
  if (context === undefined) {
    throw new Error('useIndent must be used within an IndentProvider');
  }
  return context;
};
